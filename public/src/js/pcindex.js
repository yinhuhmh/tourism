import React from 'react';
// 引入自己写好的模块
import Header from './pc/PCindex/header';
import Navigation from './pc/PCindex/navigation';
import Banner from './pc/PCindex/banner';
import Contents from './pc/PCindex/contents';
import Contentsbottom from './pc/PCindex/contentsbottom';
import Footer from './pc/PCindex/footer';
// 设计好所需的模块
export default class PCIndex extends React.Component{
	componentWillMount(){
		localStorage.indicator = 1;
	}
	render(){
		return (
			<div>
				{/*头部信息*/}
				<Header />
				{/*导航信息*/}
				<Navigation />
				{/*轮播图*/}
				<Banner />
				{/*内容信息1*/}
				<Contents />
				{/*内容信息2*/}
				<Contentsbottom />
				{/*尾部信息*/}
				<Footer />
			</div>
		);
	}
}

