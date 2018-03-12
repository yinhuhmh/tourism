import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button,Carousel} from 'antd';
// 读取自己定义的外部组件
export default class Banner extends React.Component{
	render(){
		return (
			<div className='pc_banner'>
				<Row>
					<Col span={24}>
						<Carousel autoplay>
							<div><img src='./src/images/banner1.jpg' /></div>
							<div><img src='./src/images/banner2.jpg' /></div>
							<div><img src='./src/images/banner3.jpg' /></div>
							<div><img src='./src/images/banner4.jpg' /></div>
						</Carousel>
					</Col>
				</Row>
			</div>
		);
	}
}