<script setup>
import { useCounterSore } from '@/pinia/useCounterStore/useCounterStore.js'
const counterSore = useCounterSore()
async function  async1(){
  console.log('1')
  await async2()
  console.log('2')
}
async function async2(){
  console.log('3')
}

console.log('4')
setTimeout(function() {
console.log('5')
})
async1()
new Promise(function (resolve){
  console.log('6')
  resolve()
}).then(function (){
  console.log('7')
})
console.log('8')

// 宏任务
// 微任务
// 41368275
</script>


<template>
  <p>Count:{{ counterSore.count }}</p>
  <el-button @click="counterSore.increment()">递加</el-button>
  <el-button @click="counterSore.decrement()">递减</el-button>
</template>
