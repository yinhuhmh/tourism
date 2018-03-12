import React from 'react';
import 'antd/dist/antd.css';
import {Link} from 'react-router'
// 读取自己定义的外部组件
import Box from './box';

export default class About extends React.Component{
	constructor(){
		super();
		this.state = {
			data:{},
			name:localStorage.title,
			colorIndex:0
		}
	}
	componentDidMount(){
		fetch("/get_aboutfj?about="+localStorage.title).then(respose=>{return respose.json()})
		.then(json=>{
			this.setState({
				data:json,
				colorIndex:json[0].id-1
			})
		})
	}
	render(){
		if(this.state.name!=this.props.name){
			window.location.reload();
		}
		var datas = this.state.data;
		var bgcArr = ['#018bd6','#4cbebe','#e49e6a','#a47b5f','#a6937c'];
		let content=datas.length?datas.map((item,index)=>{
			return(
				<div key={index}>
					<div className='title' style={{backgroundColor:bgcArr[this.state.colorIndex]}}>
						<h3>
							<span style={{backgroundColor:bgcArr[this.state.colorIndex]}}>{item.title}</span>
						</h3>
					</div>
					<div className='banner' style={{background:`url(${item.banner}) center 0 no-repeat`}}></div>
					<Box data={this.state.data}/>
				</div>
			)
		})
		:<div>努力加载中...</div>;
		return (
			<div className='pc_about'>
				{content}
			</div>
		);
	}
}