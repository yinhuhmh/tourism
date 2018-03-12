import React from 'react';
// 引入自己写好的模块
import Header from './pc/PCindex/header';
import Navigation from './pc/PCindex/navigation';
import Play from './pc/PCplay/play';
import Footer from './pc/PCindex/footer';
// 设计好所需的模块
export default class PCplay extends React.Component{
	
	render(){
		return (
			<div>
				{/*头部信息*/}
				<Header />
				{/*导航信息*/}
				<Navigation />
				{/*支付内容*/}
				<Play tkid={this.props.params.tkid}/>
				{/*尾部信息*/}
				<Footer />
			</div>
		);
	}
}

