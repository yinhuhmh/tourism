import React from 'react';
import 'antd/dist/antd.css';
import {Link} from 'react-router';
// 读取自己定义的外部组件

export default class Travelhot extends React.Component{
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
					<li key={index}>
						<Link to={`/pctldetails/${item.title}`}>
							<div className='image'>
								<img src={item.imgsrc} />
							</div>
							<div className='text'>
								<span className='text_sp'>
									{item.title}
								</span>
							</div>
						</Link>
					</li>
				)
			}
		})
		:<div>努力加载中...</div>;
		return (
			<div className='pc_scenicright'>
				<div className='pc_scenictitle'>
					游记推荐
				</div>
				<ul className='pc_imglist'>
					{content}
				</ul>
			</div>
		);
	}
}