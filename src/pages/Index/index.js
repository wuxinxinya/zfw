import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
class Index extends Component {
    state = {
        // 轮播图数据
        swiper: ['1', '2', '3'],
        // 设置轮播图默认高度
        imgHeight: 176,
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                swiper: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
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
                            key={val}
                            href="http://www.alipay.com"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
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