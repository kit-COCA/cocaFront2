import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login();
    // navigate('/main');
  };

  const login = () => {
    axios.post("http://localhost:8080/api/member/loginReq", {
      id: userId,
      password: password
    })
    .then(res => {

      if(res.data === true) {
        console.log("로그인 성공 : ", res.data);
      
      localStorage.setItem('userId', userId);

      navigate('/main');
      } else {
        console.log("로그인 실패 : ", res.data); 
        alert("로그인 실패에요!");
      }

      
    })
    .catch(error => {
      console.log("로그인 실패 : ", error);
    })
  }

  return (
    <div className="container">
      <div className = "cards-container">

        <div className="info-card">
          <h2><span role="img" aria-label="sparkles">✨</span>빈일정찾기</h2>
          <p>빈 일정 찾기 버튼을 눌러, 모두의 일정을 비교하고 모두가 빈 시간에 회의하거나, 여행 일정을 추가해 보세요!</p>
        </div>
        <div className="login-card">
          <div className="transparent-box">
            <input
              type="text"
              id="id"
              name="id"
              placeholder="ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <input
              type="password"
              id="pw"
              name="pw"
              placeholder="PW"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="button-container">
              <button className="login-button" type="submit" onClick={handleLogin}>LOGIN</button>
              <button className="signup-button" type="submit">SIGN UP</button>
            </div>
          </div>
          <h1 className="right-aligned">COCA</h1>
        </div>

      </div>
      
    </div>
);

}

export default LoginPage;
