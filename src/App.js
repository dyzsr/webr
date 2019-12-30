import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.css';

function Info() {
  return (
    <div>
      <h2>F.S.S</h2>
      <p>Male</p>
      <p>2019-12-30</p>
    </div>
  )
}

function Labs() {
  return (
    <div>
        <h2>实验</h2>

        <p>
            1. 音频采集与处理（20分）
            <br/>
            <b>要求：</b>
            用Windows录音机录制一首自己唱的歌或朗诵，准备一段背景音乐，使用Cool Edit导入录制的声音文件和背景音乐，并进行合成。
            <br/>
            <b>提交内容：</b>
            背景音乐文件、声音文件、合成作品、实验报告（电子版+打印版）。
        </p>

        <p>
            2. 图像处理（20分）
            <br/>
            <b>要求：</b>
            （1）选取适当的图片素材和世界地图，运用各种选取方法制作一幅由世界名胜照片揉和在一起的背景。
            利用图层效果制作一幅有地形质感的世界地图。调整并合并所有层存储为各种图像文件格式并压缩。
            （2）显示一个bmp文件的C程序，并实现图像亮度、对比度调整、图像平移、放大、旋转和镜像。
            <br/>
            <b>提交内容：</b>
            图片素材、合成图片、显示bmp的程序代码、显示bmp的可执行文件、实验报告（电子版+打印版）。
        </p>

        <p>
            3. 动画制作（30分）
            <br/>
            <b>要求：</b>
            根据实验1中得到的歌曲或配乐朗诵，做一段Flash不少于1分半钟，并合成为一段动画MV。
            <br/>
            <b>提交内容：</b>
            动画素材、Flash源文件、Flash导出影片、实验报告（电子版+打印版）。
        </p>

        <p>
            4. 网站制作（30分）
            <br/>
            <b>要求：</b>
            个人页面开发，包含个人基本信息，整个课程的各次实验信息，并实现媒体文件上传、下载功能实现。
            <br/>
            <b>提交内容：</b>
            网页制作素材、网页源代码、实验报告（电子版+打印版）。
        </p>

    </div>
  );
}

function Media() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8888/files', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setFiles(json.map(v => <li><a href={`http://localhost:8888/files/${v}`}>{v}</a></li>))
      })
      .catch(err => {
        console.log(err)
      })
  })

  const onBtnClick = () => {
    const input = document.getElementById("upload");
    const file = input.files[0];
    console.log(file);

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:8888/upload', {
      method: 'POST',
      body: formData,
    })
    .then(res => res.text())
    .then(text => {
      console.log(text);
    })
    .catch(err => {
      console.log(err);
    });

    input.value = '';
  }

  return (
    <div>
      <h2>上传下载</h2>
      <div>
        <input id='upload' type="file" />
        <button onClick={() => onBtnClick()}>upload</button>
      </div>
      <div>
        <ul>{files}</ul>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <div>
            <Link to="/">个人信息</Link>
          </div>
          <div>
            <Link to="/labs">实验信息</Link>
          </div>
          <div>
            <Link to="/media">上传下载</Link>
          </div>
        </nav>

        <Switch>
          <Route path="/labs">
            <Labs />
          </Route>
          <Route path="/media">
            <Media />
          </Route>
          <Route path="/">
            <Info />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
