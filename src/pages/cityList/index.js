// 获取城市列表--->选择
import React, { Component } from 'react';
import { getCityList, getHotCity } from '../../utils/api/city/index'
import CUR_CITY, { getCurCity, setLocal } from '../../utils';
import { List, AutoSizer } from 'react-virtualized';
import './index.scss'
import { NavBar, Icon, Toast } from 'antd-mobile';
// 本地数据---假数据
// const list = Array.from(new Array(100)).map((item, index) => {
//     return { name: index }
// })

class CityList extends Component {
    // 设置状态数据
    state = {
        // 归类的城市数据
        cityIndex: [],
        // 归类的城市数据的索引
        cityList: {}
    }

    componentDidMount() {
        this.getCityList()
    }
    // 格式化列表的title
    // 格式化字母
    formatLetter(letter) {
        switch (letter) {
            case 'hot':
                return '热门城市';
            case '#':
                return '当前城市';
            default:
                return letter.toUpperCase();
        }
    }
    // 切换城市
    changeCity=(item)=>{
        // 有数据---
        const hasData = ['北京', '上海', '广州', '深圳'];
        if(hasData.includes(item.label)){
            // 更新当前城市数据
            setLocal(CUR_CITY,JSON.stringify(item))
            // 调到首页
            this.props.history.push('/')
        }else{
            Toast.info('该城市暂无房源')
        }
    }
    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) => {
        const { cityList, cityIndex } = this.state
        // 对象的键
        let letter = cityIndex[index]
        // console.log(letter);
        // 对象的值
        let item = cityList[letter]
        // console.log(letter, item);

        return (
            <div key={key} style={style} className="city-item">
                <div className="title">{this.formatLetter(letter)}</div>
                {item.map((item) => <div onClick={()=>{
                    this.changeCity(item)
                }} key={item.value} className='name'>{item.label}</div>)}
            </div>
        );
    }

    // 获取城市列表数据
    getCityList = async () => {
        const { status, data } = await getCityList()
        if (status === 200) {
            let { cityList, cityIndex } = this.formatCities(data)
            // 加入热门城市数据
            const { status: st, data: hot } = await getHotCity()
            if (st === 200) {
                cityList['hot'] = hot
                cityIndex.unshift('hot')
            }
            // 加入当前城市
            const res = await getCurCity()
            // console.log(res);
            cityList['#'] = [res]
            cityIndex.unshift('#')
            // 响应式
            this.setState({
                cityList,
                cityIndex
            })
            // console.log(cityList, cityIndex);
        }

    }
    // 按城市首字母归类城市数据
    formatCities = (data) => {
        // 归类的数据
        let cityList = {}
        // 遍历数据归类
        data.forEach((item) => {
            // 获取当前城市的首字母    slice(0,1)截取字符-------slice() 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。
            let first = item.short.slice(0, 1)
            // console.log(first);
            if (!cityList[first]) {
                // 不存在
                cityList[first] = [item]
            } else {
                // 存在
                cityList[first].push(item)
            }
        })
        // console.log('首字母归类完的数据', cityList);
        // 获取归类的首字母数据----键（索引）
        let cityIndex = Object.keys(cityList).sort()
        // console.log('获取归类的首字母数据', cityIndex);
        // // 遍历列表
        // cityIndex.map((item) => {
        //     console.log(item, cityList[item]);

        // })
        return {
            cityList,
            cityIndex
        }

    }
    // 动态计算高度
    excuHeight=({index})=>{
        // console.log(index);----index索引
        
        const {cityList,cityIndex}=this.state
        // console.log(cityIndex);
        
        // 根据索引找到对应的键
        let curKey=cityIndex[index]

        return 36+cityList[curKey].length*50
    }
    render() {
        return (
            <div className='cityList'>
                {/* 导航栏 */}
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}

                >城市选择</NavBar>
                {/* 城市列表 */}
                {/* <List
                    width={300}
                    height={300}
                    rowCount={list.length}
                    rowHeight={20}
                    rowRenderer={this.rowRenderer}
                /> */}

                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            height={height}
                            rowCount={this.state.cityIndex.length}
                            rowHeight={this.excuHeight}
                            rowRenderer={this.rowRenderer}
                            width={width}
                        />
                    )}
                </AutoSizer>
            </div>
        );
    }
}

export default CityList;