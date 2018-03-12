import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Menu,Dropdown,Button,Modal,Form,Icon,message} from 'antd';
import {Link,hashHistory} from 'react-router';
const FormItem = Form.Item;
const Search = Input.Search;
// 读取自己定义的外部组件
class Header extends React.Component{
	constructor(){
		super();
		this.state = {
			visible:false,
			loginvisible:false,
			loginSuccess:localStorage.userid!=''?true:false,
			id:localStorage.userid,
			username:localStorage.username,
			headimg:localStorage.headimg,
			nickname:localStorage.username,
			data:[],
			searchclass:[],
			isShow:false,
			stop:false,
		}
	}
	componentDidMount(){
		fetch("/post_select",{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`username=${this.state.username}&name=zc`
		}).then(respose=>{return respose.json()})
		.then(json=>{
			this.setState({
				nickname:json[0].nickname,
				headimg:json[0].imgsrc
			})
		})
	}
	render(){
		var {getFieldDecorator} = this.props.form;
		const menu = (
		  <Menu>
		    <Menu.Item>
		      <Link to={`/pcusercenter`}><span style={{color:'#333'}}>个人中心</span></Link>
		    </Menu.Item>
		    <Menu.Item>
		      <span onClick={this.logout.bind(this)}>退出</span>
		    </Menu.Item>
		  </Menu>
		);
		var loginContent = this.state.loginSuccess==true
		?<div style={{textAlign:"center"}}>
			<div className='userleft'>
				{
              		this.state.headimg?
                	<img src={this.state.headimg} style={{ width:'40px',height:'40px',borderRadius:'40px' }} /> :
                	<Icon type="user" style={{ fontSize: 35, color: '#999' }} />
            	}
			</div>
			<div className='userright'>
				<Dropdown overlay={menu} trigger={['click']}>
	  			  	<div className="ant-dropdown-link">
					    {
					    	this.state.nickname?this.state.nickname:localStorage.username
					    } <Icon type="down" />
					</div>
  				</Dropdown>
			</div>
		</div>
		:<div>
			<Button type="primary" onClick={this._login.bind(this)}>登录</Button>
			<Button onClick={this._register.bind(this)}>注册</Button>
		</div>
		//搜索框
		var search = this.state.data.length?this.state.data.map((item,index)=>{
			if(this.state.searchclass[index]=='1'){
				return(
					<li key={index}
					 onMouseOver={()=>this.setState({stop:true})}
					 onMouseOut={()=>this.setState({stop:false})}
					 >
						<span onClick={this._click.bind(this,item)}>{item}</span>
					</li>
				)
			}else{
				return(
					<li key={index}
					 onMouseOver={()=>this.setState({stop:true})}
					 onMouseOut={()=>this.setState({stop:false})}
					 >
						<span onClick={this._click2.bind(this,item)}>{item}</span>
					</li>
				)
			}
		})
		:<li><span>无相关景点/游记</span></li>
		return (
			<div className='pc_header'>
				<ul className='pc_searchlist' style={{display:this.state.isShow?"block":"none",right:localStorage.userid?"220px":"251px"}}>
					{search}
				</ul>
				<Row>
					<Col span={1}></Col>
					<Col span={21}>
						<div className='pc_header_top'>
							<img src="./src/images/tourism.png" />
							<p>福建旅游</p>
							<div className='pc_header_top_login'>
								{loginContent}
								{/*登录模块*/}
								<Modal title="登录"
       							  visible={this.state.loginvisible}
       							  onOk={this.loginOk.bind(this)}
       							  onCancel={this.loginCancel.bind(this)}
       							>
       								<Form onSubmit={this.loginSubmit.bind(this)}>
        								<FormItem>
        									{getFieldDecorator('username',{})(
        										<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="输入账号" />
        									)}
        								</FormItem>
        								<FormItem>
        									{getFieldDecorator('password',{})(
        								    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="输入密码" />
        								    )}
        								</FormItem>
        								<Button type="primary" htmlType="submit">
          									登录
          								</Button>
      								</Form>
       							</Modal>
       							{/*注册模块*/}
								<Modal title="注册"
       							  visible={this.state.visible}
       							  onOk={this.registerOk.bind(this)}
       							  onCancel={this.registerCancel.bind(this)}
       							>
       								<Form onSubmit={this.registerSubmit.bind(this)}>
        								<FormItem>
        									{getFieldDecorator('username',{})(
        										<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="输入账号" />
        									)}
        								</FormItem>
        								<FormItem>
        									{getFieldDecorator('password',{})(
        								    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="输入密码" />
        								    )}
        								</FormItem>
        								<FormItem>
        									{getFieldDecorator('again_password',{})(
        								    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="再次输入密码" />
        								    )}
        								</FormItem>
        								<Button type="primary" htmlType="submit">
          									注册
          								</Button>
      								</Form>
       							</Modal>
							</div>
							{/*搜索框*/}
							<div className='pc_header_top_search'>
								<Search
    								placeholder="景点或游记"
    								style={{ width: 300}}
    								onFocus={()=>this.setState({isShow:true})}
    								onBlur={()=>{this.state.stop?[]:this.setState({isShow:false})}}
    								onSearch={this._search.bind(this,this.state.data[0])}
   									onChange={this._change.bind(this)} />
							</div>
						</div>
					</Col>
					<Col span={2}></Col>
				</Row>
			</div>
		);
	}
	_register(){
		this.setVisible(true)
	}
	registerSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err,value)=>{
			if(err){
				console.log(err);
			}else{
				var username = value.username;
				var password = value.password;
				var again_password = value.again_password;
				//判断输入值是否为空
				if(username==''||password==''||again_password==''
					||username==undefined||password==undefined||again_password==undefined){
					message.warning('内容不能为空!');
					message.config({
					  top: 100,
					  duration: 2,
					});
					return;
				}else{
					if (password==again_password) {
						fetch("/post_select",{
							method:"POST",
							headers:{
								"Content-Type":"application/x-www-form-urlencoded"
							},
							body:`username=${username}&name=zc`
						}).then(respose=>{return respose.json()})
						.then(json=>{
							if (json[0]) {
								message.warning('用户名已存在');
								message.config({
								  top: 100,
								  duration: 2,
								});
							}else{
								message.success('注册成功');
								message.config({
								  top: 100,
								  duration: 2,
								});
								this.setVisible(false);
								fetch("/post_insert",{
									method:"POST",
									headers:{
										"Content-Type":"application/x-www-form-urlencoded"
									},
									body:`username=${username}&password=${password}`
								}).then(respose=>{return respose.json()})
								.then(json=>{})
							}
						})
					}else{
						message.error('两次输入密码不一致');
						message.config({
						  top: 100,
						  duration: 2,
						});
					}
				}
			}
		})
	}
	registerOk(){
		this.setVisible(false);
	}
	registerCancel(){
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

	_login(){
		this.loginVisible(true)
	}
	logout(){
		localStorage.userid='';
		this.setState({
			loginSuccess:false
		});
	}
	loginSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err,value)=>{
			if(err){
				console.log(err);
			}else{
				var username = value.username;
				var password = value.password;
				if(username==''||password==''||username==undefined||password==undefined){
					message.warning('账号、密码不能为空!');
					message.config({
					  top: 100,
					  duration: 2,
					});
				}else{
					fetch("/post_select",{
						method:"POST",
						headers:{
							"Content-Type":"application/x-www-form-urlencoded"
						},
						body:`username=${username}&password=${password}&name=dl`
					}).then(respose=>{return respose.json()})
					.then(json=>{
						if(json[0]){
							message.success('登录成功');
							message.config({
							  top: 100,
							  duration: 2,
							});
							this.loginVisible(false);
							this.setState({
								id:json[0].id,
								username:json[0].username,
								headimg:json[0].imgsrc,
								loginSuccess:json[0].id?true:false
							});
							if(json[0].id){
								localStorage.userid=json[0].id;
								localStorage.username=json[0].username;
								localStorage.headimg=json[0].imgsrc;
							}
						}else{
							message.error('登录失败');
							message.config({
							  top: 100,
							  duration: 2,
							});
						}
					})
				}
			}
		})
	}
	loginOk(){
		this.loginVisible(false);
	}
	loginCancel(){
		this.loginVisible(false);
		message.warning('取消登陆');
		message.config({
		  top: 100,
		  duration: 2,
		});
	}
	loginVisible(visible){
		this.setState({
      		loginvisible: visible
    	});
	}
	_change(e){
	//搜索框
		var arr = [];
		var arr2 = [];
		fetch('/post_search',{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`title=${e.target.value}`
		}).then((response)=>{
			return response.json();
		}).then(json=>{
			json.map((item,index)=>{
				arr.push(item.title);
				arr2.push(item.searchclass);
			})
			this.setState({
				data:arr,
				searchclass:arr2
			})
		})
	}
	_search(value){
		fetch('/post_search',{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`title=${value}`
		}).then((response)=>{
			return response.json();
		}).then(json=>{
			if(json[0].searchclass=='1'){
				hashHistory.push({
					pathname: '/pctkmiddle/'+json[0].title,
				});
				localStorage.indicator = 3;
			}else{
				hashHistory.push({
					pathname: '/pctldetails/'+json[0].title,
				});
				localStorage.indicator = 4;
			}
			if(json[0].title==value){
				window.location.reload();
			}
		})
	}
	_click(item){
		hashHistory.push(`/pctkmiddle/${item}`);
		localStorage.indicator = 3;
		this.setState({isShow:false});
		window.location.reload();
	}
	_click2(item){
		hashHistory.push(`/pctldetails/${item}`);
		localStorage.indicator = 4;
		this.setState({isShow:false});
		window.location.reload();
	}
}

export default Header = Form.create({})(Header);