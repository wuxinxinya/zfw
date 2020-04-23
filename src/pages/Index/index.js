/***默认首页*/
import React, { Component } from 'react';
import { Carousel, Flex } from 'antd-mobile';
// import axios from 'axios'
import { BASE_URL } from '../../utils/axios'
import { getSwiper } from '../../utils/api/Home';
import './index.scss'
import navs from '../../utils/navconfig';

class Index extends Component {
    state = {
        // 轮播图数据
        swiper: [],
        // 设置轮播图默认高度
        imgHeight: 176,
        // 是否自动播放
        isPlay: false
    }
    componentDidMount() {
        this.getSwiper()
    }
    // 获取轮播图测试
    getSwiper = async () => {
        const { status, data } = await getSwiper()
        // console.log(res)
        if (status === 200) {
            // res.data.body.forEach((item) => {
            //     // 处理图片路径
            //     item.imgSrc = `http://api-haoke-dev.itheima.net${item.imgSrc}`
            // })
            // setState是异步的，要获取数据要在它的第二个回调函数中获取
            this.setState({
                swiper: data
            }, () => {
                this.setState({
                    isPlay: true
                })
            })
        }
    }
    // 渲染轮播图{/* autoplay={true}轮播图自动播放 infinite无限循环*/}
    renderSwiper = () => {
        return (
            <Carousel
                autoplay={this.state.isPlay}
                infinite
                autoplayInterval={2000}
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
            </Carousel>)
    }
    // 栏目导航
    renderNavs = () => {
        return (
            <Flex className='nav'>
                {navs.map((item) =>
                    <Flex.Item key={item.id} onClick={() => {
                        this.props.history.push(item.path)
                    }}>
                        <img src={item.img} alt='' />
                        <p>{item.title}</p>
                    </Flex.Item>
                )}

            </Flex>)
    }
    // 租房小组
    renderHouse = () => {
        return (
            <div className="group">
                <Flex className="group-title" justify="between">
                    <h3>租房小组</h3>
                    <span>更多</span>
                </Flex>
            </div>
        )
    }
    render() {
        return (
            <div className='index'>
                {/* 轮播图 */}
                {this.renderSwiper()}
                {/* 栏目布局 */}
                {this.renderNavs()}
                {/* 租房小组 */}
                {this.renderHouse()}
            </div>
        );
    }
}

export default Index;