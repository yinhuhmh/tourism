import React from 'react';
import 'antd/dist/antd.css';
import moment from 'moment';
import {Row, Col ,Input ,Button ,DatePicker ,InputNumber} from 'antd';
// 读取自己定义的外部组件
var myDate = new Date();
var date = myDate.toLocaleString();
var localdate = date.replace(new RegExp("/","gm"),'-');
export default class Play extends React.Component{
	constructor(){
		super();
		this.state={
			data:{},
			ddimg:'',
			price:'',
			playdate:'',
			dqdate:'',
			num:'1',
			allprice:'',
			name:'',
			phone:'',
			message:'',
			title:''
		}
	}
	componentDidMount(){
		var tkid=this.props.tkid;
		fetch("/post_tkselect",{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`id=${tkid}`
		}).then(respose=>{return respose.json()})
		.then(json=>{
			this.setState({
				data:json,
				ddimg:json[0].tkimg,
				price:json[0].tkprice,
				title:json[0].tkname,
   				dqdate:localdate
			})
		})
	}
	render(){
		var ddimg = this.state.ddimg;
		var price = this.state.price;
		var playdate = this.state.playdate;
		var dqdate = this.state.dqdate;
		var num = this.state.num;
		var allprice = this.state.allprice?this.state.allprice:this.state.price;
		var name = this.state.name;
		var phone = this.state.phone;
		var message = this.state.message;
		var title = this.state.title;
		var datas = this.state.data;
		var content = datas.length?datas.map((item,index)=>{
			return(
				<div key={index}>
					<div className='pay_title'>
						<strong>{item.spots}</strong>
						<em>订单信息</em>
						<span>重新选择</span>
					</div>
					<ul className='pay_text'>
						<li>
							<em>门票类型：</em>
							<strong>{item.tkname}</strong>
						</li>
						<li>
							<em>门票价格：</em>
							<b>¥{item.tkprice}</b>
						</li>
						<li>
							<em>游玩日期：</em>
							<div>
      							<DatePicker
      							  format="YYYY-MM-DD"
      							  disabledDate={this.disabledDate.bind(this)}
      							  onChange={this._change.bind(this)}
      							/>
      						</div>
						</li>
						<li>
							<em>门票数量：</em>
							<div className='operate_num'>
								<InputNumber min={1} max={10} defaultValue={this.state.num} 
								onChange={this._change2.bind(this,this.state.price)} />
							</div>
						</li>
					</ul>
				</div>
			)
		})
		:<div>努力加载中...</div>
		return (
			<div className='pc_play'>
				<Row>
					<Col span={4}></Col>
					<Col span={16}>
						<div className='pay_main'>
							<div className='pay_form'>
								{content}
								<div className="line"></div>
								<div className="price_all">
									<span>订单金额：</span>
									<div className='play_price'>
										<strong>
											¥
											<b>{allprice}</b>
										</strong>
									</div>
								</div>
							</div>
							<div className='pay_form'>
								<div className='pay_title'>
									<strong>您的联系方式</strong>
									<em style={{color:'#999'}}>(为及时联系您确认，请填写真实信息)</em>
								</div>
								<div className='pay_text1'>
									<div className='pay_name'>
										<span>
											取票人:
											<i>*</i>
										</span>
										<div className='pay_kuang'>
											<input type='text' onChange={this._namechange.bind(this)} />
											<em>用于入园请填写真实姓名</em>
										</div>
									</div>
									<div className='pay_name'>
										<span>
											手机号码:
											<i>*</i>
										</span>
										<div className='pay_kuang'>
											<input type='text' onChange={this._phonechange.bind(this)} />
											<em>用于接收订单信息</em>
										</div>
									</div>
									<div className='pay_message'>
										<span>预订留言:&nbsp;&nbsp;&nbsp;</span>
										<textarea onChange={this._messagechange.bind(this)}></textarea>
									</div>
								</div>
							</div>
							<div className='submit_con'>
								<span onClick={this._zfclick.bind(this,ddimg,price,playdate,dqdate,num,allprice,name,phone,message,title)}>支付</span>
								<span onClick={this._wzfclick.bind(this,ddimg,price,playdate,dqdate,num,allprice,name,phone,message,title)}>取消支付</span>
								<em>(支付成功后至景点指定窗口取票游玩。)</em>
							</div>
						</div>
					</Col>
					<Col span={4}></Col>
				</Row>
			</div>
		);
	}
	disabledDate(current){
    	return current && current.valueOf() < Date.now();
  	}
 	_change(date,dateString){
   		this.setState({
   			playdate:dateString
   		})
  	}
  	_change2(value,price){
  		this.setState({
   			num:price,
   			allprice:value*price
   		})
  	}
  	_namechange(e){
  		this.setState({
   			name:e.target.value
   		})
  	}
  	_phonechange(e){
  		this.setState({
   			phone:e.target.value
   		})
  	}
  	_messagechange(e){
  		this.setState({
   			message:e.target.value
   		})
  	}
  	_zfclick(ddimg,price,playdate,dqdate,num,allprice,name,phone,message,title){
  		fetch("/post_ddinsert",{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`ddimg=${ddimg}&ddname=${title}&ddprice=${price}&dddate=${playdate}&xtdate=${dqdate}&ddnum=${num}&allprice=${allprice}&linkman=${name}&phone=${phone}&message=${message}&userid=${localStorage.userid}&ddstate=已支付`
		}).then(respose=>{return respose.json()})
		.then(json=>{
			alert("支付成功");
		})
  	}
  	_wzfclick(ddimg,price,playdate,dqdate,num,allprice,name,phone,message,title){
  		fetch("/post_ddinsert",{
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded"
			},
			body:`ddimg=${ddimg}&ddname=${title}&ddprice=${price}&dddate=${playdate}&xtdate=${dqdate}&ddnum=${num}&allprice=${allprice}&linkman=${name}&phone=${phone}&message=${message}&userid=${localStorage.userid}&ddstate=未支付`
		}).then(respose=>{return respose.json()})
		.then(json=>{
			alert("已取消支付");
		})
  	}
}