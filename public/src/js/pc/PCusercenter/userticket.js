import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input ,Button} from 'antd';
import {Link} from 'react-router';
// 引入自己写好的模块
// 设计好所需的模块
export default class Userticket extends React.Component{
	constructor(){
		super();
		this.state={
			data:[]
		}
	}
	componentDidMount(){
		fetch('/post_usercollect',{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`userid=${localStorage.userid}&sckey=1`
		}).then((response)=>{
			return response.json();
		}).then(json=>{
			this.setState({
				data:json
			})
		})
	}
	render(){
		var datas=this.state.data;
		var content = datas.length?datas.map((item,index)=>{
			return(
				<div key={index}>
					<div className='collecttop'>
						<div className='table'>
							<span onClick={this._deleteAll.bind(this)}>
								删除全部
							</span>
							门票信息
						</div>
						<strong style={{width:'260px'}}>价格</strong>
						<strong style={{width:'140px'}}>操作</strong>
					</div>
					<div className='collectitem'>
						<div className='collecttable'>
							<div className='collectleft'>
								<Link to={`/pctkmiddle/${item.title}`}><img src={item.imgsrc} /></Link>
								<div className='text'>
									<Link to={`/pctkmiddle/${item.title}`}><span className='title'>{item.title}</span></Link>
									<ul>
										<li>
											<span>级别</span>
											<i>：</i>
											<em>{item.type}</em>
										</li>
										<li>
											<span>地址</span>
											<i>：</i>
											<em>{item.address}</em>
										</li>
									</ul>
								</div>
							</div>
							<div className='price'>
								<span>
									￥<em>{item.price}</em>
								</span>
								起
							</div>
							<div className='operation'>
								<Link to={`/pctkmiddle/${item.title}`}><p>预定</p></Link>
								<p onClick={this._delete.bind(this,item.title)}>删除</p>
							</div>
						</div>
					</div>
				</div>
			)
		})
		:<div>暂无收藏...</div>;
		return (
			<div className='collectbox'>
				{content}
			</div>
		);
	}
	_deleteAll(){
		fetch("/post_userdelete",{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`userid=${localStorage.userid}&sckey=1`
		}).then(respose=>{return respose.json()})
		.then(json=>{
			this.setState({
				data:json
			})
		})
	}
	_delete(title){
		fetch("/post_colldelete",{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`userid=${localStorage.userid}&title=${title}`
		}).then(respose=>{return respose.json()})
		.then(json=>{
			this.setState({
				data:json
			})
		})
	}
}

