import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button} from 'antd';

// 读取自己定义的外部组件
import Tkmessage from '../PCtkmiddle/tkmessage';

export default class Detail extends React.Component{
	constructor(){
		super();
		this.state = {
			data:{}
		}
	}
	componentDidMount(){
		fetch("/get_contentslist?id="+this.props.mpid).then(respose=>{return respose.json()})
		.then(json=>{
			this.setState({
				data:json
			})
		})
	}
	render(){
		var datas=this.state.data;
		let content=datas.length?datas.map((item,index)=>{
			return (
				<div key={index}>
					<Row>
						<Col span={1}></Col>
						<Col span={22}>
							<div className='pc_midnav'>
								<span>首页</span>
								<span>></span>
								<span>门票列表</span>
								<span>></span>
								<span>{item.title}</span>
								<span>></span>
								<span>概述</span>
							</div>
							<Col span={5}>
								<Tkmessage data={this.state.data} city={item.English}
								reload={this._reload.bind(this)} />
							</Col>
							<Col span={19}>
								<div className='pc_tkdetail'>
									<div className='title'>
										<h3>{item.title}景点概述</h3>
									</div>
									<div className='content' dangerouslySetInnerHTML = {{__html:item.content}} />
								</div>
							</Col>
						</Col>
						<Col span={1}></Col>
					</Row>
				</div>
			)
		})
		:<div>努力加载中...</div>;
		return (
			<div className='pc_detail'>
				{content}
			</div>
		);
	}
	_reload(id){
		fetch("/get_contentslist?id="+id).then(respose=>{return respose.json()})
		.then(json=>{
			this.setState({
				data:json
			})
		})
	}
}