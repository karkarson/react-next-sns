import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import styled from 'styled-components';
import { Input, Form, Button } from 'antd'

import useInput from '../hooks/useInput';
import { loginRequestAction, LOG_IN_REQUEST } from '../reducers/user'

const FormWrapper = styled(Form)`
    padding : 10px;
`;

const ButtonDiv = styled.div`
    margin : 10px;
`;

const LoginForm = () => {

    const dispatch = useDispatch();
    const { logInLoding, logInError, me } = useSelector((state) => state.user);
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    useEffect(() => {
        if(logInError){
            alert(logInError);
        }
    },[logInError]);

    const onSubmitForm = useCallback(() => {
        console.log(email,password,);
        dispatch(loginRequestAction({ email, password }));
        // dispatch({
        //     type : LOG_IN_REQUEST,
        //     data : {
        //         email,
        //         password,
        //     }
        // });
    },[email, password]);

    return(
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">이메일</label><br />
                <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required/>
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label><br />
                <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
            </div>
            <ButtonDiv>
                <Button type="primary" htmlType="submit" loading={logInLoding}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </ButtonDiv>
        </FormWrapper>
    )
}

export default LoginForm;