import React, {
  Component
} from 'react';
import {
  Route
} from 'react-router-dom'
import Index from '../Index'
import House from '../House'
import Profile from '../Profile'
// 导入标签栏
import {
  TabBar
} from 'antd-mobile';
import './index.css'
class Home extends Component {
  state = {
    // 默认选中的标签
    selectedTab: this.props.location.pathname,
  };

  render() {
    // console.log(this.props.location.pathname)
    return (
      <div>
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/profile" component={Profile} />

        { /* 标签栏 */}
        <div className="tabBar">
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            <TabBar.Item
              title="首页"
              key="首页"
              icon={<i className="iconfont icon-ind" />
              }
              selectedIcon={<i className="iconfont icon-ind" />
              }
              selected={this.state.selectedTab === '/home'}
              // 点击事件--->配置路由
              onPress={() => {
                this.setState({
                  selectedTab: '/home',
                });
                this.props.history.push('/home')
              }}
            >

            </TabBar.Item>
            <TabBar.Item
              icon={
                <i className="iconfont icon-findHouse" />
              }
              selectedIcon={
                <i className="iconfont icon-findHouse" />
              }
              title="找房"
              key="找房"
              selected={this.state.selectedTab === '/home/house'}
              onPress={() => {
                this.setState({
                  selectedTab: '/home/house',
                });
                this.props.history.push('/home/house')
              }}
            >

            </TabBar.Item>
            <TabBar.Item
              icon={
                <i className="iconfont icon-my" />
              }
              selectedIcon={
                <i className="iconfont icon-my" />
              }
              title="我的"
              key="我的"
              selected={this.state.selectedTab === '/home/profile'}
              onPress={() => {
                this.setState({
                  selectedTab: '/home/profile',
                });
                this.props.history.push('/home/profile')
              }}
            >

            </TabBar.Item>

          </TabBar>
        </div>

      </div>
    );
  }
}

export default Home;