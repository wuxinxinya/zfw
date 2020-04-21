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
    selectedTab: 'blueTab',
  };

  render() {
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
              selected={this.state.selectedTab === 'blueTab'}

              onPress={() => {
                this.setState({
                  selectedTab: 'blueTab',
                });
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
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab',
                });
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
              selected={this.state.selectedTab === 'greenTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'greenTab',
                });
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