import React from 'react';
import 'antd/dist/antd.css';
import {Link} from 'react-router';
// 读取自己定义的外部组件
import Midtitle from './midtitle';

export default class Tkcontent extends React.Component{
	constructor(){
		super();
		this.state = {
			data:{}
		}
	}
	componentDidMount(){
		fetch("/get_travel?city="+this.props.city).then(respose=>{return respose.json()})
		.then(json=>{
			this.setState({
				data:json
			})
		})
	}
	render(){
		var city = this.state.data;
		let content = city.length?city.map((item,index)=>{
			return (
				<li key={index}>
					<Link to={`/pctldetails/${item.title}`}>
						<div className='image'>
							<img src={item.imgsrc} />
							<i>游记</i>
						</div>
						<div className='text'>
							<span>{item.title}</span>
							<p>
								{item.desc}
							</p>
						</div>
					</Link>
				</li>
			)
		})
		:<div>努力加载中...</div>;
		return (
			<div className='pc_midright'>
				{/*门票展示*/}
				<Midtitle data={this.props.data} />
				{/*游记攻略*/}
				<div className='pc_midtravel'>
					<div className='title'>
						<i></i>
						<span>游记</span>
						<em>更多>></em>
					</div>
					<div className='content'>
						<ul>
							{content}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}