import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MdInfoOutline, MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginWrapper = styled.div`
  background: #212126;
  /* opacity: 0.6; */
  max-width: 450px;
  height: 450px;
  margin: auto;
  margin-top: 70px;
`;
const MainLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .LogText {
    color: #fff;
    font-size: 26px;
    font-weight: 600;
    padding: 50px 0 20px;
  }
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
  padding: 7px;
  background: #D9D9D9;
  box-sizing: border-box;
  outline: none;
  border: none;
  border-radius: 3px;
  margin: 10px 0 5px;
`;

// Id 경고
const Warn = styled.div`
  display: flex;
  color: orange;
  font-size: 12px;
  margin: 5px 0 10px;
  .warnMessage {
    margin: 0 48px 0 5px;
  }
  .warnPwMessage {
    margin: 0 55px 0 5px;
  }
`;

const PwShow = styled.div`
  position: relative;
  left: 267px;
  bottom: 38px;
  color: #212126;
  display: block;
  height: 0px;
`;

const Btn = styled.button`
  width: 300px;
  height: 50px;
  padding: 7px;
  margin-top: 15px;
  background: #D9D9D9;
  outline: none;
  border: none;
  border-radius: 3px;
  &:active{
    background: #AD8888;
  }
`;

const InFo = styled.div`
  margin-top: 20px;
  color: #D9D9D9;
  display: flex;
  flex-direction: row;

  .SignIn {
    margin-right: 20px;
  }

`;
const GoToSign = styled.a`
  color: #D9D9D9;
  cursor: pointer;
    &:hover {
      text-decoration: underline;
      color: white;
  }
`;

// 비밀번호 보이기

function Login(props) {

  const navigate = useNavigate();

  const [showPassward, setShowPassward] = useState({
    type: 'password',
    visible: false
  }); // 비밀번호 보이기
  
  const [idValue, setIdValue] = useState(''); // ID
  const [pwValue, setPwValue] = useState(''); // PW

  const passwordRef = useRef(null);

  const [warnMsShow, setWarnMsShow] = useState(false); // Id 메세지 
  const [warnPwMsShow, setwarnPwMsShow] = useState(false); // Pw 메세지

  const handleChangeId = (e) => {
    setIdValue(e.target.value);
  };
  const handleChangePw = (e) => {
    setPwValue(e.target.value);
  }; 

// 영문자 또는 숫자 6~20자 
// 대문자 하나 이상, 소문자 하나 및 숫자 하나

  const idErr = /^[a-z]+[a-z0-9]{5,19}$/;  
  const pwErr =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;  

  const handleValid = () => {
    idErr.test(idValue) ? setWarnMsShow(false) : setWarnMsShow(true);
    pwErr.test(pwValue) ? setwarnPwMsShow(false) : setwarnPwMsShow(true);
    if (idErr.test(idValue) && pwErr.test(pwValue)) {
      return true;
    } else {
      return false;
    }
  };

  const handleAddInfo = () => {

    if (!handleValid()) {
      setPwValue('');
      setIdValue('');
    } else {
      navigate('/');
      
    }
  };

  const handleShowPw = (e) => {
    setShowPassward(() => {
      if (!showPassward.visible) {
        return { type: 'text', visible: true };
      } else {
        return { type: 'password', visible: false };
      }
    })
  }

  // const signupAPI = (idMail,passWord)
  // const API = 'http://localhost:4000/members';

  // axios.post(API, 
  //   {

  //   })



  // const memberId = JSON.parse(localStorage.getItem('memberId'));
  

  // localstorage에 signin에서 setItem으로 아이디, 비번 저장
  // login에서 getItem으로 아이디 비번 받아와서 비교 후 맞으면 홈페이지 
  // setItem(key, value) - 키/값 쌍을 저장한다.
  // getItem(key) - 키에 해당하는 값을 받아온다.
  // removeItem(key) - 키와 해당 값을 삭제한다.
  // clear() - 모두 다 삭제한다.
  // length - 저장된 항목의 개수를 출력한다.


  // useEffect(() => {
  //   localStorage.getItem('idValue', JSON.stringify(idValue));
  // }, [])
  // useEffect(() => {
  //   // 아이디값 추가
  //   const memberId = JSON.parse(localStorage.getItem('signemail')) || [];
  //   memberId.push(signemail);
  //   memberId = new Set(memberId); // 중복 요소 제거
  //   memberId = [...memberId];
  //   localStorage.setItem('memberId', JSON.stringify(memberId));
  // })
  return (
    <LoginWrapper>
      <MainLogin>
        <h1 className='LogText'>로그인</h1>
        <label>
          <Input type='text' 
            placeholder='이메일 주소 또는 아이디'
            value={idValue}
            onChange={handleChangeId}
          />
        </label>

        {warnMsShow && <Warn>
          <MdInfoOutline />
          <p className='warnMessage'>정확한 이메일 또는 아이디를 입력해주세요.</p>
        </Warn>}

        <label>
          <Input type={showPassward.type} 
            placeholder='비밀번호'
            value={pwValue}
            onChange={handleChangePw}
            maxLength={16}   
            ref={passwordRef}
            onKeyUp={ (e) => {
              if(e.key === 'Enter') {
                handleAddInfo();
              }}}
            />
        <PwShow>
          {!showPassward.visible && <MdOutlineVisibilityOff onClick={handleShowPw}/>}
          {showPassward.visible && <MdOutlineVisibility  onClick={handleShowPw}/>}
        </PwShow>
        </label>

        {warnPwMsShow && <Warn>
          <MdInfoOutline />
          <p className='warnPwMessage'>대소문자/특수문자를 모두 포함해주세요.</p>
        </Warn>}


        <Btn type='button' onClick={() => handleAddInfo()} >로그인</Btn>

        <InFo>
          <p className='SignIn'>아직 계정이 없으신가요?</p>
          <GoToSign href='/sign-in'>회원가입하기</GoToSign>          
        </InFo>

      </MainLogin>
      
    </LoginWrapper>
    
  );
}

export default Login;