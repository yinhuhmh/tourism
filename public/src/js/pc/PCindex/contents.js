import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button} from 'antd';
import Contentslist from './contentslist';
// 读取自己定义的外部组件
export default class Contents extends React.Component{
	render(){
		return (
			<div className='pc_contents'>
				<Row>
					<Col span={1}></Col>
					<Col span={22}>
						<div className='pc_contents_title'>
							<h3>热门景点</h3>
							<p>让你的旅行，不止于拍拍照就离开</p>
						</div>
						<div className='pc_contents_content'>
							<Contentslist />
						</div>
					</Col>
					<Col span={1}></Col>
				</Row>
			</div>
		);
	}
}