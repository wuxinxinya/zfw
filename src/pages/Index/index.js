/***默认首页*/
import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
// import axios from 'axios'
import api, { BASE_URL } from '../../utils/axios'

class Index extends Component {
    state = {
        // 轮播图数据
        swiper: [],
        // 设置轮播图默认高度
        imgHeight: 176,
    }
    componentDidMount() {
        this.getSwiper()
    }
    // 获取轮播图测试
    getSwiper = async () => {
        const { status, data } = await api.get('/home/swiper')
        // console.log(res)
        if (status === 200) {
            // res.data.body.forEach((item) => {
            //     // 处理图片路径
            //     item.imgSrc = `http://api-haoke-dev.itheima.net${item.imgSrc}`
            // })
            this.setState({
                swiper: data
            })
        }
    }
    render() {
        return (
            <div>
                {/* autoplay={true}轮播图自动播放 infinite无限循环*/}
                <Carousel
                    autoplay={true}
                    infinite
                >
                    {this.state.swiper.map(val => (
                        <a
                            key={val.id}
                            href="http://www.itheima.com"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={`${BASE_URL}${val.imgSrc}`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    // 窗口大小改变时候的自适应----适配问题
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
            </div>
        );
    }
}

export default Index;