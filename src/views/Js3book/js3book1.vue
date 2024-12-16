<template>
  <div>
    <div class="navbar">
      <span style="margin-right: 1.25rem;">图标编码:</span>
      <el-input v-model="iconAddress" type="url" @keyup="iconAddress = iconAddress.replace(/\s/g, '')"
        placeholder="图标编码" style="width: 20rem;" />
      <!-- <el-icon color="#aeaeae" @click="centerDialogVisible = true">
        <Warning />
      </el-icon> -->
      <span style="margin: 0 1.25rem;">名称:</span>
      <el-input class="nameArticle" v-model="nameArticle" type="text"
        @keyup="nameArticle = nameArticle.replace(/\s/g, '')" @Keyup.enter="addName" placeholder="物品名称" style="width: 10rem;"
        maxlength="10" />
      <el-button class="active" @click="addName">添加</el-button>
      <!-- 登录 -->
      <div style="display: flex;align-items: center;">
        <el-button v-show="!loginshow" type="primary" class="active" @click="dialogVisible = true">登录</el-button>
        <el-dropdown v-show="loginshow">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- 登录弹窗 -->
        <el-dialog v-model="dialogVisible" title="登录账号" width="500" center>
          <el-form :model="form" label-width="6.25rem" style="max-width: 25rem">
            <el-form-item label="用户名:">
              <el-input type="text" v-model="form.loginAccount"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
              <el-input type="emil" v-model="form.email">
              </el-input>
            </el-form-item>
            <el-form-item label="密码:">
              <el-input type="password" v-model="form.password" />
            </el-form-item>
          </el-form>
          <div style="display: flex;justify-content: center;margin-top: 1.25rem;">
            <el-button style="width: 12.5rem;"
              @click="Login">注册</el-button>
            <el-button style="width: 12.5rem;"
              @click="Login">登录</el-button>
          </div>
        </el-dialog>
      </div>
    </div>

    <div class="container-wrapper">
      <div class="container">
        <div class="item" v-for="(item, index) in wupindata">
          <div style="display: flex;">
            <el-popover placement="bottom" :width="540" trigger="click">
              <div class="item-actions">
                <span class="item-span">单价：</span>
                <el-input v-model="item.jin" @keyup="item.jin = item.jin.replace(/[\D\s]/g, '')" maxlength="6"
                  autofocus="true" style="width: 70px;color: #f75e02;" />
                <img class="qianimage" src="@/assets/png/jin.png" alt="jin" />
                <el-input v-model="item.yin" @keyup="item.yin = item.yin.replace(/[\D\s]/g, '')" maxlength="2"
                  style="width: 50px" />
                <img class="qianimage" src="@/assets/png/yin.png" alt="yin" />
                <el-input v-model="item.tong" @keyup="item.tong = item.tong.replace(/[\D\s]/g, '')" maxlength="2"
                  style="width: 50px" />
                <img class="qianimage" src="@/assets/png/tong.png" alt="tong" />
                <span class="item-span" style="margin-left:10px;">数量：</span>
                <el-input class="shulianginput" v-model="item.ress"
                  @keyup="item.ress = item.ress.replace(/[\D\s]/g, '')" maxlength="5" style="width: 82px"
                  @Keyup.enter="addData(index)" />
                <el-button class="itembutton" type="success" @click="addData(index)" round>添加</el-button>
              </div>
              <template #reference>
                <div class="itemimage">
                  <img class="icon" v-if="item.image" :src="item.image" alt="Icon" />
                  <div class="item-text">{{ item.name }}</div>
                </div>
              </template>
            </el-popover>
          </div>
          <el-button type="danger" size="small" text @click="deleteName(index)">删除</el-button>
        </div>
      </div>
      <div class="containerright">
        <el-table :data="tableData" border style="" height="35rem" @row-click="sellTheGoods">
          <el-table-column prop="date" label="买入时间" width="110" />
          <el-table-column prop="name" label="名称" width="150">
            <template #default="scope">
              <div class="divicon-table">
                <img class="icon-table" v-if="scope.row.image" :src="scope.row.image" alt="Icon" />
                <span style="color: rgb(119 2 247);">{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="dj" label="买入单价" width="130">
            <template #default="scope">
              <span style="color: #f75e02;">{{ scope.row.dj }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ress" label="买入数量" width="90">
            <template #default="scope">
              <span style="color: rgb(123 141 64);">{{ scope.row.ress }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="djress" label="买入成本" width="160">
            <template #default="scope">
              <span style="color: #f75e02;">{{ scope.row.djress }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="profits" label="总利润(5%手续费)" width="160">
            <template #default="scope">
              <span style="color: #f75e02;">{{ scope.row.profits }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="djress1" label="出售" width="60">
            <el-popover placement="left" z-index="99999" :width="600" trigger="click">
              <template #reference>
                <el-button link type="primary" size="small">出售</el-button>
              </template>
              <div class="item-actions">
                <span class="item-span">单价：</span>
                <el-input maxlength="6" autofocus style="width: 70px;" v-model="addForSaleData.sellPricejin"
                  @keyup="addForSaleData.sellPricejin = addForSaleData.sellPricejin.replace(/[\D\s]/g, '')" />
                <img class="qianimage" src="@/assets/png/jin.png" alt="jin" />
                <el-input maxlength="2" style="width: 50px" v-model="addForSaleData.sellPriceyin"
                  @keyup="addForSaleData.sellPriceyin = addForSaleData.sellPriceyin.replace(/[\D\s]/g, '')" />
                <img class="qianimage" src="@/assets/png/yin.png" alt="yin" />
                <el-input maxlength="2" style="width: 50px" v-model="addForSaleData.sellPricetong"
                  @keyup="addForSaleData.sellPricetong = addForSaleData.sellPricetong.replace(/[\D\s]/g, '')" />
                <img class="qianimage" src="@/assets/png/tong.png" alt="tong" />
                <span class="item-span" style="margin-left:10px;">数量：</span>
                <el-input class="shulianginput" maxlength="5" style="width: 82px" v-model="addForSaleData.sellPriceress"
                  @keyup="addForSaleData.sellPriceress = addForSaleData.sellPriceress.replace(/[\D\s]/g, '')"
                  @Keyup.enter="addForSale" />
                <el-button class="itembutton" type="success" @click="addForSale">添加</el-button>
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
          <el-table-column fixed="right" label="状态" width="60">
            <template #default="scope">
              <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
  <el-dialog v-model="centerDialogVisible" title="图标指南" width="500" center>
    <el-divider content-position="left">例如:</el-divider>
    <div>
      <img style="width: 18px;height: 18px;" src="https://icon.jx3box.com/icon/602.png" />
      <span>芍药</span>
      <span>https://icon.jx3box.com/icon/602.png</span>
    </div>
    <div>
      <img style="width: 18px;height: 18px;" src="https://icon.jx3box.com/icon/3109.png" />
      <span>虫草</span>
      <span>https://icon.jx3box.com/icon/3109.png</span>
    </div>
    <p>观察链接发现,他们的编号不同,芍药602,虫草3109,所以我们只需要知道物品编号即可.</p>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import msg from '@/utils/message.js'
import { ref, reactive, onMounted } from "vue";
import { storeToRefs } from 'pinia';
import { useJx3book } from "@/pinia/useJx3book/useJx3book";
const Jx3Store = useJx3book()
const { tableData, wupindata } = storeToRefs(Jx3Store);

const now = new Date()
const iconAddress = ref("");
const nameArticle = ref("");
let tosellData = reactive([])
const sellindex = ref('')
const centerDialogVisible = ref(false)
const loginshow = ref(false)// 弹窗显示
const dialogVisible = ref(false)
const form = reactive({
  loginAccount: '',
  password: '',
  email: '',
})
let addForSaleData = reactive({
  sellPricejin: '',
  sellPriceyin: '',
  sellPricetong: '',
  sellPriceress: '',
})

// 添加物品列表 
function addName () {
  if (nameArticle.value) {
    Jx3Store.wupindata.push({
      name: nameArticle.value,
      image: `https://icon.jx3box.com/icon/` + iconAddress.value + `.png`,
      date: "",
      jin: "",
      yin: "",
      tong: "",
      dj: "",//买入单价
      ress: "",//买入数量
      djress: "",//买入成本
      djressnum: "",//买入成本铜
      profits: "",//利润
      tosellData: [],
      sums: []
    })
    localStorage.setItem('wupin', JSON.stringify(Jx3Store.wupindata))
    nameArticle.value = ''
    iconAddress.value = ''
    msg.success('添加成功')
  } else {
    msg.error('请输入物品名称')
  }
}

// 添加买入物品价格
function addData (index) {
  let data = Jx3Store.wupindata[index]
  console.log(data);
  if ((data.jin || data.yin || data.tong) && data.ress) {
    data.date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    let he = data.jin + zeroPad(data.yin) + zeroPad(data.tong)
    data.dj = numPad(he)
    data.djressnum = data.ress * he
    data.djress = numPad(data.ress * he)
    const clonedItem = JSON.parse(JSON.stringify(data));
    Jx3Store.tableData.push(clonedItem);
    localStorage.setItem('jx3', JSON.stringify(Jx3Store.tableData))
  } else {
    msg.error('请填写单价和数量')
  }
}


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

// 删除物品列表
const deleteName = (index) => {
  console.log(index);
  Jx3Store.wupindata.splice(index, 1)
  localStorage.setItem('wupin', JSON.stringify(Jx3Store.wupindata))
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

.container-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 1.25rem;
}

.containerright {
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
