import React from 'react';
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import {Link} from 'react-router';
// 读取自己定义的外部组件

export default class Midbanner extends React.Component{
	constructor(){
		super();
		this.state = {
			data:{}
		}
	}
	componentDidMount(){
		fetch("/get_spotimg?title="+this.props.data).then(respose=>{return respose.json()})
		.then(json=>{
			this.setState({
				data:json
			})
		})
	}
	render(){
		var datas = this.state.data;
		let content=datas.length?datas.map((item,index)=>{
			return(
				<div key={index}>
					<Carousel autoplay>
    					<div><img src={item.imgone} /></div>
    					<div><img src={item.imgtwo} /></div>
    					<div><img src={item.imgthree} /></div>
    					<div><img src={item.imgfour} /></div>
    					<div><img src={item.imgfive} /></div>
    					<div><img src={item.imgsix} /></div>
  					</Carousel>
				</div>
			)
		})
		:<div>努力加载中...</div>;
		return (
			<div className='pc_midbanner'>
				{content}
			</div>
		);
	}
}