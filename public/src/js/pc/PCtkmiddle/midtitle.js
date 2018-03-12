import React from 'react';
import 'antd/dist/antd.css';
import {Link} from 'react-router';
// 读取自己定义的外部组件

export default class Midtitle extends React.Component{
	constructor(){
		super();
		this.state={
			data:{},
			isunfold:'none',
			offer:'展开报价',
			shape:'∧'
		}
	}
	componentDidMount(){
		var datas = this.props.data;
		fetch("/post_tkselect",{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`tkid=${datas[0].id}`
		}).then(respose=>{return respose.json()})
		.then(json=>{
			this.setState({
				data:json
			})
		})
	}
	render(){
		var datas = this.state.data;
		var content = datas.length?datas.map((item,index)=>{
			return(
				<li key={index}>
					<span className='ticket'>{item.tkname}</span>
					<span className='cost'>￥{item.tkfare}</span>
					<span className='price'>
						<i>￥{item.tkprice}</i>起
					</span>
					<Link to={`/pcplay/${item.id}`}><span className='pay2'>立即预订</span></Link>
				</li>
			)
		})
		:<div>努力加载中...</div>
		return (
			<div className='pc_midticket' style={{display:this.state.data.length==0?'none':'block'}}>
				<div className='pc_midpreview'>
					<i></i>
					<span>门票预览</span>
				</div>
				<div className='pc_midlist'>
					<div className='pc_midtop' onClick={this._fold.bind(this,this.state.isunfold)}>
						<span>门票</span>
						<div className='price'>
							<em>
								<i>价格：</i>
								<b>￥{this.props.data[0].price}</b>
								起
							</em>
						</div>
						<div className='offer'>
							<em>{this.state.offer}</em>
							<i>{this.state.shape}</i>
						</div>
					</div>
					<ul style={{display:this.state.isunfold}}>
						<li className='frist'>
							<span className='ticket'>门票</span>
							<span className='cost'>票面价</span>
							<span className='price'>优惠价</span>
							<span className='pay'>操作</span>
						</li>
						{content}
					</ul>
				</div>
			</div>
		);
	}
	_fold(isunfold){
		if(isunfold=='none'){
			this.setState({
				isunfold:'block',
				offer:'收起报价',
				shape:'∨'
			})
		}else{
			this.setState({
				isunfold:'none',
				offer:'展开报价',
				shape:'∧'
			})
		}
	}
}