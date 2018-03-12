import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button} from 'antd';
var city=["全部","福州","厦门","漳州","泉州","三明","莆田","南平","龙岩","宁德"];
var cityEn=["all","fuzhou","xiamen","zhangzhou","quanzhou","sanming","putian","nanping","longyan","ningde"];
var type=["全部","一星级","二星级","三星级","四星级","五星级","其他"];
// 读取自己定义的外部组件
export default class Hotelitem extends React.Component{
	constructor(){
		super();
		this.state={
			currentIndex:0,
			typeIndex:0,
			datas:[]
		}
	}
	componentDidMount(){
		fetch("/get_hotel?city="+cityEn[0]+"&type="+type[0]).then(respose=>{return respose.json()})
		.then(json=>{
			console.log(json);
			this.props.citydata(json)
		})
	}
	render(){
		let content=city.map((item,index)=>{
			let color = this.state.currentIndex==index?"#fff":"#008ad6";
			let bgcolor = this.state.currentIndex==index?"#f60":"#fff";
			return (
				<li key={index} style={{backgroundColor:bgcolor,color:color}}
					onClick={this._lifetch.bind(this,cityEn[index],index)}
				>{item}</li>
			)
		})
		let list=type.map((item,index)=>{
			let color = this.state.typeIndex==index?"#fff":"#008ad6";
			let bgcolor = this.state.typeIndex==index?"#f60":"#fff";
			return (
				<li key={index} style={{backgroundColor:bgcolor,color:color}}
					onClick={this._type.bind(this,type[index],index)}
				>{item}</li>
			)
		})
		return (
			<div className='pc_citycenter'>
				<div className='pc_cityitem'>
					<div className='pc_citytitle'>所在城市：</div>
					<ul className='pc_citylist'>
						{content}
					</ul>
				</div>
				<div className='pc_cityitem'>
					<div className='pc_citytitle'>景点级别：</div>
					<ul className='pc_citylist'>
						{list}
					</ul>
				</div>
				<div className='pc_cityselect'>
					<div className='pc_citytitle'>已选条件：</div>
					<ul className='pc_citymain'>
						<li>所在城市: {city[this.state.currentIndex]}</li>
						<li>景点级别: {type[this.state.typeIndex]}</li>
						<li className='pc_citymain_select'
						onClick={this._reset.bind(this)}>重新筛选</li>
					</ul>
				</div>
			</div>
		);
	}
	_lifetch(city,index){
		this.setState({
			currentIndex:index,
		})
		fetch("/get_hotel?city="+city+"&type="+type[this.state.typeIndex]).then(respose=>{return respose.json()})
		.then(json=>{
			this.props.citydata(json)
		})
	}
	_type(type,index){
		this.setState({
			typeIndex:index,
		})
		fetch("/get_hotel?type="+type+"&city="+cityEn[this.state.currentIndex]).then(respose=>{return respose.json()})
		.then(json=>{
			this.props.citydata(json)
		})
	}
	_reset(){
		this.setState({
			currentIndex:0,
			typeIndex:0
		})
		fetch("/get_hotel?city="+cityEn[0]+"&type="+type[0]).then(respose=>{return respose.json()})
		.then(json=>{
			this.props.citydata(json)
		})
	}
}