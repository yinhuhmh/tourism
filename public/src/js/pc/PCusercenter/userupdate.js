import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button,message} from 'antd';
// 引入自己写好的模块
// 设计好所需的模块
export default class Userupdate extends React.Component{
	constructor(){
		super();
		this.state={
			currentpwd:'请您输入当前使用的密码',
			newpwd:'请您输入新的密码',
			againpwd:'再次确认您的新密码',
			value:'',
			value1:'',
			value2:'',
			color:'#999',
			color1:'#999',
			color2:'#999',
			bordercolor:'#999',
			bordercolor1:'#999',
			bordercolor2:'#999'
		}
	}
	render(){
		return (
			<div className='userupdate'>
				<div className='usertitle'>
					<span>修改密码</span>
				</div>
				<div className='useritem'>
					<div>
						<label>
							<i>当前密码：</i>
							<input type="text" onChange={this._change.bind(this)}
							onBlur={this._blur.bind(this)} value={this.state.value}
							style={{borderColor:this.state.bordercolor}} />
						</label>
						<span style={{color:this.state.color}}>{this.state.currentpwd}</span>
					</div>
					<div>
						<label>
							<i>新密码：</i>
							<input type="text" onChange={this._change1.bind(this)}
							onBlur={this._blur1.bind(this)} value={this.state.value1}
							style={{borderColor:this.state.bordercolor1}} />
						</label>
						<span style={{color:this.state.color1}}>{this.state.newpwd}</span>
					</div>
					<div>
						<label>
							<i>确认密码：</i>
							<input type="text" onChange={this._change2.bind(this)}
							onBlur={this._blur2.bind(this)} value={this.state.value2}
							style={{borderColor:this.state.bordercolor2}} />
						</label>
						<span style={{color:this.state.color2}}>{this.state.againpwd}</span>
					</div>
					<em className='userbtn' style={{marginLeft:'94px',marginTop:'10px'}}
					onClick={this._submit.bind(this)}>保存设置</em>
				</div>
			</div>
		);
	}
	_change(e){
		this.setState({
			value:e.target.value,
			currentpwd:'',
			bordercolor:'#999'
		})
	}
	_blur(){
		if(this.state.value==''){
			this.setState({
				currentpwd:'请输入当前使用的密码！',
				color:'#ef0a00',
				bordercolor:'#ef0a00'
			})
		}
	}
	_change1(e){
		this.setState({
			value1:e.target.value,
			newpwd:'',
			bordercolor1:'#999'
		})
	}
	_blur1(){
		if(this.state.value1==''){
			this.setState({
				newpwd:'请输入新密码！',
				color1:'#ef0a00',
				bordercolor1:'#ef0a00'
			})
		}
	}
	_change2(e){
		this.setState({
			value2:e.target.value,
			againpwd:'',
			bordercolor2:'#999'
		})
	}
	_blur2(){
		if(this.state.value2==''){
			this.setState({
				againpwd:'请确认新密码！',
				color2:'#ef0a00',
				bordercolor2:'#ef0a00'
			})
		}
	}
	_submit(e){
		if(this.state.value==''&&this.state.value1==''&&this.state.value2==''){
			this.setState({
				currentpwd:'请输入当前使用的密码！',
				newpwd:'请输入新密码！',
				againpwd:'请确认新密码！',
				color:'#ef0a00',
				color1:'#ef0a00',
				color2:'#ef0a00',
				bordercolor:'#ef0a00',
				bordercolor1:'#ef0a00',
				bordercolor2:'#ef0a00'
			})
		}else{
			if(this.state.value1==this.state.value2){
				fetch("/post_select",{
					method:"POST",
					headers:{
						"Content-Type":"application/x-www-form-urlencoded"
					},
					body:`username=${localStorage.username}&password=${this.state.value}&name=us`
				}).then(respose=>{return respose.json()})
				.then(json=>{
					if(json.length==0){
						this.setState({
							currentpwd:'原始密码错误！',
							color:'#ef0a00',
							bordercolor:'#ef0a00'
						})
					}else{
						fetch("/post_update",{
							method:"POST",
							headers:{
								"Content-Type":"application/x-www-form-urlencoded"
							},
							body:`username=${localStorage.username}&password=${this.state.value1}`
						}).then(respose=>{return respose.json()})
						.then(json=>{
							message.success('修改密码成功');
							message.config({
							  top: 100,
							  duration: 2,
							});
							this.setState({
								value:'',
								value1:'',
								value2:''
							})
						})
					}
				})
			}else{
				this.setState({
					againpwd:'密码不一致，请重新输入！',
					color2:'#ef0a00',
					bordercolor2:'#ef0a00'
				})
			}
		}
	}
}

