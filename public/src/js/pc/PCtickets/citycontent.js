import React from 'react';
import 'antd/dist/antd.css';
import {Link} from 'react-router'
// 读取自己定义的外部组件
import Cityitem from './cityitem';
import Citybottom from './citybottom';
export default class Citycontent extends React.Component{
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
					<span>门票列表</span>
				</div>
				<Cityitem citydata={this._citydata.bind(this)} />
				<Citybottom  datas={this.state.datas} />
			</div>
		);
	}
	_citydata(data){
		this.setState({
			datas:data
		})
	}
}