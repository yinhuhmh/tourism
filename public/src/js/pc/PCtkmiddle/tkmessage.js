import React from 'react';
import 'antd/dist/antd.css';
import {message} from 'antd';
import {Link,hashHistory} from 'react-router';
// 读取自己定义的外部组件
import Midbanner from './midbanner';

export default class Tkmessage extends React.Component{
	constructor(){
		super();
		this.state = {
			data:{},
			collect:'加入收藏',
			userid:''
		}
	}
	componentDidMount(){
		var mptitle=this.props.data[0].title;
		this.setState({
			userid:localStorage.userid
		})
		fetch("/get_contentslist?English="+this.props.city).then(respose=>{return respose.json()})
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
			body:`title=${mptitle}&userid=${localStorage.userid}`
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
		var datas = this.props.data;
		var city = this.state.data;
		let content = datas.length?datas.map((item,index)=>{
			return (
				<div className='pc_midleft' key={index}>
					<div className='pc_midbox'>
						<div className='pc_midtitle'>{item.title}</div>
						<div className='pc_midlevel'>
							<span>{item.type}级景区</span>
						</div>
						<div className='pc_midadd'>
							<em></em>
							<span>赞({item.praise})</span>
							<strong onClick={this._collect.bind(this,item.title,item.imgsrc,item.type,item.address,item.price,item.city)}>
								<i></i>
								{this.state.collect}
							</strong>
						</div>
					</div>
					<Midbanner data={item.title}/>
					<div className='pc_middetail'>
						<ul>
							<li>
								<span>门票信息：</span>
								<div>{item.information}</div>
							</li>
							<li>
								<span>详细地址：</span>
								<div>{item.address}</div>
							</li>
							<li>
								<span>联系电话：</span>
								<div>{item.phone}</div>
							</li>
							<li>
								<span>开放时间：</span>
								<div>{item.playtime}</div>
							</li>
							<li>
								<span>游玩时间：</span>
								<div>{item.time}</div>
							</li>
							<li>
								<span>最佳季节：</span>
								<div>{item.season}</div>
							</li>
						</ul>
					</div>
				</div>
			)
		})
		:<div>努力加载中...</div>;
		let cityimg = city.length?city.map((item,index)=>{
			return (
				<li key={index} onClick={this._reload.bind(this,item.id)}>
					<img src={item.imgsrc} />
					<p>{item.title}</p>
				</li>
			)
		})
		:<div>努力加载中...</div>;
		return (
			<div>
				{content}
				{/*附近景点*/}
				<div className='pc_midnearby'>
					<span>附近景点</span>
					<ul className='content'>
						{cityimg}
					</ul>
				</div>
			</div>
		);
	}
	_collect(title,imgsrc,type,address,price,city){
		if (this.state.userid!='') {
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
						body:`userid=${localStorage.userid}&title=${title}&imgsrc=${imgsrc}&type=${type}&price=${price}&address=${address}&city=${city}&sckey=1`
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
						body:`userid=${localStorage.userid}&title=${title}&imgsrc=${imgsrc}&type=${type}&price=${price}&address=${address}&city=${city}&sckey=1`
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
								collect:'加入收藏'
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
	//附近景点
	_reload(id){
		fetch("/get_contentslist?id="+id).then(respose=>{return respose.json()})
		.then(json=>{
			this.setState({
				data:json
			})
			hashHistory.push({
				pathname: '/pctkmiddle/'+json[0].title
			});
			window.location.reload();
		})
	}
}