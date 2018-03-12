import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col} from 'antd';
import {Link} from 'react-router';
// 读取自己定义的外部组件
export default class About extends React.Component{
	render(){
		var datas=this.props.data;
		var contents;
		if (localStorage.title=='遇见福建') {
			contents=datas.length?datas.map((item,index)=>{
				return(
					<div key={index}>
						<div className='item'>
							<img src={item.img1} />
						</div>
						<div className='item'>
							<img src={item.img2} />
						</div>
						<div className='item'>
							<img src={item.img3} />
						</div>
						<div className='item'>
							<img src={item.img4} />
						</div>
						<div className='item'>
							<img src={item.img5} />
						</div>
						<div className='item'>
							<img src={item.img6} />
						</div>
						<div className='item'>
							<img src={item.img7} />
						</div>
						<div className='item'>
							<img src={item.img8} />
						</div>
						<div className='item'>
							<img src={item.img9} />
						</div>
						<div className='bottom' style={{background:`url(${item.bottom}) center 0 no-repeat`}}></div>
					</div>
				)
			})
			:<div>努力加载中。。。</div>
		}else if(localStorage.title=='八闽乡音'){
			contents=datas.length?datas.map((item,index)=>{
				return(
					<div key={index}>
						<Row>
							<Col span={1}></Col>
							<Col span={22}>
								<ul className='boxtop'>
									<li>{item.img8}</li>
									<li>{item.img9}</li>
									<li>{item.bottom}</li>
								</ul>
								<div className='boxbottom'>
									<div className='boxtitle'>
										<span style={{background:`url(${item.img1}) no-repeat`}}>闽东方言</span>
									</div>
									<div className='boxitem'>
										<em>主要分布于福州和宁德两地市，以福州话为代表</em>
										<div>
											<div className='boximg' style={{background:`url(${item.common}) no-repeat`}}>
												<img src={item.img2} />
											</div>
											<div className='boxtext' style={{paddingRight:'65px'}}>
												<span>闽剧</span>
												<p>{item.text1}</p>
											</div>
										</div>
									</div>
									<div className='boxtitle'>
										<span style={{background:`url(${item.img1}) no-repeat`}}>闽南方言</span>
									</div>
									<div className='boxitem'>
										<em>主要分布于泉州、漳州、厦门、龙岩等地区</em>
										<div>
											<div className='boximg' style={{background:`url(${item.common2}) 59px no-repeat`}}>
												<img src={item.img3} />
											</div>
											<div className='boxtext' style={{float:'left',paddingLeft:'65px'}}>
												<span>南音</span>
												<p>{item.text2}</p>
											</div>
										</div>
									</div>
									<div className='boxtitle'>
										<span style={{background:`url(${item.img1}) no-repeat`}}>莆仙方言</span>
									</div>
									<div className='boxitem'>
										<em>主要分布于莆田、仙游、福州市的福清南部、永泰部分地区</em>
										<div>
											<div className='boximg' style={{background:`url(${item.common}) no-repeat`}}>
												<img src={item.img4} />
											</div>
											<div className='boxtext' style={{paddingRight:'65px'}}>
												<span>莆仙戏</span>
												<p>{item.text3}</p>
											</div>
										</div>
									</div>
									<div className='boxtitle'>
										<span style={{background:`url(${item.img1}) no-repeat`}}>闽西客家方言</span>
									</div>
									<div className='boxitem'>
										<em>主要分布于西部和南部的龙岩、漳州等地区</em>
										<div>
											<div className='boximg' style={{background:`url(${item.common2}) 59px no-repeat`}}>
												<img src={item.img5} />
											</div>
											<div className='boxtext' style={{float:'left',paddingLeft:'65px'}}>
												<span>闽西汉剧</span>
												<p>{item.text4}</p>
											</div>
										</div>
									</div>
									<div className='boxtitle'>
										<span style={{background:`url(${item.img1}) no-repeat`}}>闽北方言</span>
									</div>
									<div className='boxitem'>
										<em>主要分布于福建北部的南平地区武夷山地市，以建瓯话为代表</em>
										<div>
											<div className='boximg' style={{background:`url(${item.common}) no-repeat`}}>
												<img src={item.img6} />
											</div>
											<div className='boxtext' style={{paddingRight:'65px'}}>
												<span>泰宁梅林戏</span>
												<p>{item.text5}</p>
											</div>
										</div>
									</div>
									<div className='boxtitle'>
										<span style={{background:`url(${item.img1}) no-repeat`}}>闽中方言</span>
									</div>
									<div className='boxitem'>
										<em>主要分布在福建中东部的三明、永安、沙县，以永安话、沙县方言为代表</em>
										<div>
											<div className='boximg' style={{background:`url(${item.common2}) 59px no-repeat`}}>
												<img src={item.img7} />
											</div>
											<div className='boxtext' style={{float:'left',paddingLeft:'65px'}}>
												<span>沙县肩膀戏</span>
												<p>{item.text6}</p>
											</div>
										</div>
									</div>
								</div>
							</Col>
							<Col span={1}></Col>
						</Row>
					</div>
				)
			})
			:<div>努力加载中。。。</div>
		}else{
			contents=datas.length?datas.map((item,index)=>{
				return(
					<div key={index}>
						<div className='item'>
							<img src={item.img1} />
						</div>
						<div className='item'>
							<img src={item.img2} />
						</div>
						<div className='item'>
							<img src={item.img3} />
						</div>
						<div className='item'>
							<img src={item.img4} />
						</div>
						<div className='item'>
							<img src={item.img5} />
						</div>
					</div>
				)
			})
			:<div>努力加载中。。。</div>
		}
		return (
			<div className='box'>
				{contents}
			</div>
		);
	}
}