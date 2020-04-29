import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  // 渲染标签
  renderFilters(data) {
    // 高亮类名： styles.tagActive
    // return (
    //   <span className={[styles.tag, styles.tagActive].join(' ')}>东北</span>
    // )
  return data.map((item)=><span key={item.value} className={[styles.tag].join(' ')}>{item.label}</span>)
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
        <FilterFooter onOk={onOk} onCancle={onCancle} className={styles.footer} />
      </div>
    )
  }
}
