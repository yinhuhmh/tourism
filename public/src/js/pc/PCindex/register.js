import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button,Modal,Form,Icon,message} from 'antd';
const FormItem = Form.Item;
// 读取自己定义的外部组件

class Register extends React.Component{
	constructor(){
		super();
		this.state = {
			visible:false
		}
	}
	render(){
		return (
			<div style={{display:"inline-block"}}>
				<Button type="danger" onClick={this._register.bind(this)}>注册</Button>
				<Modal title="注册"
       			  visible={this.state.visible}
       			  onOk={this.handleOk.bind(this)}
       			  onCancel={this.handleCancel.bind(this)}
       			>
       				<Form onSubmit={this.handleSubmit.bind(this)}>
        				<FormItem>
        					<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="输入账号" />
        				</FormItem>
        				<FormItem>
        				    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="输入密码" />
        				</FormItem>
        				<FormItem>
        				    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="再次输入密码" />
        				</FormItem>
        				<Button type="primary" htmlType="submit">
          					注册
          				</Button>
      				</Form>
       			</Modal>
			</div>
		);
	}
	_register(){
		this.setVisible(true)
	}
	handleSubmit(e){
		e.preventDefault();
		message.success('注册成功');
		message.config({
		  top: 100,
		  duration: 2,
		});
		this.setVisible(false);
	}
	handleOk(){
		this.setVisible(false);
	}
	handleCancel(){
		this.setVisible(false);
		message.warning('取消注册');
		message.config({
		  top: 100,
		  duration: 2,
		});
	}
	setVisible(visible){
		this.setState({
      		visible: visible
    	});
	}
}
export default Register =F