import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Dropdown, Icon } from 'antd';
// 读取自己定义的外部组件
const menu = (
  <Menu>
    <Menu.Item>福州</Menu.Item>
    <Menu.Item>厦门</Menu.Item>
    <Menu.Item>漳州</Menu.Item>
    <Menu.Item>泉州</Menu.Item>
    <Menu.Item>莆田</Menu.Item>
    <Menu.Item>三明</Menu.Item>
    <Menu.Item>南平</Menu.Item>
    <Menu.Item>龙岩</Menu.Item>
    <Menu.Item>宁德</Menu.Item>
  </Menu>
);
export default class Destination extends React.Component{
	render(){
		return (
			<div>
				<Dropdown overlay={menu} trigger={['click']}>
				    <p className="ant-dropdown-link">
				      	目的地 <Icon type="down" />
				    </p>
				</Dropdown>
			</div>
		);
	}
}