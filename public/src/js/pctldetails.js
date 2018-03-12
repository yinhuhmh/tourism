import React from 'react';
// 引入自己写好的模块
import Header from './pc/PCindex/header';
import Navigation from './pc/PCindex/navigation';
import Tldetail from './pc/PCtldetails/tldetail';
import Footer from './pc/PCindex/footer';
// 设计好所需的模块
export default class PCtldetails extends React.Component{
	render(){
		return (
			<div>
				{/*头部信息*/}
				<Header />
				{/*导航信息*/}
				<Navigation />
				{/*详情页*/}
				<Tldetail lxtitle={this.props.params.lxtitle}/>
				{/*尾部信息*/}
				<Footer />
			</div>
		);
	}
}

