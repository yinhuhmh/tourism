import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button} from 'antd';
var city=["不限","福州","厦门","漳州","泉州","三明","莆田","南平","龙岩","宁德"];
var cityEn=["all","fuzhou","xiamen","zhangzhou","quanzhou","sanming","putian","nanping","longyan","ningde"];
// 读取自己定义的外部组件
export default class CityList extends React.Component{
	constructor(){
		super();
		this.state={
			currentIndex:0,
			typeIndex:0,
			datas:[],
			travel:[],
			travelEn:[]
		}
	}
	componentDidMount(){
		var travelarr = ["不限"];
		var	travelEnarr = ["all"];	
		fetch('/get_travel?city=all').then((response)=>{
			return response.json();
		}).then(json=>{
			json.map((item,index)=>{
				travelarr.push(item.scenic);
				travelEnarr.push(item.english);
			})
		});
		this.setState({
			travel:travelarr,
			travelEn:travelEnarr
		})
		fetch("/get_travel?city="+cityEn[0]+"&english="+travelEnarr[0]).then(respose=>{return respose.json()})
		.then(json=>{
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
		let list=this.state.travel.map((item,index)=>{
			let color = this.state.typeIndex==index?"#fff":"#008ad6";
			let bgcolor = this.state.typeIndex==index?"#f60":"#fff";
			return (
				<li key={index} style={{backgroundColor:bgcolor,color:color}}
					onClick={this._level.bind(this,this.state.travelEn[index],index)}
				>{item}</li>
			)
		})
		return (
				<div>
					<div className='pc_citycenter'>
						<div className='pc_cityitem'>
							<div className='pc_citytitle'>目的地：</div>
							<ul className='pc_citylist'>
								{content}
							</ul>
						</div>
						<div className='pc_cityitem'>
							<div className='pc_citytitle'>景&nbsp;&nbsp;&nbsp;点：</div>
							<ul className='pc_citylist'>
								{list}
							</ul>
						</div>
						<div className='pc_cityselect'>
							<div className='pc_citytitle'>已选条件：</div>
							<ul className='pc_citymain'>
								<li>目的地：{city[this.state.currentIndex]}</li>
								<li>景点: {this.state.travel[this.state.typeIndex]}</li>
								<li className='pc_citymain_select'
								onClick={this._reset.bind(this)}>重新筛选</li>
							</ul>
						</div>
					</div>
					<div className='pc_citycondition'>
						<span>最新</span>
						<span>最热</span>
					</div>
				</div>
		);
	}
	_lifetch(city,index){
		this.setState({
			currentIndex:index,
			typeIndex:0
		})
		fetch("/get_travel?city="+city).then((response)=>{
			return response.json();
		}).then(json=>{
			var travelarr = ["不限"];
			var travelEnarr = ["all"];
			json.map((item,index)=>{
				travelarr.push(item.scenic);
				travelEnarr.push(item.english);
			})
			this.setState({
				travel:travelarr,
				travelEn:travelEnarr
			})
		});
		fetch("/get_travel?city="+city+"&english="+this.state.travelEn[0]).then(respose=>{return respose.json()})
		.then(json=>{
			this.props.citydata(json);
		})
	}
	_level(type,index){
		this.setState({
			typeIndex:index,
		})
		fetch("/get_travel?english="+type+"&city="+cityEn[this.state.currentIndex]).then(respose=>{return respose.json()})
		.then(json=>{
			this.props.citydata(json)
		})
	}
	_reset(){
		this.setState({
			currentIndex:0,
			typeIndex:0
		})
		fetch("/get_travel?city=all").then((response)=>{
			return response.json();
		}).then(json=>{
			var travelarr = ["不限"];
			var travelEnarr = ["all"];
			json.map((item,index)=>{
				travelarr.push(item.scenic);
				travelEnarr.push(item.english);
			})
			this.setState({
				travel:travelarr,
				travelEn:travelEnarr
			})
		});
		fetch("/get_travel?city="+cityEn[0]+"&english="+this.state.travelEn[0]).then(respose=>{return respose.json()})
		.then(json=>{
			this.props.citydata(json)
		})
	}
	// _newest(cityEn,travelEn){
	// 	fetch("/get_travel?id=1"+"&city="+cityEn+"&english="+travelEn).then(respose=>{return respose.json()})
	// 	.then(json=>{
	// 		this.props.citydata(json)
	// 	})
	// }
	// _hottest(cityEn,travelEn){
	// 	fetch("/get_travel?id=2"+"&city="+cityEn+"&english="+travelEn).then(respose=>{return respose.json()})
	// 	.then(json=>{
	// 		this.props.citydata(json)
	// 	})
	// }
}