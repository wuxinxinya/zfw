import React, { Component } from 'react';
import './index.scss'
// 地图找房

class Map extends Component {
    componentDidMount() {
        // console.log(window);
        this.initMap()
    }
    // 地图初始化
    initMap = () => {
        // 将BMap从window解构出来
        const { BMap } = window
        // console.log(BMap);
        // 创建地图实例
        var map = new BMap.Map("container");
        // 地图地位的经纬度设置（以天安门为例子）
        var point = new BMap.Point(116.404, 39.915);
        // 设置地图的位置和缩放级别
        map.centerAndZoom(point, 15);
    }
    render() {
        return (
            <div className='mapBox'>
                <div id='container'>
                    {/* 地图 */}

                </div>
            </div>
        );
    }
}

export default Map;