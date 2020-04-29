import React from 'react'

import { Flex } from 'antd-mobile'

import Filter from './components/Filter'
// 导入样式---局部样式
import styles from './index.module.css'
import { getListByFilter } from '../../utils/api/House'
import { getCurCity } from '../../utils'

export default class HouseList extends React.Component {
async componentDidMount(){
  let {value}=await getCurCity()
  // console.log('城市',value); 
  this.cityId=value
  // 默认调用一次
  this.getHouseList()
}

  // 子传父
  // 父组件提供接收数据的方法
  onFilter=(filters)=>{
    console.log('父组件：',filters);
    // 过滤条件数据存到哪？----this
    this.filters=filters
    // 获取列表数据
    // 触发时机：每次用户选择过滤器确定的时候调用
    this.getHouseList()
  }
  // 获取列表数据
   getHouseList=async()=>{
    let res=await getListByFilter(this.cityId,this.filters,1,20)
    console.log(res);
    
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter onFilter={this.onFilter}/>
      </div>
    )
  }
}
