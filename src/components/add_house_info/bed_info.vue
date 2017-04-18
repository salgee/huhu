<template>
<div id="add">
  <mt-header title="选择床位" style="background: #79ac36;">
    <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    <span slot="right" @click="saveBedInfo">确定</span>
  </mt-header>
	<table cellspacing="15">
		<tr>
			<th>选择</th>
			<th>床型</th>
			<th>数量</th>
			<th>单位</th>
		</tr>
		<tr>
			<td><input type="checkbox" v-model="check4Small"></td>
			<td>1.35m</td>
			<td><input type="number" v-model="samllBed" min="1" max="5"></td>
			<td>床</td>
		</tr>
		<tr>
			<td><input type="checkbox" v-model="check4Middle"></td>
			<td>1.5m</td>
			<td><input type="number" v-model="middleBed" min="1" max="5"></td>
			<td>床</td>
		</tr>
		<tr>
			<td><input type="checkbox" v-model="check4Big"></td>
			<td>1.8m</td>
			<td><input type="number" v-model="bigBed" min="1" max="5"></td>
			<td>床</td>
		</tr>
	</table>
</div>
</template>

<script>
import {Header, Toast} from 'mint-ui'
export default {
  name: 'addHouse',
  beforeRouteEnter (to, from, next) {
    if (from.path === '/user/changeHouse') {
      localStorage.bed_info_fromPath = '/user/changeHouse'
      next()
    } else {
      next()
    }
  },
  data () {
    return {
      check4Small: Boolean(Number(sessionStorage.huhu_smallBed)),
      check4Middle: Boolean(Number(sessionStorage.huhu_middleBed)),
      check4Big: Boolean(Number(sessionStorage.huhu_bigBed)),
      samllBed: sessionStorage.huhu_smallBed,
      middleBed: sessionStorage.huhu_middleBed,
      bigBed: sessionStorage.huhu_bigBed
    }
  },
  components: {
    mtHeader: Header
  },
  methods: {
    saveBedInfo () {
      let vm = this
      sessionStorage.huhu_smallBed = vm.check4Small && vm.samllBed !== '' ? vm.samllBed : false
      sessionStorage.huhu_middleBed = vm.check4Middle && vm.middleBed !== '' ? vm.middleBed : false
      sessionStorage.huhu_bigBed = vm.check4Big && vm.bigBed !== '' ? vm.bigBed : false
      // 保存床位数据
      sessionStorage.huhu_bedNum = sessionStorage.huhu_smallBed === 'false' ? '' : `${sessionStorage.huhu_smallBed}床1.35m,`
      sessionStorage.huhu_bedNum += sessionStorage.huhu_middleBed === 'false' ? '' : `${sessionStorage.huhu_middleBed}床1.5m,`
      sessionStorage.huhu_bedNum += sessionStorage.huhu_bigBed === 'false' ? '' : `${sessionStorage.huhu_bigBed}床1.8m,`
      if (sessionStorage.huhu_bedNum === '') {
        Toast({
          message: '请选择床位数量',
          position: 'bottom',
          duration: 2000
        })
      } else {
        sessionStorage.huhu_bedNum = sessionStorage.huhu_bedNum.slice(0, -1)
        console.log(sessionStorage.huhu_bedNum)
        let path = localStorage.bed_info_fromPath || '/home/addHouse'
        localStorage.removeItem('bed_info_fromPath')
        vm.$router.push(path)
      }
    }
  }
}
</script>

<style>
table {
  width: 100%;
}
table th,td{
	width: 25%;
	font-weight: normal;
	text-align: center;
}
table input[type='number'] {
	width: 100%;
	text-align: center;
}
table input[type='checkbox'] {
	width: 15px;
	height: 15px;
}
</style>
