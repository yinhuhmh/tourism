import React from 'react';
import 'antd/dist/antd.css';
import {message} from 'antd';
import {Row, Col ,Input ,Button} from 'antd';

// 读取自己定义的外部组件
import Correlation from "./correlation";

export default class Tldetail extends React.Component{
	constructor(){
		super();
		this.state={
			data:{},
			collect:'收藏',
			tlid:'',
			title:'',
		}
	}
	componentDidMount(){
		this.setState({
			tlid:localStorage.userid
		})
		fetch("/post_collselect",{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`title=${this.props.lxtitle}&userid=${localStorage.userid}`
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
		if(this.state.title != this.props.lxtitle){
			fetch("/get_travel?title="+this.props.lxtitle).then(respose=>{return respose.json()})
			.then(json=>{
				this.setState({
					data:json,
					title:this.props.lxtitle
				})
			})
		}
		var datas = this.state.data;
		let content = datas.length?datas.map((item,index)=>{
			return(
				<div key={index}>
					<div className='line_h'></div>
					<div className='pc_tltop'>
						<div className='image'>
							<img src={item.headimg} />
						</div>
						<div className='title'>
							<h3>{item.title}</h3>
							<h4>
								{item.author}
								<span>发表于</span>
								{item.date}
							</h4>
							<div className='collect'>
								<span>
									<i></i>
									<b>赞(0)</b>
								</span>
								<span onClick={this._collect.bind(this,item.title,item.imgsrc,item.author,item.date)}>
									<em></em>
									<b>{this.state.collect}</b>
								</span>
							</div>
						</div>
					</div>
					<div className='line_h'></div>
					<div className='pc_center'>
						<span>
							<i></i>
							途经景点:
						</span>
						<div className='way'>
							<strong dangerouslySetInnerHTML = {{__html:item.passing}} />
						</div>
					</div>
					{/*详情页内容*/}
					<div className='pc_tlcontent' dangerouslySetInnerHTML = {{__html:item.content}} />
				</div>
			)
		})
		:<div>努力加载中...</div>;
		return (
			<div className='pc_tldetail'>
				<Row>
					<Col span={1}></Col>
					<Col span={22}>
						<Col span={17}>
							<div className='pc_midnav'>
								<span>首页</span>
								<span>></span>
								<span>游记列表</span>
								<span>></span>
								<span>游记详情</span>
							</div>
							{content}
						</Col>
						<Col span={7}>
							<Correlation data={this.state.data} />
						</Col>
					</Col>
					<Col span={1}></Col>
				</Row>
			</div>
		);
	}
	_collect(title,imgsrc,author,date){
		console.log(title,imgsrc,author,date)
		if (this.state.tlid!='') {
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
						body:`userid=${localStorage.userid}&title=${title}&imgsrc=${imgsrc}&author=${author}&date=${date}&sckey=3`
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
						body:`userid=${localStorage.userid}&title=${title}&imgsrc=${imgsrc}&author=${author}&date=${date}&sckey=3`
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