/***默认首页*/
import React, { Component } from 'react';
import { Carousel, Flex, Grid, WingBlank, SearchBar } from 'antd-mobile';
// import axios from 'axios'
import { BASE_URL } from '../../utils/axios'
import { getSwiper, getGroups, getNews } from '../../utils/api/Home';
import './index.scss'
import navs from '../../utils/navconfig';
import { getCurCity } from '../../utils';
// import { getCityInfo } from '../../utils/api/city';


class Index extends Component {
    state = {
        // 轮播图数据
        swiper: [],
        // 设置轮播图默认高度
        // 租房小组数据
        groups: [],
        // 资讯列表数据
        news: [],
        // 头部搜索的关键词
        keyword: [],
        // 城市相关信息
        currCity: {
            label: '',
            value: ''
        },
        // 设置轮播图的默认高度
        imgHeight: 176,
        // 是否自动播放
        isPlay: false
    }
    componentDidMount() {
        // this.getSwiper()
        // this.getGroups()
        // this.getNews()
        this.getAllDatas()
        this.getCurCity()
    }
    getCurCity = async () => {
        const res = await getCurCity()
        this.setState({
            currCity: res
        })

    }
    // // 根据百度地图获取当前定位的城市
    // getCurCity = () => {
    //     // function myFun(result) {
    //     //     var cityName = result.name;
    //     //     console.log("当前定位城市:" + cityName);
    //     //     // 调用接口获取城市详细信息
    //     // }
    //     // 根据IP定位当前城市的类LocalCity（构造函数）
    //     //因为百度地图在public/index.html中通过script引入的，所以BMap挂载在window
    //     var myCity = new window.BMap.LocalCity();
    //     // 调用获取定位城市实例
    //     //  myCity.get(myFun)
    //     myCity.get(async(result)=>{
    //         const {status,data}=await getCityInfo(result.name)
    //         if(status===200){
    //             this.setState({
    //                 currCity:data
    //             })
    //         }

    //     });
    // }
    //代码重构（优化） 获取首页所有接口的数据    Promise.all()静态方法
    getAllDatas = async () => {
        // const p1=Promise.resolve(1)  //返回promise对象==》new Promise
        // const p2=Promise.resolve([{a:4},{b:5}])
        // let res=await Promise.all([getSwiper(),getGroups(),getNews()])
        // 数组的解构
        try {
            let [swiper, groups, news] = await Promise.all([getSwiper(), getGroups(), getNews()])
            // console.log(res);
            // console.log(swiper,groups,news);
            if (swiper.status === 200 && groups.status === 200 && news.status === 200) {
                this.setState({
                    swiper: swiper.data,
                    groups: groups.data,
                    news: news.data
                }, () => {
                    this.setState({
                        isPlay: true
                    })
                })
            }
        } catch (error) {
            console.log(error)
        }

    }
    // // 获取轮播图测试
    // getSwiper = async () => {
    //     const { status, data } = await getSwiper()
    //     // console.log(res)
    //     if (status === 200) {
    //         // res.data.body.forEach((item) => {
    //         //     // 处理图片路径
    //         //     item.imgSrc = `http://api-haoke-dev.itheima.net${item.imgSrc}`
    //         // })
    //         // setState是异步的，要获取数据要在它的第二个回调函数中获取
    //         this.setState({
    //             swiper: data
    //         }, () => {
    //             this.setState({
    //                 isPlay: true
    //             })
    //         })
    //     }
    // }
    // // 获取租房小组数据
    // getGroups = async () => {
    //     let { status, data } = await getGroups()
    //     if (status === 200) {
    //         this.setState({
    //             groups: data
    //         })
    //     }
    // }
    // // 获取资讯列表的数据
    // getNews = async () => {
    //     let { status, data } = await getNews()
    //     if (status === 200) {
    //         this.setState({
    //             news: data
    //         })
    //     }
    // }
    // 渲染顶部导航
    renderTopNav = () => {
        const { push } = this.props.history
        return (
            <Flex justify="around" className="topNav">
                <div className="searchBox">
                    <div className="city" onClick={() => {
                        push('/cityList')
                    }}>
                        {this.state.currCity.label}<i className="iconfont icon-arrow" />
                    </div>
                    <SearchBar
                        value={this.state.keyword}
                        onChange={(v) => this.setState({ keyword: v })}
                        placeholder="请输入小区或地址"
                    />
                </div>
                <div className="map" onClick={() => {
                    push('/map')
                }}>
                    <i key="0" className="iconfont icon-map" />
                </div>
            </Flex>
        )
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
            <>
                <Flex className="group-title" justify="between">
                    <h3>租房小组</h3>
                    <span>更多</span>
                </Flex>
                {/* // 宫格布局 */}
                <Grid
                    data={this.state.groups}
                    columnNum={2}
                    hasLine={false}
                    // 关闭默认正方形
                    square={false}
                    renderItem={item => (
                        // item结构
                        <Flex key={item.id} className="grid-item" justify="between">
                            <div className="desc">
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                            <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
                        </Flex>
                    )}
                />
            </>
        )
    }

    // 渲染最新资讯
    renderNews() {
        return this.state.news.map(item => (
            <div className="news-item" key={item.id}>
                <div className="imgwrap">
                    <img
                        className="img"
                        src={`${BASE_URL}${item.imgSrc}`}
                        alt=""
                    />
                </div>
                <Flex className="content" direction="column" justify="between">
                    <h3 className="title">{item.title}</h3>
                    <Flex className="info" justify="between">
                        <span>{item.from}</span>
                        <span>{item.date}</span>
                    </Flex>
                </Flex>
            </div>
        ))
    }
    render() {
        return (
            <div className='index'>
                {/* 顶部搜索 */}
                {this.renderTopNav()}
                {/* 轮播图 */}
                {this.renderSwiper()}
                {/* 栏目布局 */}
                {this.renderNavs()}
                {/* 租房小组 */}
                <div className="group">
                    {this.renderHouse()}
                </div>
                {/* 最新资讯 */}
                <div className="news">
                    <h3 className="group-title">最新资讯</h3>
                    <WingBlank size="md">{this.renderNews()}</WingBlank>
                </div>
            </div>
        );
    }
}

export default Index;