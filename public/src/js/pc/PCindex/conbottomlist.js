import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button,Icon} from 'antd';
import AboutFJ from './aboutFJ';
import {Link} from 'react-router'
// 读取自己定义的外部组件
export default class Contentslist extends React.Component{
	constructor(){
		super();
		this.state = {
			datas:[]
		};
	}
	componentDidMount(){
		fetch('/get_travel?city=all').then((response)=>{
			return response.json();
		}).then(json=>{
			this.setState({
				datas:json
			});
		})
	}
	render(){
		var content = this.state.datas.length?
		this.state.datas.map((item,index)=>{
			if(index<6){
				return (
					<li key={index}>
						<Link target="_blank" to={`/pctldetails/${item.title}`}><img src={item.imgsrc} /></Link>
						<div className='pc_contentsbottom_title'>
							<Link target="_blank" to={`/pctldetails/${item.title}`}><p>{item.title}</p></Link>
							<div className='pc_contentsbottom_place'>作者:
								<em> {item.author}  </em>
								<span>
									<i></i>
									{item.place}
								</span>
							</div>
						</div>
					</li>
				);
			}
		})
		:<div>努力加载中...</div>;
		return (
			<div className='pc_contentsbottom_content'>
				<ul>{content}</ul>
			</div>
		);
	}
}