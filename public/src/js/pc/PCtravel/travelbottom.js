import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button} from 'antd';
import {Link} from 'react-router';

export default class Citybottom extends React.Component{
	render(){
		var datas = this.props.datas;
		var content = datas.length?datas.map((item,index)=>{
			return (
				<div key={index} className='pc_travelview'>
					<div className='image'>
						<Link to={`/pctldetails/${item.title}`}><img src={item.imgsrc} /></Link>
					</div>
					<div className='desc'>
						<div className='header'>
							<Link to={`/pctldetails/${item.title}`}><h2>{item.title}</h2></Link>
							<div className='like'>
								{item.praise}
								<i></i>
							</div>
							<div className='author'>
								<em>作者：<i>{item.author}</i></em>
								<span>
									发布日期：{item.date}
								</span>
							</div>
						</div>
						<div className='content'>
							{item.desc}
						</div>
					</div>
				</div>
			);
		})
		:<div>努力加载中...</div>;
		return (
			<div className='pc_citybottom'>
				{content}
			</div>
		);
	}
}