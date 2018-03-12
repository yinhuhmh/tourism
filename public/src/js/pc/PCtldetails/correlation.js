import React from 'react';
import 'antd/dist/antd.css';
import {Link,hashHistory} from 'react-router';
// 读取自己定义的外部组件

export default class Correlation extends React.Component{
	constructor(){
		super();
		this.state={
			data:[]
		}
	}
	componentDidMount(){
		fetch("/get_travel?city=all").then(respose=>{return respose.json()})
			.then(json=>{
				this.setState({
					data:json
				})
			})
	}
	render(){
		var datas = this.state.data;
		let content=datas.length?datas.map((item,index)=>{
			if(index>2&&index<9){
				return(
					<li key={index} onClick={this._reload.bind(this,item.title)}>
						<div className='image'>
							<img src={item.imgsrc} />
							<div className='image_title'>
								<span>{item.title}</span>
							</div>
						</div>
					</li>
				)
			}
		})
		:<div>努力加载中...</div>;
		return (
			<div className='pc_scenicright' style={{marginLeft:'55px'}}>
				<div className='pc_scenictitle'>
					相关游记
				</div>
				<ul className='pc_imglist'>
					{content}
				</ul>
			</div>
		);
	}
	//相关游记
	_reload(title){
		fetch("/get_travel?title="+title).then(respose=>{return respose.json()})
		.then(json=>{
			this.setState({
				data:json
			})
			hashHistory.push({
				pathname: '/pctldetails/'+json[0].title
			});
			window.location.reload();
		})
	}
}