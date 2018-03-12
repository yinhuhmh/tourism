import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button} from 'antd';
import {Link} from 'react-router';

import Conbottomlist from './conbottomlist';
// 读取自己定义的外部组件
export default class Contentsbottom extends React.Component{
	render(){
		return (
			<div className='pc_contents'>
				<div className='pc_contents_img'>
					<img src='./src/images/index_bg.jpg' />
				</div>
				<Row>
					<Col span={1}></Col>
					<Col span={22}>
						<div className='pc_contents_title'>
							<h3>游记攻略</h3>
							<p>独行或同游，聪明的人与你在一起</p>
							<span className='pc_contents_more'>
								<Link target="_blank" to={`/pctickets/游记`}>
									<em>MORE >></em>
								</Link>
							</span>
						</div>
						<div className='pc_contentsbottom_content'>
							<Conbottomlist />
						</div>
					</Col>
					<Col span={1}></Col>
				</Row>
			</div>
		);
	}
}