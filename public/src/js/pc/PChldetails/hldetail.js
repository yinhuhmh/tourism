import React from 'react';
import 'antd/dist/antd.css';
import {message} from 'antd';
import {Row, Col ,Input ,Button} from 'antd';

// 读取自己定义的外部组件
import Hlcontent from './hlcontent';

export default class Hldetail extends React.Component{
	constructor(){
		super();
		this.state = {
			data:{},
			collect:'收藏',
			hlid:''
		}
	}
	componentDidMount(){
		var hltitle=this.props.jdtitle;
		this.setState({
			hlid:localStorage.userid
		})
		fetch("/get_hotel?title="+hltitle).then(respose=>{return respose.json()})
		.then(json=>{
			this.setState({
				data:json
			})
		})
		fetch("/post_collselect",{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`title=${hltitle}&userid=${localStorage.userid}`
			}).then(respose=>{return respose.json()})
			.then(json=>{
				if(json.length!=0){
					this.setState({
						collect:'已收藏'
					})
				}
		})
	}
	render(){
		var datas=this.state.data;
		let content=datas.length?datas.map((item,index)=>{
			return(
				<div className='pc_hlcontent' key={index}>
					<div className='detail_top'>
						<img src={item.imgsrc} />
						<div className='right'>
							<h2>{item.title}
								<i>{item.town}</i>
							</h2>
							<span onClick={this._collect.bind(this,item.title,item.imgsrc,item.type,item.address,item.price,item.town)}>
								<i></i>
								<em>{this.state.collect}</em>
							</span>
							<ul>
								<li>
									<b>类型：</b>
									{item.type}
								</li>
								<li>
									<b>地址：</b>
									{item.address}
								</li>
							</ul>
							<div className='step'>
								<div className='title'>预订流程：</div>
								<img src='http://www.fjta.com/static/asset/dest/img/hotel-step.png' />
							</div>
						</div>
					</div>
					<div className='detail_bottom'>
						<Row>
							<Col span={17}>
								<div className='refer'>
									{/*房型预订*/}
									<Hlcontent charmberid={item.id} />
									<div className='refer_center'>
										<div className='title'>
											<span>
												<i></i>
												交通位置
											</span>
										</div>
										<div className='content'>
											<div className='text'>
												{item.traffic}
											</div>
										</div>
									</div>
									<div className='refer_bottom'>
										<div className='title'>
											<span>
												<i></i>
												酒店信息
											</span>
										</div>
										<div className='content'>
											<div className='text' dangerouslySetInnerHTML = {{__html:item.hotel}} />
											<ul>
												<li>
													<strong>服务设施</strong>
													<div>
														{item.service}
													</div>
												</li>
												<li>
													<strong>休闲设施</strong>
													<div>{item.relaxation}</div>
												</li>
												<li>
													<strong>餐饮服务</strong>
													<div>{item.repast}</div>
												</li>
												<li>
													<strong>支持信用卡</strong>
													<div>{item.card}</div>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</Col>
							<Col span={7}></Col>
						</Row>
					</div>
				</div>
			)
		})
		:<div>努力加载中...</div>;
		return (
			<div className='pc_hldetail'>
				<Row>
					<Col span={1}></Col>
					<Col span={22}>
						<div className='pc_midnav'>
							<span>首页</span>
							<span>></span>
							<span>酒店列表</span>
							<span>></span>
							<span>酒店详情</span>
						</div>
						{content}
					</Col>
					<Col span={1}></Col>
				</Row>
			</div>
		);
	}
	_collect(title,imgsrc,type,address,price,town){
		if (this.state.hlid!='') {
			fetch("/post_collselect",{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`title=${title}&userid=${localStorage.userid}`
			}).then(respose=>{return respose.json()})
			.then(json=>{
				if (json.length==0) {
					fetch("/post_collect",{
						method:"POST",
						headers:{
							"Content-Type":"application/x-www-form-urlencoded"
						},
						body:`userid=${localStorage.userid}&title=${title}&imgsrc=${imgsrc}&type=${type}&address=${address}&price=${price}&city=${town}&sckey=2`
					}).then(respose=>{return respose.json()})
					.then(json=>{
						this.setState({
							collect:'已收藏'
						})
					})
				}else{
					if(json[0].title!=title){
					fetch("/post_collect",{
						method:"POST",
						headers:{
							"Content-Type":"application/x-www-form-urlencoded"
						},
						body:`userid=${localStorage.userid}&title=${title}&imgsrc=${imgsrc}&type=${type}&address=${address}&price=${price}&city=${town}&sckey=2`
					}).then(respose=>{return respose.json()})
					.then(json=>{
						this.setState({
							collect:'已收藏'
						})
					})
					}else{
						fetch("/post_colldelete",{
							method:"POST",
							headers:{
								"Content-Type":"application/x-www-form-urlencoded"
							},
							body:`userid=${localStorage.userid}&title=${title}`
						}).then(respose=>{return respose.json()})
						.then(json=>{
							this.setState({
								collect:'收藏'
							})
						})
					}
				}
			})
		}else{
			message.warning('请先登录');
			message.config({
			  top: 140,
			  duration: 2,
			});
		}
	}
}