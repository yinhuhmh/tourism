import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button} from 'antd';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
// 引入自己写好的模块
import Userhotel from './userhotel';
import Usertravel from './usertravel';
import Userticket from './userticket';
// 设计好所需的模块
export default class Usercollect extends React.Component{
	render(){
		return (
			<div className='usercollect'>
				<div className='usertab'>
					<Tabs type="card">
  					  	<TabPane tab="酒店" key="1">
  					  		<Userhotel />
						</TabPane>
  						<TabPane tab="游记" key="2">
  							<Usertravel />
  						</TabPane>
  						<TabPane tab="门票" key="3">
  							<Userticket />
  						</TabPane>
  					</Tabs>
				</div>
			</div>
		);
	}
}

