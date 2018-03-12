import React from 'react';
import 'antd/dist/antd.css';
import {Link} from 'react-router'
// 读取自己定义的外部组件
import Hotelitem from './hotelitem';
import Hotelbottom from './hotelbottom';
export default class Hotelcontent extends React.Component{
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
					<span>酒店列表</span>
				</div>
				<Hotelitem citydata={this._citydata.bind(this)} />
				<Hotelbottom  datas={this.state.datas} />
			</div>
		);
	}
	_citydata(data){
		console.log(33333333333333333)
		this.setState({
			datas:data
		})
	}
}