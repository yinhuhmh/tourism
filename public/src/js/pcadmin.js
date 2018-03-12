import React from 'react';
import {Row, Col ,Input ,Menu,Dropdown,Button,Modal,Form,Icon,message} from 'antd';
import {Link,hashHistory} from 'react-router';
const SubMenu = Menu.SubMenu;
// 引入自己写好的模块
import Useradmin from './pc/PCadmin/useradmin';

// 设计好所需的模块
export default class PCadmin extends React.Component{
	render(){
		return (
			<div className='pc_admin'>
				<div className='admin_title'>
					<span>后台管理系统</span>
				</div>
				<Row>
					<Col span={5}>
						<div style={{ width: 256,height:650,backgroundColor:'#404040'}}>
	        				<Menu
	        				  defaultSelectedKeys={['1']}
	        				  defaultOpenKeys={['sub1']}
	        				  mode="inline"
	        				  theme="dark"
	        				  onClick={this._click.bind(this)}
	        				>
	        				  	<Menu.Item key="1">
	        				  	  	<Icon type="user" />
	        				  	  	<span>用户管理</span>
	        				  	</Menu.Item>
	        				  	<SubMenu key="sub1" title={<span><Icon type="mail" /><span>信息管理</span></span>}>
	        				  	  	<Menu.Item key="2">景点门票</Menu.Item>
	        				  	  	<Menu.Item key="3">游记攻略</Menu.Item>
	        				  	  	<Menu.Item key="4">酒店信息</Menu.Item>
	        				  	</SubMenu>
	        				  	<SubMenu key="sub2" title={<span><Icon type="appstore" /><span>订单管理</span></span>}>
	        				  	  	<Menu.Item key="5">门票订单</Menu.Item>
	        				  	  	<Menu.Item key="6">酒店订单</Menu.Item>
	        				  	</SubMenu>
	        				</Menu>
	      				</div>
					</Col>
					<Col span={19}>
						<Useradmin />
					</Col>
				</Row>
			</div>
		);
	}
	_click(e){
		console.log(e.key);
	}
}

