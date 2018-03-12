import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button} from 'antd';
import Navcontent from './navcontent';
// 读取自己定义的外部组件
export default class Header extends React.Component{
	render(){
		return (
			<div className='pc_navigation'>
				<Row>
					<Col span={1}></Col>
					<Col span={4}>
						<div className='pc_navigation_logo'>
							<img src="./src/images/logo.png" />
							<div className='pc_navigation_logo_p'>
								<p>邀您来</p>
								<p>福建游</p>
							</div>
						</div>
					</Col>
					<Col span={16}>
						<div className='pc_navigation_content'>
							<Navcontent />
						</div>
					</Col>
					<Col span={3}></Col>
				</Row>
			</div>
		);
	}
}