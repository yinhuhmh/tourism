import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button,message} from 'antd';
// 引入自己写好的模块
import Upload from './upload';
// 设计好所需的模块
export default class Usercontent extends React.Component{
	constructor(){
		super();
		this.state={
			value:localStorage.username,
			valuesex:'1',
			valueemail:'',
			valuephone:'',
			valuecity:''
		}
	}
	componentDidMount(){
		fetch('/post_select',{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`id=${localStorage.userid}`
		}).then(respose=>{return respose.json()})
		.then(json=>{
			this.setState({
				value:json[0].nickname,
				valuesex:json[0].sex?json[0].sex:'1',
				valueemail:json[0].email,
				valuephone:json[0].phone,
				valuecity:json[0].city
			})
		})	
	}
	render(){
		return (
			<div className='usercontent'>
				<div className='usertitle'>
					<span>个人资料</span>
				</div>
				<div className='box'>
					<div className='top'>
						<div className='userleft'>
							<span className='headimg'>头像：仅支持jpg,jpeg格式图片，且文件小于2M。</span>
							<Upload />
						</div>
						<div className='userright'>
							<div>
								<span>昵称：</span>
								<input type="text" onChange={this._change.bind(this)}
								value={this.state.value} />
							</div>
							<div>
								<span>性别：</span>
								<input type="radio" className='user_nan'
								onChange={this._changesex.bind(this)} value='1'
								checked={this.state.valuesex=='1'?true:false}/>
								&nbsp;男&nbsp;&nbsp;&nbsp;&nbsp;
								<input type="radio" className='user_nv'
								onChange={this._changesex.bind(this)} value='2'
								checked={this.state.valuesex=='2'?true:false}/>
								&nbsp;女
							</div>
							<div>
								<span>邮箱：</span>
								<input type="text" value={this.state.valueemail}
								onChange={this._changeemail.bind(this)}
								value={this.state.valueemail}/>
							</div>
							<div>
								<span>手机号：</span>
								<input type="text" value={this.state.valuephone}
								onChange={this._changephone.bind(this)}
								value={this.state.valuephone}/>
							</div>
							<div>
								<span>所在城市：</span>
								<input type="text" value={this.state.valuecity}
								onChange={this._changecity.bind(this)}
								value={this.state.valuecity}/>
							</div>
						</div>
					</div>
					<div className='submit'>
						<span className='userbtn' onClick={this._submitdata.bind(this)}>保存设置</span>
					</div>
				</div>
			</div>
		);
	}
	_change(e){
		this.setState({
			value:e.target.value
		})
	}
	_changesex(e){
		if(e.target.value=='1'){
			this.setState({
				valuesex:'1'
			})
		}else{
			this.setState({
				valuesex:'2'
			})
		}
	}
	_changeemail(e){
		this.setState({
			valueemail:e.target.value
		})
	}
	_changephone(e){
		this.setState({
			valuephone:e.target.value
		})
	}
	_changecity(e){
		this.setState({
			valuecity:e.target.value
		})
	}
	_submitdata(){
		fetch('/post_update',{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`id=${localStorage.userid}
				&nickname=${this.state.value}
				&sex=${this.state.valuesex}
				&email=${this.state.valueemail}
				&phone=${this.state.valuephone}
				&city=${this.state.valuecity}`
		}).then(respose=>{return respose.json()})
		.then(json=>{
			message.success('设置成功');
			message.config({
			  top: 100,
			  duration: 2,
			});
			window.location.reload();
		})
	}
}

