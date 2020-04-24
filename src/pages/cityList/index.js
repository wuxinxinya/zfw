// 获取城市列表--->选择
import React, { Component } from 'react';
import {getCityList} from '../../utils/api/city/index'

class CityList extends Component {
    componentDidMount(){
        this.getCityList()
    }
    // 获取城市列表数据
    getCityList = async () => {
        const res = await getCityList()
        console.log(res);

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