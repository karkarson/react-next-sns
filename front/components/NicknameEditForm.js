import React, { useCallback } from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const FormWapper = styled(Form)`
    marginBottom: 20px;
    border: 1px solid #d9d9d9;
    padding: 20px; 
`;

const NicknameEditForm = () => {

    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const [nickname, onChangeNickname] = useInput(me?.nickname || '');

    const onSubmit = useCallback(() => {
        dispatch({
            type: CHANGE_NICKNAME_REQUEST,
            data: {nickname},
        });
    },[nickname]);

    return(
        <FormWapper>
            <Input.Search 
                value={nickname}
                onChange={onChangeNickname}
                addonBefore="닉네임" 
                enterButton="수정" 
                onSearch={onSubmit}
            />
        </FormWapper>
    )
}

export default NicknameEditForm;