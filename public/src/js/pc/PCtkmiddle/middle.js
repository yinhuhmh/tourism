import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button} from 'antd';
import {Link} from 'react-router';
// 读取自己定义的外部组件
import Tkmessage from './tkmessage';
import TKcontent from './tkcontent';
export default class Middle extends React.Component{
	constructor(){
		super();
		this.state = {
			data:{},
			title:""
		}
	}
	render(){
		if(this.state.title != this.props.title){
			fetch("/get_contentslist?title="+this.props.title).then(respose=>{return respose.json()})
			.then(json=>{
				this.setState({
					data:json,
					title:this.props.title
				})
			})
		}
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
							</div>
							<Col span={5}>
								<Tkmessage data={this.state.data} city={item.English} />
							</Col>
							<Col span={19}>
								<Row>
									<Col span={16}>
										<div className='pc_left'>
											<img src={item.imgsrc} />
										</div>
									</Col>
									<Col span={8}>
										<div className='pc_right'>
											{item.desc}
											<Link to={`/pctkdetails/${item.id}`}><span>详情>></span></Link>
										</div>
									</Col>
								</Row>
								<TKcontent city={item.English} data={this.state.data}/>
							</Col>
						</Col>
						<Col span={1}></Col>
					</Row>
					
				</div>
			)
		})
		:<div>努力加载中...</div>;
		return (
			<div className='pc_middle'>
				{content}
			</div>
		);
	}
}