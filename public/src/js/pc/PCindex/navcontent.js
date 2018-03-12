import React from 'react';
import 'antd/dist/antd.css';
import AboutFJ from './aboutFJ';
import Destination from './destination';
import {Link} from 'react-router';
// 读取自己定义的外部组件
export default class Navcontent extends React.Component{
	render(){
		console.log(localStorage.indicator)
		return (
			<div className='pc_navigation_content'>
				<ul>
					<Link to={`/`}><li style={{color:localStorage.indicator==1?"#f60":"#333"}}>首页</li></Link>
					<li style={{color:localStorage.indicator==2?"#f60":"#333"}}><AboutFJ /></li>
					<li><Destination /></li>
					<Link to={`/pctickets/票价`}><li style={{color:localStorage.indicator==3?"#f60":"#333"}}>票价预订</li></Link>
					<Link to={`/pctickets/游记`}><li style={{color:localStorage.indicator==4?"#f60":"#333"}}>游记攻略</li></Link>
					<Link to={`/pctickets/酒店`}><li style={{color:localStorage.indicator==5?"#f60":"#333"}}>酒店预订</li></Link>
				</ul>
			</div>
		);
	}
}