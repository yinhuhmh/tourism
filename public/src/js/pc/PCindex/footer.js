import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button} from 'antd';
import {Link,hashHistory} from 'react-router';
// 读取自己定义的外部组件
export default class Footer extends React.Component{
	constructor(){
		super();
		this.state={
			isshow:'none'
		}
	}
	render(){
		return(
			<div className='pc_footer'>
				<Row>
					<Col span={5}></Col>
					<Col span={14}>
						<div className='footer_content'>
							<span>泉州师范软件学院  毕业设计</span>
							<span>软件开发  14级（1）班</span>
							<span onClick={this._mzclick.bind(this)}>143111050  黄铭辉</span>
						</div>
					</Col>
					<Col span={5}>
						<div className='admin' onClick={this._click.bind(this)}
						style={{display:this.state.isshow}}>管理员登录</div>
					</Col>
				</Row>
			</div>
		)
	}
	_click(){
		hashHistory.push(`/pcadminlogin`);
	}
	_mzclick(){
		if(this.state.isshow='none'){
			this.setState({
				isshow:'block'
			})
		}else{
			this.setState({
				isshow:'none'
			})
		}
	}
}