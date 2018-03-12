import React from 'react';
import {Row, Col ,Input ,Menu,Dropdown,Button,Modal,Form,Icon,message} from 'antd';
import {Link,hashHistory} from 'react-router';
const Search = Input.Search;
// 引入自己写好的模块

// 设计好所需的模块
export default class Useradmin extends React.Component{
	constructor(){
		super();
		this.state={
			data:{}
		}
	}
	componentDidMount(){
		fetch("/post_select",{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`name=gl`
		}).then(respose=>{return respose.json()})
		.then(json=>{
			this.setState({
				data:json
			})
		})
	}
	render(){
		let datas = this.state.data;
		let content=datas.length?datas.map((item,index)=>{
			return (
				<div className='pc_useradmin_box' key={index}>
					<span style={{width:'20%'}}>{item.id}</span>
					<span style={{width:'20%'}}>{item.username}</span>
					<span style={{width:'20%'}}>{item.password}</span>
					<span style={{width:'40%'}}>
						<div className='pc_useradmin_btn' onClick={this._click.bind(this,item.id)}>删除</div>
					</span>
				</div>
			)
		})
		:<div style={{textAlign:'center'}}>暂无注册人员</div>
		return (
			<div className='pc_useradmin'>
				{/*搜索框*/}
				<div className='pc_useradmin_search'>
					<Search
    					placeholder="输入查询人员"
    					style={{ width: 300}}
    					onSearch={this._search.bind(this)} />
				</div>
				<div className='pc_useradmin_list'>
					<div className='pc_useradmin_title'>
						<span style={{width:'20%'}}>用户ID</span>
						<span style={{width:'20%'}}>用户名</span>
						<span style={{width:'20%'}}>密码</span>
						<span style={{width:'40%'}}>操作</span>
					</div>
					{content}
				</div>
			</div>
		);
	}
	_click(id){
		console.log(id)
		fetch("/post_delete",{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`id=${id}`
		}).then(respose=>{return respose.json()})
		.then(json=>{
			fetch("/post_select",{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`name=gl`
			}).then(respose=>{return respose.json()})
			.then(json=>{
				this.setState({
					data:json
				})
			})
		})
	}
	_search(value){
		console.log(value)
		fetch('/post_select',{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`username=${value}&name=zc`
		}).then((response)=>{
			return response.json();
		}).then(json=>{
			this.setState({
				data:json
			})
		})
	}
}

