import React from 'react';
import 'antd/dist/antd.css';
import {Link} from 'react-router'
// 读取自己定义的外部组件
import Travelitem from '../PCtravel/travelitem';
import Travelbottom from '../PCtravel/travelbottom';
export default class Travelcontent extends React.Component{
	constructor(){
		super();
		this.state={
			datas:[]
		}
	}
	render(){
		return (
			<div className='pc_cityleft'>
				<div className='pc_citytop'>
					<span>首页</span>
					<span>></span>
					<span>游记列表</span>
				</div>
				<Travelitem citydata={this._citydata.bind(this)} />
				<Travelbottom datas={this.state.datas} />
			</div>
		);
	}
	_citydata(data){
		this.setState({
			datas:data
		})
	}
	// _newest(){
	// 	fetch("/get_travel?id=1").then(respose=>{return respose.json()})
	// 	.then(json=>{
	// 		this.setState({
	// 			datas:json
	// 		})
	// 	})
	// }
	// _hottest(){
	// 	fetch("/get_travel?id=2").then(respose=>{return respose.json()})
	// 	.then(json=>{
	// 		this.setState({
	// 			datas:json
	// 		})
	// 	})
	// }
}