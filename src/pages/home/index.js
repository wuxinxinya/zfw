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

// 导入标签页的配置数据
import TabBarConfig from '../../utils/TabBarConfig.js'

class Home extends Component {
  state = {
    // 默认选中的标签
    selectedTab: this.props.location.pathname,
  };
  componentDidMount() {
    // 监听路由变化
    this.props.history.listen((location) => {
      // console.log(222)
      if (location.pathname !== this.state.selectedTab) {
        // console.log(111);
        this.setState({
          selectedTab: location.pathname
        })
      }

    })
  }
  // tabBar标签页数据
  renderTabBar = () => {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        {TabBarConfig.map((item) => {
          return (<TabBar.Item
            title={item.title}
            key={item.path}
            icon={<i className={`iconfont ${item.icon}`} />
            }
            selectedIcon={<i className={`iconfont ${item.icon}`} />
            }
            selected={this.state.selectedTab === item.path}
            // 点击事件--->配置路由
            onPress={() => {
              // this.setState({
              //   selectedTab: item.path,
              // });
              this.props.history.push(item.path)
            }}
          />)
        })}

      </TabBar>
    )
  }
  render() {
    // console.log(this.props.location.pathname)
    return (
      <div>
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/profile" component={Profile} />

        { /* 标签栏 */}
        <div className="tabBar">
          {/* 抽离数据到renderTabBar方法中，使代码规整 */}
          {this.renderTabBar()}
        </div>

      </div>
    );
  }
}

export default Home;