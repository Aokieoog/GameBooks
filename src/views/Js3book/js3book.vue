<template>
  <div>
    <div class="navbar">
      <span style="margin-right: 1.25rem;">物品名:</span>
      <Search style="margin-right: 1rem;" @handleSelect="handleSelect" :fetch-cities="fetchCities"></Search>
      <PriceInput :addForSaleData="addForSaleData" @addForSale="handleAddForSale" />
    </div>
    <div class="containerright">
      <el-table :data="tableData" border @row-click="sellTheGoods">
        <el-table-column prop="date" label="买入时间" />
        <el-table-column prop="name" label="名称">
          <template #default="scope">
            <div class="divicon-table">
              <img class="icon-table" v-if="scope.row.image" :src="scope.row.image" alt="Icon" />
              <span style="color: rgb(119 2 247);">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="dj" label="买入单价">
          <template #default="scope">
            <span style="color: #f75e02;">{{ scope.row.dj }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ress" label="买入数量">
          <template #default="scope">
            <span style="color: rgb(123 141 64);">{{ scope.row.ress }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="djress" label="总成本">
          <template #default="scope">
            <span style="color: #f75e02;">{{ scope.row.djress }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="profits" label="总利润(5%手续费)">
          <template #default="scope">
            <span style="color: #f75e02;">{{ scope.row.profits }}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="djress1" label="出售">
          <el-popover placement="left" z-index="99999" :width="600" trigger="click">
            <template #reference>
              <el-button link type="primary" size="small">出售</el-button>
            </template>
            <div class="item-actions">
              <!-- <span class="item-span">单价：</span> -->
              <PriceInput :addForSaleData="addForSaleData" />
              <!-- <el-button class="itembutton" type="success" @click="addForSale">添加</el-button> -->
            </div>
            <el-divider />
            <el-table :data="tosellData" show-summary :summary-method="getSummaries" max-height="400">
              <el-table-column width="110" property="timeToSell" label="售出时间" />
              <el-table-column width="130" property="unitPriceText" label="售出单价" />
              <el-table-column width="90" property="quantitySold" label="售出数量" />
              <el-table-column width="160" property="totalSalesText" label="售出总额" />
              <el-table-column fixed="right" label="状态" width="60">
                <template #default="scope">
                  <el-button link type="primary" size="small" @click.prevent="deletetosell(scope.$index)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-popover>
        </el-table-column>
        <el-table-column fixed="right" label="状态">
          <template #default="scope">
            <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup>
import msg from '@/utils/message.js'
import { ref, reactive } from "vue";
import { post, get } from '@/utils/http/httpbook'
import { storeToRefs } from 'pinia';
import { useJx3book } from "@/pinia/useJx3book/useJx3book";
import Search from '@/components/search/Search.vue';
import PriceInput from '@/components/PriceInput/PriceInput.vue';

const Jx3Store = useJx3book()
const { tableData } = storeToRefs(Jx3Store);

const now = new Date()
let tosellData = reactive([])
const sellindex = ref('')
const selectedCity = ref('')
const addForSaleData = ref({
  sellPricejin: '',
  sellPriceyin: '',
  sellPricetong: '',
  sellPriceress: '',
});

const handleSelect = (city) => {
  console.log("父组件接收到的选中项:", city);
  selectedCity.value = city;
};

// 添加订单
const handleAddForSale = async (sellPrice) => {
  try {
    console.log(selectedCity.value);  
    Object.assign(sellPrice, { itemId: selectedCity.value.itemId}); 
    const response = await post('/api/orders', sellPrice);
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// 搜索物品列表
const fetchCities = async (query) => {
  try {
    const response = await get('/api/items', { name: query });
    console.log('返回数据:', response.data);
    return response.data.map(item => ({
      name: item.name,
      iconID: item.iconID,
      itemId: item._id
    }));
  } catch (error) {
    console.error('接口调用失败:', error);
    return [];
  }
};

//查看售出列表
function sellTheGoods (row) {
  tosellData = row.tosellData
  sellindex.value = Jx3Store.tableData.indexOf(row)
}

//添加售出
function addForSale () {
  let idata = Jx3Store.tableData[sellindex.value]

  if ((addForSaleData.sellPricejin || addForSaleData.sellPriceyin || addForSaleData.sellPricetong) && addForSaleData.sellPriceress) {
    let he = addForSaleData.sellPricejin + zeroPad(addForSaleData.sellPriceyin) + zeroPad(addForSaleData.sellPricetong)
    idata.tosellData.push({
      timeToSell: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,//售出时间
      unitPrice: he, // 售出单价
      quantitySold: addForSaleData.sellPriceress,//售出数量
      totalSales: he * addForSaleData.sellPriceress, //售出总额
      unitPriceText: numPad(he),
      totalSalesText: numPad(he * addForSaleData.sellPriceress)
    })

    // 计算利润
    let sumsdata = [0, 0]
    tosellData.forEach(item => {
      sumsdata[0] += parseInt(item.quantitySold); // 更新售出数量
      sumsdata[1] += parseFloat(item.totalSales); // 更新售出总额
    });
    idata.sums = sumsdata

    if (sumsdata[1] > idata.djressnum) {
      idata.profits = numPad((sumsdata[1] * 0.95) - idata.djressnum)
    } else if (sumsdata[1] <= idata.djressnum) {
      idata.profits = `-${numPad(idata.djressnum - (sumsdata[1] * 0.95))}`
    }
    localStorage.setItem('jx3', JSON.stringify(Jx3Store.tableData))
    msg.success('添加售出')
  } else {
    msg.error('请填写售出单价和数量')
  }
}

// 定义一个函数，用于将数字转换为砖、金、银、铜的表示
function numPad (amount) {
  const units = ['砖', '金', '银', '铜'];
  const dividers = [100000000, 10000, 100, 1]; // 对应砖、金、银、铜的分隔线

  let result = [];
  for (let i = 0; i < dividers.length; i++) {
    const unitValue = Math.floor(amount / dividers[i]);
    if (unitValue > 0) {
      result.push(`${unitValue}${units[i]}`);
    }
    amount %= dividers[i];
  }
  return result.join('');
}

// 定义一个函数，用于将数字转换为01的表示
const zeroPad = (num) => {
  let s = num + "";
  while (s.length < 2) {
    s = "0" + s;
  }
  return s;
}

// 删除表格数据
const deleteRow = (index) => {
  Jx3Store.tableData.splice(index, 1)
  localStorage.setItem('jx3', JSON.stringify(Jx3Store.tableData))
}

// 删除售出列表
const deletetosell = (index) => {
  Jx3Store.tableData[sellindex.value].tosellData.splice(index, 1)
  let idata = Jx3Store.tableData[sellindex.value]
  let sumsdata = [0, 0]
  tosellData.forEach(item => {
    sumsdata[0] += parseInt(item.quantitySold); // 更新售出数量
    sumsdata[1] += parseFloat(item.totalSales); // 更新售出总额
  });
  idata.sums = sumsdata

  if (sumsdata[1] > idata.djressnum) {
    idata.profits = numPad(sumsdata[1] - idata.djressnum)
  } else if (sumsdata[1] < idata.djressnum) {
    idata.profits = `-${numPad(idata.djressnum - sumsdata[1])}`
  }
  localStorage.setItem('jx3', JSON.stringify(Jx3Store.tableData))
}

const getSummaries = ({ data }) => {
  const sums = ['合计', '😁', 0, 0, '😁']; // 初始化数组，预填充静态值

  // 计算售出数量和售出总额
  data.forEach(item => {
    sums[2] += parseInt(item.quantitySold); // 更新售出数量
    sums[3] += parseFloat(item.totalSales); // 更新售出总额
  });
  sums[3] = numPad(sums[3]);
  return sums;
};

</script>

<style scoped lang="less">
.itemimage {
  display: flex;
  align-items: center;
  width: 15rem;
  border-radius: 0.2rem;
}

.itemimage:hover {
  background-color: #8f58fd;
  box-shadow: rgba(255, 255, 255, 0.25) 0px 1px 1px, rgba(255, 255, 255, 0.13) 0px 0px 1px 1px;

  .item-text {
    color: white;
  }
}

.itembutton {
  margin-left: 10px;
}

.qianimage {
  width: 25px;
  height: 18px;
  margin: 0 3px;
}

.containerright {
  margin-top: 1.25rem;
  background-color: #f8f8f8;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
}

.navbar {
  display: flex;
  align-items: center;
  background-color: #FFF;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.navbar button {
  background-color: #f8f8f8;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.navbar button.active {
  background-color: #4caf50;
  color: white;
  margin-left: 1rem;
}

.navbar input[type="text"] {
  padding: 10px;
  margin-left: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.navbar input[type="text"]::placeholder {
  color: #ccc;
}

.navbar input[type="text"]:focus {
  outline: none;
  border-color: #4caf50;
}

.navbar input[type="text"]+button {
  background: none;
  border: none;
  padding: 0;
  margin: 0 0 0 5px;
  cursor: pointer;
}

.navbar input[type="text"]+button:before {
  content: "🔍";
  font-size: 18px;
}

.container {
  width: 20rem;
  height: 35rem;
  padding: 0 1.25rem;
  background-color: #FFF;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
  overflow: overlay;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
}

.item .icon {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}

.divicon-table {
  display: flex;
  align-items: center;
}

.icon-table {
  width: 1rem;
  height: 1rem;
  margin-right: 5px;
}

.item-text {
  // flex: 1;
  // color: black;
  color: #7c1df1;
}


.item-span {
  font-size: 14px;
  font-weight: bold;
}

.item-actions {
  display: flex;
  align-items: center;
  justify-content: space-evenly
}

:deep(.el-input__inner) {
  color: #f75e02;
}

:deep(.shulianginput .el-input__inner) {
  color: rgb(123, 141, 64);
}

:deep(.navbar .el-input__inner) {
  color: rgb(59, 131, 255);
}

:deep(.nameArticle .el-input__inner) {
  color: #7c1df1;
}
</style>
