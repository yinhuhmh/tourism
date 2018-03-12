import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button} from 'antd';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
// 引入自己写好的模块
import Usertkindent from './usertkindent';
// 设计好所需的模块
export default class Usercollect extends React.Component{
	render(){
		return (
			<div className='usercollect'>
				<div className='usertab'>
					<Tabs type="card">
  					  	<TabPane tab="门票订单" key="1">
  					  		<Usertkindent />
						</TabPane>
  						<TabPane tab="酒店订单" key="2">
  							<div>暂无订单...</div>
  						</TabPane>
  					</Tabs>
				</div>
			</div>
		);
	}
}

