import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button} from 'antd';
// 引入自己写好的模块
import Usercontent from './usercontent';
import Userupdate from './userupdate';
import Usercollect from './usercollect';
import Userindent from './userindent';
// 设计好所需的模块
var user=["个人资料","修改密码","我的收藏","我的订单"];
export default class PCusercenter extends React.Component{
	constructor(){
		super();
		this.state={
			currentIndex:localStorage.currentIndex
		}
	}
	render(){
		var userct;
		switch(localStorage.currentIndex){
			case '0':userct=<Usercontent />;
			break;
			case '1':userct=<Userupdate />;
			break;
			case '2':userct=<Usercollect />;
			break;
			case '3':userct=<Userindent />;
			break;
		}
		let content=user.map((item,index)=>{
			let color = this.state.currentIndex==index?"#fff":"#333";
			let bgcolor = this.state.currentIndex==index?"#008ad6":"#f5f5f5";
			return (
				<li key={index} style={{backgroundColor:bgcolor,color:color}}
					onClick={this._userc.bind(this,index)}
				>{item}</li>
			)
		})
		return (
			<div className='pc_usercenter'>
				<Row>
					<Col span={1}></Col>
					<Col span={22}>
						<Row>
							<Col span={3}>
								<ul className='user_list'>
									{content}
								</ul>
							</Col>
							<Col span={21}>
								{userct}
							</Col>
						</Row>
					</Col>
					<Col span={1}></Col>
				</Row>
			</div>
		);
	}
	_userc(index){
		this.setState({
			currentIndex:index
		})
		localStorage.currentIndex=index;
	}
}

