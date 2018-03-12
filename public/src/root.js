import React from 'react';
import ReactDOM from 'react-dom';

import PCIndex from './js/pcindex';
import PCTickets from './js/pctickets';
import PCtkmiddle from './js/pctkmiddle';
import PCtkdetails from './js/pctkdetails';
import PCtldetails from './js/pctldetails';
import PChldetails from './js/pchldetails';
import PCaboutfj from './js/pcaboutfj';
import PCusercenter from './js/pcusercenter';
import PCplay from './js/pcplay';
import PCadminlogin from './js/pcadminlogin';
import PCadmin from './js/pcadmin';

import { Router, Route ,hashHistory} from 'react-router';

// 设计好所需的模块
class Root extends React.Component{
	render(){
		return (
			<div>
				<Router history={hashHistory}>
					{/*首页*/}
					<Route path="/" component={PCIndex}></Route>
					{/*关于福建*/}
					<Route path="/pcaboutfj/:name" component={PCaboutfj}></Route>
					{/*票价预览*/}
					<Route path="/pctickets/:name" component={PCTickets}></Route>
					<Route path="/pctkmiddle/:title" component={PCtkmiddle}></Route>
					{/*票价详情页*/}
					<Route path="/pctkdetails/:mpid" component={PCtkdetails}></Route>
					{/*攻略详情页*/}
					<Route path="/pctldetails/:lxtitle" component={PCtldetails}></Route>
					{/*酒店详情页*/}
					<Route path="/pchldetails/:jdtitle" component={PChldetails}></Route>
					{/*个人中心*/}
					<Route path="/pcusercenter" component={PCusercenter}></Route>
					{/*支付页面*/}
					<Route path="/pcplay/:tkid" component={PCplay}></Route>
					{/*管理员登录页面*/}
					<Route path="/pcadminlogin" component={PCadminlogin}></Route>
					{/*管理员页面*/}
					<Route path="/pcadmin" component={PCadmin}></Route>
				</Router>
			</div>
		);
	}
}
ReactDOM.render(<Root />,document.getElementById('box'));

