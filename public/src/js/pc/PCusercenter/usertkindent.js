import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button} from 'antd';
import {Link} from 'react-router';
// 引入自己写好的模块
// 设计好所需的模块
export default class Usertkindent extends React.Component{
	constructor(){
		super();
		this.state={
			data:[]
		}
	}
	componentDidMount(){
		fetch('/post_ddselect',{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`userid=${localStorage.userid}`
		}).then((response)=>{
			return response.json();
		}).then(json=>{
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
					<div className='order_top'>
						<span>
							订单编号：
							<em>{item.id}</em>
						</span>
						<span>
							下单时间：
							<em>{item.xtdate}</em>
						</span>
					</div>
					<div className='order_bottom'>
						<div className='order_desc'>
							<div className='order_left'>
								<img src={item.ddimg} />
								<div className='order_text'>
									<b>{item.ddname}</b>
									<strong>
										<span>票价</span>
										<i>：</i>
										<em>¥{item.ddprice}</em>
									</strong>
									<strong>
										<span style={{letterSpacing:'0'}}>预定日期</span>
										<i>：</i>
										<em>{item.dddate}</em>
									</strong>
								</div>
							</div>
							<div className='order_common'>
								<strong>{item.ddnum}张</strong>
							</div>
							<div className='order_common' style={{color:'#f60',width:'14%',fontSize:'20px'}}>
								<strong>¥{item.allprice}</strong>
							</div>
							<div className='order_common' style={{width:'14%'}}>
								<strong>{item.ddstate}</strong>
							</div>
							<div className='order_operation'>
								<p>{item.ddstate=='已支付'?'去看看':'去支付'}</p>
							</div>
						</div>
					</div>
				</li>
			)
		})
		:<div>暂无订单...</div>
		return (
			<div className='indentbox'>
				<div className='indenttop' style={{display:datas.length?'block':'none'}}>
					<strong style={{width:'48%'}}>产品信息</strong>
					<strong style={{width:'10%'}}>数量</strong>
					<strong style={{width:'14%'}}>总金额(元)</strong>
					<strong style={{width:'14%'}}>状态</strong>
					<strong style={{width:'10%'}}>操作</strong>
				</div>
				<ul>
					{content}
				</ul>
			</div>
		);
	}
}

