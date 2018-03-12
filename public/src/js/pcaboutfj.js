import React from 'react';
// 引入自己写好的模块
import Header from './pc/PCindex/header';
import Navigation from './pc/PCindex/navigation';
import About from './pc/PCaboutfj/about';
import Footer from './pc/PCindex/footer';
// 设计好所需的模块
export default class PCaboutfj extends React.Component{
	componentWillMount(){
    	localStorage.indicator = 2;
  	}
	render(){
		return (
			<div>
				{/*头部信息*/}
				<Header />
				{/*导航信息*/}
				<Navigation />
				{/*内容*/}
				<About name={localStorage.title}/>
				{/*尾部信息*/}
				<Footer />
			</div>
		);
	}
}

