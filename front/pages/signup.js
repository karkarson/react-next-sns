import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';
import { Input, Form, Checkbox, Button } from 'antd'
import styled from 'styled-components';
import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../store/configureStore';

import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';


const WarnDiv = styled.div`
    color: red;
`;

const SubmitDiv = styled.div`
    margin-top: 10px;
`;

const Signup = () => {
    
    const dispatch = useDispatch();
    const { me, signUpLoading, signUpDone, signUpError } = useSelector((state) => state.user);
    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNick] = useInput('');
    const [password, onChangePassword] = useInput('');
    
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [term, setTerm] = useState(false);
    const [termError, setTermError] = useState(false);

    useEffect(() => { 
        if(me && me.id){ 
            Router.replace('/');
            alert('로그아웃하시기 바랍니다.')
        }
    },[me && me.id]);

    useEffect(() => { 
        if (signUpDone) { 
          Router.replace('/');
          alert('회원가입을 완료했습니다.')
        }
    }, [signUpDone]);
    
    useEffect(() => {
        if (signUpError) { //회원가입 에러
          alert(signUpError);
        }
    }, [signUpError]);

    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) { //비밀번호 불일치
            setPasswordError(true);
            return;
          }
          if (!term) { //체크박스 
            setTermError(true);
            return;
          }
          dispatch({
            type: SIGN_UP_REQUEST,
            data: { email, nickname, password }
          });
          console.log(email,nickname,password,passwordCheck,term);
    },[[email, password, passwordCheck, term]]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password );
    },[password]);

    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);
    },[]);

    return(
        <AppLayout>
            <Head>
                <title>Signup</title>
            </Head>
            
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-email">이메일</label><br />
                    <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label><br />
                    <Input name="user-nick" value={nickname} required onChange={onChangeNick} />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label><br />
                    <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호체크</label><br />
                    <Input
                        name="user-password-check"
                        type="password"
                        value={passwordCheck}
                        required
                        onChange={onChangePasswordCheck}
                    />
                </div>
                    {passwordError && <WarnDiv>비밀번호가 일치하지 않습니다.</WarnDiv>}
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>사이트 정책에 따를 것을 동의합니다.</Checkbox>
                    {termError && <WarnDiv>약관에 동의하셔야 합니다.</WarnDiv>}
                </div>
                <SubmitDiv>
                    <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
                </SubmitDiv>
            </Form>
        </AppLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, res, ...etc}) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if( req && cookie ) {
      axios.defaults.headers.Cookie = cookie;
    }
  
    store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    store.dispatch(END);
    await store.sagaTask.toPromise();
});

export default Signup;