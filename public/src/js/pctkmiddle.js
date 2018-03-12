import React from 'react';
// 引入自己写好的模块
import Header from './pc/PCindex/header';
import Navigation from './pc/PCindex/navigation';
import Middle from './pc/PCtkmiddle/middle';

import Footer from './pc/PCindex/footer';
// 设计好所需的模块
export default class PCTickets extends React.Component{
	
	render(){
		return (
			<div>
				{/*头部信息*/}
				<Header />
				{/*导航信息*/}
				<Navigation />
				{/*景点信息*/}
				<Middle title={this.props.params.title}/>
				{/*尾部信息*/}
				<Footer />
			</div>
		);
	}
}

