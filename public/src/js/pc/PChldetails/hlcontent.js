import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button} from 'antd';
// 读取自己定义的外部组件

export default class Hlcontent extends React.Component{
	constructor(){
		super();
		this.state={
			data:{}
		}
	}
	componentDidMount(){
		var charmberid = this.props.charmberid;
		fetch("/post_hlcharmber",{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`hlid=${charmberid}`
		}).then(respose=>{return respose.json()})
		.then(json=>{
			this.setState({
				data:json
			})
		})
	}
	render(){
		var datas = this.state.data;
		var content = datas.length?datas.map((item,index)=>{
			return(
				<li key={index}>
					<div style={{width:'260px'}}>
						<span className='span'>{item.hlcharmber}</span>
					</div>
					<div style={{width:'104px'}}>{item.hlbedtype}</div>
					<div style={{width:'104px'}}>{item.hlbreakfast}</div>
					<div style={{width:'104px'}}>{item.hlbroadband}</div>
					<div style={{width:'160px'}}>￥{item.hlprice}</div>
					<div style={{width:'98px'}}>
						<strong>立即预订</strong>
					</div>
				</li>
			)
		})
		:<div style={{textAlign:'center'}}>很抱歉，该酒店在此期间无法预订</div>
		return (
			<div className='refer_top'>
				<div className='title'>
					<span>
						<i></i>
						房型预订
					</span>
				</div>
				<div className='content'>
					<div className='table'>
						<div className='thead'>
							<div className='th' style={{width:'260px'}}>
								<span className='span'>酒店房型</span>
							</div>
							<div className='th' style={{width:'104px'}}>床型</div>
							<div className='th' style={{width:'104px'}}>早餐</div>
							<div className='th' style={{width:'104px'}}>宽带</div>
							<div className='th' style={{width:'260px'}}>价格(明日)</div>
						</div>
						<ul>
							{content}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}