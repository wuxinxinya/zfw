// 获取城市列表--->选择
import React, { Component } from 'react';
import { getCityList ,getHotCity} from '../../utils/api/city/index'
import { getCurCity } from '../../utils';

class CityList extends Component {
    componentDidMount() {
        this.getCityList()
    }
    // 获取城市列表数据
    getCityList = async () => {
        const { status, data } = await getCityList()
        if (status === 200) {
            let { cityList, cityIndex}=this.formatCities(data)
            // 加入热门城市数据
            const {status:st, data:hot}=await getHotCity()
            if(st===200){
                cityList['hot']=hot
                cityIndex.unshift('hot')
            }
            // 加入当前城市
            const res=await getCurCity()
            // console.log(res);
            cityList['#']=[res]
            cityIndex.unshift('#')

            console.log( cityList, cityIndex);
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
    render() {
        return (
            <div>

                城市100110000
            </div>
        );
    }
}

export default CityList;