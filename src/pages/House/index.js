import React from 'react'

import { Flex } from 'antd-mobile'

import Filter from './components/Filter'
// 导入样式---局部样式
import styles from './index.module.css'
import { getListByFilter } from '../../utils/api/House'
import { getCurCity } from '../../utils'

import { List, AutoSizer } from 'react-virtualized';
export default class HouseList extends React.Component {
  state = {
    // 房屋列表数据
    list: []
  }

  // 渲染列表项方法
  renderHouseItem = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {

    return (
      <div key={key} style={style} className="">
        {index}
      </div>
    );
  }
  async componentDidMount() {
    let { value } = await getCurCity()
    // console.log('城市',value); 
    this.cityId = value
    // 默认调用一次
    this.getHouseList()
  }

  // 子传父
  // 父组件提供接收数据的方法
  onFilter = (filters) => {
    console.log('父组件：', filters);
    // 过滤条件数据存到哪？----this
    this.filters = filters
    // 获取列表数据
    // 触发时机：每次用户选择过滤器确定的时候调用
    this.getHouseList()
  }
  // 获取列表数据
  getHouseList = async () => {
    let {status,data:{list}} = await getListByFilter(this.cityId, this.filters, 1, 20)
    if(status===200){
      this.setState({
        list
      })
    }

  }
  render() {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter onFilter={this.onFilter} />
        {/* 筛选结果列表 */}

        {/* 列表 */}
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              rowCount={this.state.list.length}
              rowHeight={130}
              rowRenderer={this.renderHouseItem}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    )
  }
}
