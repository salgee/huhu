<template>
  <div id="map">
    <mt-header title="房屋地址" style="background: #79ac36;">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
      <mt-button slot="right" @click="saveAddress">确定</mt-button>
    </mt-header>
    <div class="search">
      <div>
        <img src="../../assets/images/搜索@2x.png" alt=""><input ref="input" id="suggestId" type="text"  @focus="tip">
        <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
      </div>
    </div>
    <div id="bmap">
    </div>
    <div class="area-suggestion">
      <h2>附近地点</h2>
      <section>
        <ul ref="ul">
          <li v-for="sur in nearByAddress" @click="setPlace(sur.title,sur.point)">
            <mt-cell :title="sur.title"  :label="sur.address"></mt-cell>
          </li>
        </ul>
      </section>
    </div>
  </div>

</template>
<script>
  import { Header, Cell, Toast } from 'mint-ui'
  import {Bmap, nearBy} from '../../js/Bmap.js'
  export default {
    name: 'baidumap',
    mounted () {
      this.map = Bmap(this)
    },
    data () {
      return {
        currentAddress: '',
        nearByAddress: [],
        sug: '',
        map: '',
        coordinate: ''
      }
    },
    methods: {
      setPlace (address, poi) {
        let vm = this
        vm.map.panTo(poi)
        nearBy(poi, vm, address)
        vm.$refs.ul.scrollTop = 0
      },
      tip () {
        this.$refs.input.id = 'suggestId'
      },
      saveAddress () {
        let vm = this
        if (vm.$refs.input.value === '' || vm.coordinate === '') {
          Toast({
            message: '请选择地址',
            position: 'bottom',
            duration: 1000
          })
        } else {
          sessionStorage.huhu_address = vm.$refs.input.value
          sessionStorage.huhu_coordinate = vm.coordinate
          vm.$router.push({name: 'address'})
        }
      }
    },
    components: {
      mtHeader: Header,
      Cell
    },
    watch: {
      nearByAddress () {
        let vm = this
        vm.$refs.ul.scrollTop = 0
      }
    }
  }
</script>

<style >
  #map {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  #bmap {
    width: 100%;
    height: 40%;
  }
  #map .search {
    box-sizing: border-box;
    padding:8px 12px;
    width: 100%;
    height: 40px;
    background-color: #ddd;
  }
  #map .search div {
    height: 100%;
    line-height: 24px;
    border-radius: 10px;
    background-color: #fff;
  }
  #map .search img {
    width: 18px;
    height: 18px;
    margin: 0 15px;
    vertical-align: middle;
  }
  #map .search input {
    border: none;
    outline: none;
    width: 80%;
    vertical-align: middle;
  }
  #map .area-suggestion h2{
    font-size: 12px;
    font-weight: normal;
    margin: 0;
    padding: 10px;
    background-color: #cdcdcd;
  }
  #map .area-suggestion ul{
    margin: 0;
    padding: 0;
    height: 40vh;
    overflow: scroll;
  }
  #map .area-suggestion li{
    list-style: none;
    padding: 10px;
  }
  #map .mint-cell-wrapper,#map .mint-cell{
    background-image: none !important;
    cursor: pointer;
  }
  #map .area-suggestion li+li{
    border-top: 1px solid #000;
  }
</style>
