<template>
  <div>
    <!-- <el-affix :offset="45"> -->
    <div class="navbar">
      <div>
        <el-select v-model="optionvalue" style="width: 6.875rem;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div>
        <span class="spannav" style="margin: 1.25rem;">库存成本:</span>
        <span style="color: green;">{{ sumta }}</span>
      </div>
      <div>
        <span class="spannav" style="margin: 1.25rem;">预期利润:</span>
        <span :style="sumtasc > 0 ? 'color: red;' : 'color:green'">{{ sumtasc }}</span>
      </div>
      <div>
        <span class="spannav" style="margin: 1.25rem;">已获利润:</span>
        <span :style="sumtakc > 0 ? 'color: red;' : 'color:green'">{{ sumtakc }}</span>
      </div>
      <div>
        <el-button :disabled="!loginshow" color="#8f58fd" @click="addkcheader">增加库存</el-button>
      </div>
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
        <el-dialog v-model="dialogVisible" :title="zhuceshow ? '注册账号' : passshow ? '登录账号' : '找回密码'" width="500" center>
          <el-form :model="form" label-width="6.25rem" style="max-width: 25rem">
            <el-form-item v-show="zhuceshow" label="用户名:">
              <el-input name="user_name" type="text" v-model="form.user_name"></el-input>
            </el-form-item>
            <el-form-item label="注册邮箱:">
              <el-input name="mail" type="emil" v-model="form.mail" />
            </el-form-item>
            <el-form-item v-show="zhuceshow" label="QQ:">
              <el-input name="qq" type="text" v-model="form.qq" />
            </el-form-item>
            <el-form-item v-show="passshow" label="登录密码:">
              <el-input name="password" type="password" v-model="form.password" />
            </el-form-item>
          </el-form>
          <div style="display:flex;justify-content:space-around;">
            <a v-show="!zhuceshow" @click="ZhuceBtn">注册</a>
            <a v-show="zhuceshow || !passshow" @click="logBtn">登录</a>
            <a @click="posswrodBtn">忘记密码</a>
          </div>
          <div style="display: flex;justify-content: center;margin-top: 1.25rem;">
            <el-button v-show="!zhuceshow && passshow" style="width: 12.5rem;" type="primary"
              @click="Login">登录</el-button>
            <el-button v-show="zhuceshow || !passshow" style="width: 12.5rem;" type="primary"
              @click="zhuceshow?Zhuceq():FindPassword()">确认</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 新增弹窗 -->
      <el-dialog v-model="dialogVisiblek" :before-close="handleClose" :title="bjshow ? '编辑' : '新增'" width="500" center>
        <el-form style="max-width: 37.5rem" :model="ruleForm" fit-input-width="true" class="demo-ruleForm"
          :size="formSize" status-icon>
          <el-form-item label="时间" prop="date">
            <el-date-picker v-model="ruleForm.open_at" type="date" :size="size" />
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-autocomplete style="width: 25rem;" v-model="ruleForm.name" :fetch-suggestions="querySearch"
              placeholder="请输入名称" :popper-append-to-body="false" value-key="subalias" fit-input-width />
          </el-form-item>
          <el-form-item label="区服" prop="location">
            <el-radio-group v-model="radio1" size="small" @change="radio1change">
              <div>
                <el-radio-button label="请选择区服" value="请选择区服" />
                <el-radio-button label="电信区 双梦" value="电信区 双梦" />
                <el-radio-button label="无界区" value="无界区" />
              </div>
              <div>
                <el-radio-button label="双线区 纵月" value="双线区 纵月" />
                <el-radio-button label="双线区 飞龙" value="双线区 飞龙" />
                <el-radio-button label="双线区 念破" value="双线区 念破" />
                <el-radio-button label="双线区 青梅" value="双线区 青梅" />
              </div>
              <div>
                <el-radio-button label="电信区 长安" value="电信区 长安" />
                <el-radio-button label="电信区 龙虎" value="电信区 龙虎" />
                <el-radio-button label="电信区 碟服" value="电信区 碟服" />
                <el-radio-button label="电信区 煎蛋" value="电信区 煎蛋" />
              </div>
              <div>
                <el-radio-button label="电信区 姨妈" value="电信区 姨妈" />
                <el-radio-button label="电信区 绝代" value="电信区 绝代" />
                <el-radio-button label="电信区 唯满侠" value="电信区 唯满侠" />
                <el-radio-button label="电信区 六合一" value="电信区 六合一" />
              </div>
              <div>

              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="数量" prop="quantity">
            <el-radio-group v-model="radio2" @change="radio2change">
              <div>
                <el-radio-button label="1" value="1" />
                <el-radio-button label="2" value="2" />
                <el-radio-button label="3" value="3" />
                <el-radio-button label="4" value="4" />
                <el-radio-button label="5" value="5" />
                <el-radio-button label="10" value="10" />
              </div>
            </el-radio-group>
            <el-input style="width: 3.125rem;margin-left: 1.25rem;" maxlength="3"
              v-model="ruleForm.quantity"></el-input>
          </el-form-item>
          <el-form-item label="成本" prop="cost">
            <el-radio-group v-model="radio3" @change="radio3change">
              <div>
                <el-radio-button label="200" value="200" />
                <el-radio-button label="280" value="280" />
                <el-radio-button label="520" value="520" />
                <el-radio-button label="888" value="888" />
                <el-radio-button label="1200" value="1200" />
              </div>
            </el-radio-group>
            <el-input style="width: 3.4375rem;margin-left: 1.25rem;" maxlength="4" v-model="ruleForm.cost"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="desc">
            <el-input v-model="ruleForm.desc"></el-input>
          </el-form-item>
        </el-form>
        <div style="display: flex;justify-content: center;margin-top: 1.25rem;">
          <el-button style="width: 12.5rem;" type="primary" @click="addkc">确认</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- </el-affix> -->
    <!-- 库存外观 -->
    <div v-show="optionvalue == 0" class="tablebox">
      <el-table highlight-current-row :data="tableDatakcs" :default-sort="{ prop: 'date', order: 'descending' }"
        style="width: 100%" @row-click=handleMouseEnter>
        <el-table-column :show-overflow-tooltip="true" prop="open_at" label="日期" sortable>
          <template #default="scope">
            <span>{{ scope.row.updated_at.split('T')[0] }}</span>
          </template>
        </el-table-column>
        <el-table-column width="180" :show-overflow-tooltip="true" prop="official_name" label="官方名称" sortable />
        <el-table-column prop="subalias" :show-overflow-tooltip="true" label="名称" />
        <el-table-column prop="zone" label="区服" sortable />
        <el-table-column prop="quantity" label="数量" sortable>
          <template #default="scope">
            <span style="color: #409eff;">{{ scope.row.quantity }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="成本（单）" sortable>
          <template #default="scope">
            <span style="color: green;">{{ scope.row.cost }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="zone1price" label="电信价格" sortable />
        <el-table-column prop="zone2price" label="双线价格" sortable /> -->
        <el-table-column prop="wblprice" label="万宝楼单价" sortable>
          <template #default="scope">
            <span style="color: #409eff;">{{ scope.row.wblprice }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="wblprice1" label="单件利润" sortable>
          <template #default="scope">
            <span :style="{ color: scope.row.wblprice - scope.row.cost > 0 ? 'red' : 'green' }">{{ scope.row.wblprice -
              scope.row.cost }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="wblprice2" label="总利润" sortable>
          <template #default="scope">
            <span :style="{ color: scope.row.wblprice - scope.row.cost > 0 ? 'red' : 'green' }">{{
              (scope.row.wblprice * scope.row.quantity) - (scope.row.cost * scope.row.quantity) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="desc1" label="操作" width="190">
          <template #default="scope">
            <el-button link type="success" @click="Chushou(scope.row)">
              出售
            </el-button>
            <!-- <el-button size="small">出售</el-button> -->
            <el-button link type="primary" @click="Bianji(scope.row)">编辑</el-button>
            <el-button link type="danger" @click="Shanchu(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="备注" :show-overflow-tooltip="true" />
      </el-table>
      <div class="demo-image__lazy" v-show="imageshow">
        <el-image v-for="url in urls" :key="url" :src="url" />
        <el-button style="margin:10px 10px;" @click="imageshow = false">关闭</el-button>
      </div>
    </div>
    <!-- 已售外观 -->
    <div v-show="optionvalue == 1" class="tablebox">
      <el-table highlight-current-row :data="tableDatascs" :default-sort="{ prop: 'date', order: 'descending' }"
        style="width: 100%">
        <el-table-column prop="updated_at" :show-overflow-tooltip="true" label="日期" sortable>
          <template #default="scope">
            <span>{{ scope.row.updated_at.split('T')[0] }}</span>
          </template>
        </el-table-column>
        <el-table-column width="180" :show-overflow-tooltip="true" prop="official_name" label="官方名称" sortable />
        <el-table-column width="200" prop="subalias" :show-overflow-tooltip="true" label="名称" />
        <el-table-column prop="zone" label="区服" sortable />
        <el-table-column prop="quantity" label="数量" sortable>
          <template #default="scope">
            <span style="color: #409eff;">{{ scope.row.quantity }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="成本（单）" sortable>
          <template #default="scope">
            <span style="color: green;">{{ scope.row.cost }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="wblprice" label="万宝楼单价" sortable>
          <template #default="scope">
            <span style="color: #409eff;">{{ scope.row.wblprice }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="saleprice" label="出售单价" sortable>
          <template #default="scope">
            <span style="color: #f75e23;">{{ scope.row.saleprice
              }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="wblprice1" label="总利润" sortable>
          <template #default="scope">
            <span :style="{ color: scope.row.saleprice - scope.row.cost > 0 ? 'red' : 'green' }">{{
              (scope.row.saleprice * scope.row.quantity) - (scope.row.cost * scope.row.quantity) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="desc1" label="操作">
          <template #default="scope">
            <el-button link type="danger" @click="Shanchu(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="desc" :show-overflow-tooltip="true" label="备注" />
      </el-table>
    </div>
    <!-- 操作栏弹窗 -->
    <el-dialog v-model="dialogVisibleb" :title="csshow ? '出售' : (bjshow ? '编辑' : '删除')" width="500" center
      :before-close="handleClose">
      <el-form :model="fromdata" label-width="6.25rem" style="max-width: 25rem">
        <el-form-item v-show="csshow" label="出售单价:">
          <el-input v-model="fromdata.saleprice" />
        </el-form-item>
        <el-form-item v-show="csshow" label="数量:">
          <el-radio-group v-model="radio4" @change="radio4change">
            <div>
              <el-radio-button label="1" value="1" />
              <el-radio-button label="2" value="2" />
              <el-radio-button label="3" value="3" />
              <el-radio-button label="4" value="4" />
            </div>
          </el-radio-group>
          <el-input style="width: 3.125rem;margin-left: 1.25rem;" maxlength="3" v-model="fromdata.quantity"></el-input>
        </el-form-item>
        <el-form-item v-show="csshow" label="备注:">
          <el-input type="textarea" maxlength="30" v-model="fromdata.desc" />
        </el-form-item>
      </el-form>
      <p style="text-align: center;" v-show="!csshow">
        ⚠️--------确认删除？--------⚠️
      </p>
      <template #footer>
        <div class="dialog-footer">
          <el-button style="width: 12.5rem;" type="primary" @click="Sold()">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { post, get, patch, DELETE } from '@/utils/http/http';
import { ref, reactive, onMounted, computed } from 'vue';
import {Cookie} from '@/utils/cookie.js'
import util from '@/utils/util.js'
import { useJxwg } from "@/pinia/useJx3book/userJxwg.js";
import { storeToRefs } from 'pinia';
import Eln from '@/utils/Eln';
const store = useJxwg()
const { tableDatakcs, tableDatascs } = storeToRefs(store);

const dialogVisible = ref(false)
const dialogVisibleb = ref(false)
const dialogVisiblek = ref(false)
const imageshow = ref(false)

const radio1 = ref('请选择区服')
const radio2 = ref('1')
const radio3 = ref('200')
const radio4 = ref('')
const sumtasc = ref('')// 利润
const sumtakc = ref('')// 利润
const sumta = ref('')// 库存成本
const restaurants = ref([])
const ruleForm = reactive({
  cost: '', // 成本
  desc: '', // 备注
  id: '',
  name: '', // 名称
  open_at: '', // 创建时间
  quantity: '', // 数量
  sale: '', // 售出1,在库0
  saleprice: '', // 出售价格
  zone: '', // 区服
})

const urls = reactive(['', ''])

const csshow = ref(false) // 出售
const bjshow = ref(false) // 编辑
const loginshow = ref(false)// 弹窗显示
const passshow = ref(true) // 登录项
const zhuceshow = ref(false) // 注册项
const form = reactive({
  user_name: '',
  mail: '',
  qq: '',
  password: '',
})
const optionvalue = ref('0')
const options = ref([
  { value: '0', label: '库存外观' },
  { value: '1', label: '已售外观' },
])
const fromdata = reactive({
  cost: '', // 成本
  desc: '', // 备注
  id: '',
  name: '', // 名称
  open_at: '',
  quantity: '', // 数量
  sale: '', // 售出1
  saleprice: '', // 销售价格
  zone: '', // 区服
})
// 注册按钮
function ZhuceBtn () {
  zhuceshow.value = true
  passshow.value = true
}
// 登录按钮
function logBtn () {
  passshow.value = true
  zhuceshow.value = false
}
// 忘记密码按钮
function posswrodBtn () {
  zhuceshow.value = false
  passshow.value = false
}
// 注册
async function Zhuceq () {
  let { user_name, qq, password } = form;
  let data = {
    mail: form.mail,
    password,
    qq,
    user_name,
  };
  try {
    let res = await post('/user/usercreate', data);
    if (res.status === 201) {
      passshow.value = true
      zhuceshow.value = false
      Eln.success('注册成功');
    }
  } catch (error) {
    if (error.response.data.detail == 'User Already Exists') {
      Eln.error('用户已存在');
    }
  }
}
// 登录
async function Login () {
  let data = {
    username: form.mail,
    password: form.password
  }
  let restoken = await post('/user/token', data, {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
  if (restoken.status === 200) {
    dialogVisible.value = false
    Cookie(restoken.data.access_token)
    Mystocks()
    restaurants.value = await loadAll()
  }
}
// 找回密码
async function FindPassword () {
  let data = {
    email: form.mail,
  }
  try {
    let res = await post('/user/request-reset', data)
    if (res.status === 200) {
    Eln.success('密码重置链接发送到电子邮件')
  }
  } catch (error) {
    if (error.response.data.detail == 'User not found') {
      Eln.error('未找到用户')
    }
  }
}
// 退出
function logout () {
  util.removeCookie('access_token')
  Eln.success('退出成功')
  loginshow.value = false
  tableDatakcs.value = [];
  tableDatascs.value = [];
  sumtasc.value = ''// 利润
  sumtakc.value = ''// 利润
  sumta.value = ''// 库存成本
  // router.go(0); // 刷新当前页面
}
// 我的列表
async function Mystocks (params) {
  let token = util.getCookie('access_token')
  if (token) {
    loginshow.value = true
  } else {
    return Eln.success('请先登录')
  }
  let resmystocks = await get('/stock/mystocks')
  const tableDatakc = resmystocks.data.filter(item => item.sale == 0)
  const tableDatasc = resmystocks.data.filter(item => item.sale == 1)
  // 预期利润
  sumtasc.value = tableDatakc.reduce((sum, item) => {
    if (item.sale === 0) {
      return sum + (item.quantity * (item.wblprice - item.cost));
    }
    return sum;
  }, 0);
  // 已获利润
  sumtakc.value = tableDatasc.reduce((sum, item) => {
    if (item.sale === 1) {
      return sum + (item.quantity * (item.saleprice - item.cost));
    }
    return sum;
  }, 0);
  // 库存成本
  sumta.value = tableDatakc.reduce((sum, item) => {
    if (item.sale === 0) {
      return sum + (item.quantity * item.cost);
    }
    return sum;
  }, 0);
  store.tableDatakcs = tableDatakc
  store.tableDatascs = tableDatasc
}
// 出售
function Chushou (params) {
  dialogVisibleb.value = true
  csshow.value = true
  const { zone, cost, open_at, name, id, sale, } = params
  Object.assign(fromdata, { zone, cost, open_at, name, id, sale, })
}
// 编辑
function Bianji (params) {
  dialogVisiblek.value = true
  bjshow.value = true
  const { zone, quantity, cost, open_at, name, desc, id, sale, saleprice } = params
  radio1.value = zone
  radio2.value = quantity
  radio3.value = cost
  Object.assign(ruleForm, { open_at, name, cost, desc, zone, quantity, id, sale, saleprice })
}
// 删除
function Shanchu (params) {
  dialogVisibleb.value = true
  const { id } = params
  Object.assign(fromdata, { id })
}

// 遮罩销毁
function handleClose () {
  dialogVisiblek.value = false
  dialogVisibleb.value = false
  csshow.value = false
  bjshow.value = false
}

// 查询名称
let timeout
const querySearch = (queryString, cb) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    cb(results)
  }, 1500 * Math.random())
}
const createFilter = (queryString) => {
  return (restaurant) => {
    return restaurant.subalias.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
  }
}
const loadAll = async () => {
  try {
    let data = {
      name: ruleForm.name // 确保 ruleForm 是定义的
    }
    let loaddata = await get('/fashion/fashionname', data) // 异步获取数据
    return loaddata.data // 假设 loaddata 是一个数组
  } catch (error) {
    return [] // 如果出错，返回空数组
  }
}

// 区服
const radio1change = (val) => {
  ruleForm.zone = val
}
// 数量
const radio2change = (val) => {
  ruleForm.quantity = val
}
// 成本
const radio3change = (val) => {
  ruleForm.cost = val
}
// 出售数量
const radio4change = (val) => {
  fromdata.quantity = val
}

// 新增初始化
const addkcheader = () => {
  dialogVisiblek.value = true
  Object.assign(ruleForm, {
    cost: '200', // 成本
    desc: '', // 备注
    id: '',
    name: '', // 名称
    open_at: new Date(),
    quantity: '1', // 数量
    sale: '', // 售出1
    saleprice: '', // 销售价格
    zone: '', // 区服
  })
}
// 出售
async function Sold (e) {
  if (csshow.value) {
    let params = {
      open_at: fromdata.open_at,
      name: fromdata.name,
      cost: fromdata.cost,
      desc: fromdata.desc,
      zone: fromdata.zone,
      quantity: fromdata.quantity,
      id: fromdata.id,
      sale: '1',
      saleprice: fromdata.saleprice,
    }
    const res = await patch('/stock/stocksell', params)
    if (res.status == 200) {
      Eln.success('出售成功')
      dialogVisibleb.value = false
      await Mystocks()
    }
  } else {
    let params = { id: fromdata.id }
    console.log(fromdata.id);
    const res = await DELETE('/stock/delete', params)
    if (res.status == 204) {
      Eln.success('删除成功')
      dialogVisibleb.value = false
      await Mystocks()
    } else {
      Eln.error('删除失败')
    }
  }
}

// 新增编辑提交
async function addkc () {
  const { open_at, name, cost, desc, zone, quantity, id, sale, saleprice } = ruleForm
  if (bjshow.value) {
    let params = {
      open_at,
      name,
      cost,
      desc,
      zone,
      quantity,
      id,
      sale,
      saleprice
    }
    const res = await patch('/stock/stockupdate', params)
    if (res.status === 200) {
      Eln.success('编辑成功')
      dialogVisiblek.value = false
      await Mystocks()
    }
    bjshow.value = false
  } else {
    let params = {
      open_at,
      name,
      cost,
      desc,
      zone,
      quantity,
      sale: '0',
    }
    const res = await post('/stock/stockcreate', params)
    if (res.status === 201) {
      Eln.success('添加成功')
      dialogVisiblek.value = false
      await Mystocks()
    } else {
      Eln.error('添加失败')
    }
  }
}

const handleMouseEnter = (row, column) => {
  imageshow.value = true
  urls[0] = row.priceview
  urls[1] = row.view
}

onMounted(async () => {
  let token = util.getCookie('token')
  if (token) {
    await Mystocks() // 确保 Mystocks 是定义的
  }
})

</script>

<style scoped lang='less'>
.navbar {
  display: flex;
  align-items: center;
  background-color: #FFF;
  padding: 0.625rem;
  margin-top: 0.625rem;
  border-radius: 5px;
  justify-content: space-between;
}

.navbar button {
  border: none;
  padding: 0.625rem 1.25rem;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.spannav {
  font-weight: 600;

}

.tablebox {
  margin-top: 1.25rem;
}

:deep(.el-input__inner) {
  color: #409eff;
}

.demo-image__lazy {
  animation: myfirst 1s;
  display: flex;
  justify-content: space-between;
  position: sticky;
  margin-top: .625rem;
  bottom: 0;
  z-index: 999;
  height: 25rem;
  background-color: #fff6e9;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
}

.demo-image__lazy .el-image {
  display: block;
  margin: 1.25rem 1.25rem;
}

.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}

@keyframes myfirst {
  0% {
    height: 0;
    background-color: #fff;
  }

  100% {
    height: 25rem;
    background-color: #fff6e9;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  }
}
</style>