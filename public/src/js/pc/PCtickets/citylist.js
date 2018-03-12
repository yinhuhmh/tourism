import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button} from 'antd';

// 读取自己定义的外部组件
import Citycontent from './citycontent';
import Travelcontent from '../PCtravel/travelcontent';
import Hotelcontent from '../PChotel/hotelcontent';
import Cityhot from './cityhot';
import Travelhot from '../PCtravel/travelhot';
import Hotelhot from '../PChotel/hotelhot';

export default class CityList extends React.Component{
	render(){
		let content = [];
		let cityhot = [];
		if(this.props.data=='票价'){
			{/*城市列表*/}
			content=<Citycontent />
			cityhot=<Cityhot />
		}else if(this.props.data=='游记'){
			{/*游记列表*/}
			content=<Travelcontent />
			cityhot=<Travelhot />
		}else{
			{/*酒店列表*/}
			content=<Hotelcontent />
			cityhot=<Hotelhot />
		}
		return (
			<div className='pc_city'>
				<Row>
					<Col span={1}></Col>
					<Col span={17}>
					{/*切换页面*/}
						{content}
					</Col>
					<Col span={5}>
						{cityhot}
					</Col>
					<Col span={1}></Col>
				</Row>
			</div>
		);
	}
}