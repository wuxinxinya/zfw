import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'
import { getCurCity } from '../../../../utils'
import { getFilters } from '../../../../utils/api/House'

// 标题高亮状态(默认值)
const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false
}
// 选中的数据
const selectedValues={
  area: ["area", "null"],
  mode: ["null"],
  price: ["null"],
  more: []
}
// 共用给一个组件
export default class Filter extends Component {
  // 定义状态数据
  // 在组件实例化的时候执行1次
  state = {
    // 高亮的数据
    titleSelectedStatus,
    // 是否显示picker
    openType: ''
  }
  componentDidMount(){
    this.getFilterData()
    // 当前选中的值存到实例上,为何要通过展开运算符进行浅拷贝？？？
    this.selectedValues={...selectedValues}
  }
  // 获取筛选条件的数据
  getFilterData=async()=>{
    let {value}=await getCurCity()
   
    let {status,data}=await getFilters(value)  
    if(status===200){
      // 将数据存储到this上---因为数据量大
      this.filterDatas=data
      console.log('后台返回的所有数据',this.filterDatas);
      
    }
    
  }
  //提供： 修改高亮数据的方法
  onTitleClick = (type) => {
    // console.log(this);
    // console.log('点击了谁', type);

    let newSelected = { ...titleSelectedStatus, [type]: true }
    console.log(newSelected);

    this.setState({
      titleSelectedStatus: newSelected,
      openType: type
    })

  }
  // 处理确定的时候，查询selectedValues对应的选择器是否有数据==》高亮对应的title
  handlerSel=()=>{
    // 存储新的高亮状态
    const newStatus={...titleSelectedStatus}
    // 遍历存储的选中数据，确定是否高亮
    Object.keys(this.selectedValues).forEach((key)=>{
      // 根据当前picker选中的值
      let cur=this.selectedValues[key]
      // 判断是否高亮
      if(key==='area'&&(cur[1]!=='null'||cur[0]==='subway')){
        newStatus[key]=true
      }else if(key==='mode'&&cur[0]!=='null'){
        newStatus[key]=true
      }else if(key==='price'&&cur[0]!=='null'){
        newStatus[key]=true
      }else{
        newStatus[key]=false
      }
    })
    return newStatus
  }
  // 是否显示前三个过滤器的内容---picker
  isShowPicker = () => {
    const { openType } = this.state;
    return openType === 'area' || openType === 'mode' || openType === 'price'
  }
  // 点击确定的时候执行
  onOk=(curSel)=>{
    console.log('picker当前选中的数据：',curSel);
    // 存储到组件this实例上
    const {openType}=this.state
    this.selectedValues[openType]=curSel
    
    this.setState({
      openType:'',
      // 处理高亮状态
      titleSelectedStatus:this.handlerSel()
    })
  }
  // 点击取消
  onCancle=()=>{
    this.setState({
      openType:'',
      // 处理高亮状态
      titleSelectedStatus:this.handlerSel()
    })
  }
  // 渲染picker并提供对应的数据
  renderPicker=()=>{
    if(this.isShowPicker()){
      // 获取对应data的数据
      const {area,subway,rentType,price}=this.filterDatas
      const {openType}=this.state
      // 传递对应的picker
      let data,cols=1
      // 当前选中的值
      let curSel222=this.selectedValues[openType]
      // 根据openType去取当前点击的picker数据
      switch (openType) {
        case 'area':
          data = [area, subway]
          cols=3
          break
        case 'mode':
          data = rentType
          break
        case 'price':
          data = price
          break
        default:
          break
      }
      return <FilterPicker key={openType} data={data} value={curSel222} cols={cols} onOk={this.onOk} onCancle={this.onCancle}/>
    }
  }
  // 渲染第四个筛选器
  renderFilterMore=()=>{
    const {openType}=this.state
    if(openType==='more'){
      // 传递后台过滤条件的数据
      console.log(this.filterDatas);
      const { roomType, oriented, floor, characteristic }=this.filterDatas
      let data={roomType, oriented, floor, characteristic}
      return (
        <FilterMore data={data} onOk={this.onOk} onCancle={this.onCancle} />
      )
    }
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {this.isShowPicker() ? <div onClick={this.onCancle} className={styles.mask} /> : null}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle onTitleClick={this.onTitleClick} titleSelectedStatus={this.state.titleSelectedStatus} />

          {/* 前三个菜单对应的内容： */}
          {this.renderPicker()}
          {/* 最后一个菜单对应的内容： */}
          {this.renderFilterMore()}
        </div>
      </div>
    )
  }
}
