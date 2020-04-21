import React from 'react';
// import { Button } from 'antd-mobile';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import Home from './pages/home'
import CityList from './pages/cityList'
import Map from './pages/map'
import NotFound from './pages/NotFound'
function App() {
  return (
    <Router>
      <div className="App">
        {/* <Button type="primary">按钮</Button>
        <Link to='/home'>首页</Link>
        <Link to='/cityList'>城市列表</Link>
        <Link to='/map'>地图找房</Link> */}
        <Switch>
          {/* 一级路由 */}
          <Redirect exact from='/' to='/home' />>
          <Route path='/home' component={Home}></Route>
          <Route path='/cityList' component={CityList}></Route>
          <Route path='/map' component={Map}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
