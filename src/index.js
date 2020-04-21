import React from 'react';
import ReactDOM from 'react-dom';
// 设置全局样式
import './index.css';
import App from './App';
// 引入组件样式
// import 'antd-mobile/dist/antd-mobile.css'

// 引入字体图标库
import './assets/fonts/iconfont.css'

ReactDOM.render(
  //严格模式 <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);

