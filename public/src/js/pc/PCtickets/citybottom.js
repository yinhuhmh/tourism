import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button} from 'antd';
import {Link} from 'react-router';

export default class Citybottom extends React.Component{
	render(){
		var datas = this.props.datas;
		var content = datas.length?datas.map((item,index)=>{
			return (
				<div key={index} className='pc_cityview'>
					<div className='pc_citybox'>
						<div className='image'>
							<Link to={`/pctkmiddle/${item.title}`}><img src={item.imgsrc}/></Link>
						</div>
						<div className='desc'>
							<Link to={`/pctkmiddle/${item.title}`}><h2>{item.title}</h2></Link>
							<p>
								<span>
									级别：<em>{item.type}</em>
								</span>
								<span>地址：{item.address}</span>
							</p>
						</div>
						<div className='price'>
							<span>
								￥<i>{item.price}</i>起
							</span>
							{/*跳转到票价中间详情页*/}
							<Link to={`/pctkmiddle/${item.title}`}><em>去看看</em></Link>
							<p>306609人关注</p>
						</div>
					</div>
					<div className='pc_citymore'>
						<span>查看全部>></span>
					</div>
				</div>
			);

		})
		:<div>努力加载中...</div>;
		return (
			<div className='pc_citybottom'>
				<div className='pc_citycondition'>
					<span>默认排序</span>
					<span>价格从低到高</span>
					<span>价格从高到底</span>
				</div>
				{content}
			</div>
		);
	}
}