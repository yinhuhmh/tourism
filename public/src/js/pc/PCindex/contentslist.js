import React from 'react';
import 'antd/dist/antd.css';
import AboutFJ from './aboutFJ';
import {Link} from 'react-router';
// 读取自己定义的外部组件
export default class Contentslist extends React.Component{
	constructor(){
		super();
		this.state = {
			datas:[]
		};
	}
	componentDidMount(){
		fetch('/get_contentslist?English=all').then((response)=>{
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
			if(index>0&&index<9){
				return (
					<li key={index}>
						<Link target="_blank" to={`/pctkmiddle/${item.title}`}>
							<img src={item.imgsrc} />
							<div className='pc_contents_deschide'>
								<div className='pc_conbox'>
									<span>{item.title}</span>
									<p>{item.desc}</p>
									<strong>门票：{item.price}元</strong>
								</div>
							</div>
						</Link>
						<div className='pc_contents_desc'>
							<span>{item.title}</span>
						</div>
					</li>
				);
			}
		})
		:<div>努力加载中...</div>;
		return (
			<div className='pc_contents_content'>
				<ul>{content}</ul>
			</div>
		);
	}
}