import React from 'react';
// 引入自己写好的模块
import Header from './pc/PCindex/header';
import Navigation from './pc/PCindex/navigation';
import CityList from './pc/PCtickets/citylist';
import Footer from './pc/PCindex/footer';
// 设计好所需的模块
export default class PCTickets extends React.Component{
	render(){
		if(this.props.params.name=='票价'){
			localStorage.indicator = 3;
		}else if(this.props.params.name=='游记'){
			localStorage.indicator = 4;
		}else{
			localStorage.indicator = 5;
		}
		return (
				<div>
					{/*头部信息*/}
					<Header />
					{/*导航信息*/}
					<Navigation />
					{/*切换不同页面*/}
					<CityList data={this.props.params.name} />
					{/*尾部信息*/}
					<Footer />
				</div>
			);
	}
}

