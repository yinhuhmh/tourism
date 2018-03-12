import React from 'react';
import {Row, Col ,Input ,Menu,Dropdown,Button,Modal,Form,Icon,message} from 'antd';
import {Link,hashHistory} from 'react-router';
// 引入自己写好的模块

// 设计好所需的模块
export default class PCadminlogin extends React.Component{
	constructor(){
		super();
		this.state={
			adminname:'',
			adminpwd:''
		}
	}
	render(){
		return (
			<div className='admin_login'>
				<Row>
					<Col span={8}></Col>
					<Col span={8}>
						<div className='login_box'>
							<div className='admin_box'>
								<span className='admin_top'>管理员登录</span>
								<ul className='admin_bottom'>
									<li>
										<input type='text' placeholder='管理员账号' onChange={this._namechange.bind(this)}/>
									</li>
									<li>
										<input type='password' placeholder='管理员密码' onChange={this._pwdchange.bind(this)} />
									</li>
									<li>
										<strong onClick={this._click.bind(this)}>登录</strong>
									</li>
								</ul>
							</div>
						</div>
					</Col>
					<Col span={8}></Col>
				</Row>
			</div>
		);
	}
	_namechange(e){
		this.setState({
			adminname:e.target.value
		})
	}
	_pwdchange(e){
		this.setState({
			adminpwd:e.target.value
		})
	}
	_click(){
		var adminname=this.state.adminname;
		var adminpwd=this.state.adminpwd;
		if(adminname!=''||adminpwd!=''){
			if(adminname=='admin'||adminpwd=='admin'){
				hashHistory.push(`/pcadmin`);
			}else{
				alert('账号或密码错误！')
			}
		}else{
			alert('账号或密码不为空！')
		}
	}
}

