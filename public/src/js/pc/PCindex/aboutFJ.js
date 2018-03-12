import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Dropdown, Icon } from 'antd';
import {Link} from 'react-router';
// 读取自己定义的外部组件
const menu = (
  <Menu>
    <Menu.Item >
      	<Link onClick={()=>{localStorage.title="遇见福建"}} to={`/pcaboutfj/遇见福建`}>遇见福建</Link>
    </Menu.Item>
    <Menu.Item>
      	<Link onClick={()=>{localStorage.title="风景正好"}}  to={`/pcaboutfj/风景正好`}>风景正好</Link>
    </Menu.Item>
    <Menu.Item>
      	<Link onClick={()=>{localStorage.title="美味流传"}} to={`/pcaboutfj/美味流传`}>美味流传</Link>
    </Menu.Item>
    <Menu.Item>
      	<Link onClick={()=>{localStorage.title="穿越历史"}} to={`/pcaboutfj/穿越历史`}>穿越历史</Link>
    </Menu.Item>
    <Menu.Item>
      	<Link onClick={()=>{localStorage.title="八闽乡音"}} to={`/pcaboutfj/八闽乡音`}>八闽乡音</Link>
    </Menu.Item>
  </Menu>
);
export default class AboutFJ extends React.Component{
	render(){
		return (
			<div>
				<Dropdown overlay={menu} trigger={['click']}>
				    <p className="ant-dropdown-link">
				      	关于福建 <Icon type="down" />
				    </p>
				</Dropdown>
			</div>
		);
	}
}