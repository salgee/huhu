// 引入百度地图
import BMap from 'BMap'
// 引入图标
import markImg from '../assets/images/地址@2x.png'
// 导入百度地图
function Bmap (target) {
  let map = new BMap.Map('bmap')    // 创建Map实例
  map.setCurrentCity('上海')         // 设置地图显示的城市 此项是必须设置的
  map.enableScrollWheelZoom(true)   // 开启鼠标滚轮缩放
  map.centerAndZoom(new BMap.Point(121.488, 31.249), 13) // 初始化地图,设置中心点坐标和地图级别
  // 获取当前定位
  let geolocation = new BMap.Geolocation()
  geolocation.getCurrentPosition(function (r) {
    if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
      map.panTo(r.point)
    }
  }, {enableHighAccuracy: true})
  // 添加比例尺
  let bottomControl = new BMap.ScaleControl({anchor: window.BMAP_ANCHOR_BOTTOM_LEFT})
  map.addControl(bottomControl)
  // 添加缩放
  let bottomNavigation = new BMap.NavigationControl({
    anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT, type: window.BMAP_NAVIGATION_CONTROL_ZOOM
  })
  map.addControl(bottomNavigation)
  // 搜索建议
  function G (id) {
    return document.getElementById(id)
  }
  let ac = new BMap.Autocomplete(    // 建立一个自动完成的对象
    { 'input': 'suggestId',
      'location': map
    })
  ac.addEventListener('onhighlight', function (e) {  // 鼠标放在下拉列表上的事件
    let str = ''
    let _value = e.fromitem.value
    let value = ''
    if (e.fromitem.index > -1) {
      value = _value.province + _value.city + _value.district + _value.street + _value.business
    }
    str = 'FromItem<br />index = ' + e.fromitem.index + '<br />value = ' + value
    value = ''
    if (e.toitem.index > -1) {
      _value = e.toitem.value
      value = _value.province + _value.city + _value.district + _value.street + _value.business
    }
    str += '<br />ToItem<br />index = ' + e.toitem.index + '<br />value = ' + value
    G('searchResultPanel').innerHTML = str
  })

  let myValue
  ac.addEventListener('onconfirm', function (e) {    // 鼠标点击下拉列表后的事件
    let _value = e.item.value
    myValue = _value.province + _value.city + _value.district + _value.street + _value.business
    G('searchResultPanel').innerHTML = 'onconfirm<br />index = ' + e.item.index + '<br />myValue = ' + myValue

    setPlace()
  })
  function setPlace () {
    function myFun () {
      let pp = local.getResults().getPoi(0).point   // 获取第一个智能搜索的结果
      map.centerAndZoom(pp, 18)
      nearBy(pp, target)
    }
    let local = new BMap.LocalSearch(map, { // 智能搜索
      onSearchComplete: myFun
    })
    local.search(myValue)
  }
  // 拖拽监听
  map.addEventListener('dragend', function () {
    let pp = this.getCenter()
    nearBy(pp, target)
  })
  // 定义一个控件类,即function
  function MarkControl () {
    // 默认停靠位置和偏移量
    this.defaultAnchor = window.BMAP_ANCHOR_TOP_LEFT
    let offsetWidth = document.documentElement.clientWidth / 2
    let offsetHeight = document.documentElement.clientHeight * 0.2
    this.defaultOffset = new BMap.Size(offsetWidth - 8, offsetHeight - 20)
  }

  // 通过JavaScript的prototype属性继承于BMap.Control
  MarkControl.prototype = new BMap.Control()

  // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
  // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
  MarkControl.prototype.initialize = function (map) {
    // 创建一个DOM元素
    let img = document.createElement('img')
    // 设置样式
    img.style.cursor = 'pointer'
    img.style.width = '16px'
    img.style.height = '22px'
    img.src = markImg
    // 添加DOM元素到地图中
    map.getContainer().appendChild(img)
    // 将DOM元素返回
    return img
  }
  // 创建控件
  var myMarkControl = new MarkControl()
  // 添加到地图当中
  map.addControl(myMarkControl)
  return map
}
// 返回附近地点
let geoc = new BMap.Geocoder()
function nearBy (pt, target) {
  geoc.getLocation(pt, function (rs) {
    target.currentAddress = rs.address
    target.nearByAddress = rs.surroundingPois
  }, {
    poiRadius: 1000, // 检索范围
    numPois: 10 // 返回坐标数
  })
}
export {Bmap, nearBy}
