import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  // 设置状态数据
  state={
    // 当前选中的条件数据
    selected:this.props.value
  }
  // 处理选中的条件数据
  handlerSel=(id)=>{
    // console.log(id);
    // 获取状态数据
    const {selected}=this.state
    // 拷贝
    let newSelected=[...selected]
    // 判断当前在数据中存在/删除  不存在/添加   indexOf(id)根据元素获取对应的索引，若元素不存在返回-1
    let index=newSelected.indexOf(id)
    if(index<0){
      newSelected.push(id)
    }else{
      // 存在/删除
      newSelected.splice(index,1)
    }
    // 更新数据和页面
    this.setState({
      selected:newSelected
    })
  }
  // 渲染标签
  renderFilters(data) {
    // 高亮类名： styles.tagActive
    // return (
    //   <span className={[styles.tag, styles.tagActive].join(' ')}>东北</span>
    // )
  return data.map((item)=><span onClick={()=>this.handlerSel(item.value)} key={item.value} className={[styles.tag,this.state.selected.includes(item.value)? styles.tagActive:''].join(' ')}>{item.label}</span>)
  }

  render() {
    // console.log(this.props);
    const {onOk,onCancle,data:{roomType, oriented, floor, characteristic }}=this.props
    // console.log('第四个筛选器数据：',data);
    
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div onClick={onCancle}  className={styles.mask} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter onOk={()=>onOk(this.state.selected)} onCancle={onCancle} className={styles.footer} />
      </div>
    )
  }
}
