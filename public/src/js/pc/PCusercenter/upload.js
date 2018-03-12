import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col ,Input,Tabs,Button,Icon,Upload,message} from 'antd';

export default class Avatar extends React.Component {
  constructor(){
    super();
    this.state = {
      imageUrl:''
    };
  }
  render() {
    var imageUrl = this.state.imageUrl;
    var userid = {userid:localStorage.userid};
    return (
      <div className='upload'>
          <Upload
            className="avatar-uploader"
            name="avatar"
            showUploadList={false}
            action="/post_upload"
            beforeUpload={this.beforeUpload.bind(this)}
            onChange={this.handleChange.bind(this)}
            data={userid}
          >
            {
              imageUrl ?
                <img src={imageUrl} alt="" className="avatar" /> :
                <Icon type="plus" className="avatar-uploader-trigger" />
            }
          </Upload>
      </div>
    );
  }
  beforeUpload(file){
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('请上传 JPG 文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('上传图片必须小于2MB!');
    }
    return isJPG && isLt2M;
  }

  handleChange(info){
    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }

  getBase64(img,callback){
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
}