import React, { useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Menu, Input, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import useInput from '../hooks/useInput';
import Explanation from './Explanation';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

// const Backgroud = styled.div`
//     background-image:url('https://blog.kakaocdn.net/dn/AcIGI/btqxtp2xkg2/EGABG3i2NAMq3kRu1VaGzk/img.jpg');
//     // background-size: cover;
//     background-attachment: fixed;
//     background-repeat: no-repeat;
//     background-position: left-center;

// `;
const UpDiv = styled.div`
  & img, h1 {
    position: fixed;
    z-index: 1;
    height : 100px;
    width : 100px;
    float : left;
    margin-top: 400px;
  }
`;

const MenuSticky = styled(Menu)`
  top: 0;
  position: sticky;
  z-index: 1;
  background-color: #36FFFF;
`;

const AppLayout = ({ children }) => {

    const { me } = useSelector((state) => state.user);
    const [searchInput, onChangeSearchInput] = useInput('');

    const onSearch = useCallback(() => {
      Router.push(`/hashtag/${searchInput}`);
    },[searchInput]);

    const onGoUp = useCallback(()=> {
      window.scrollTo(0,0);
    },[])

    return (
        <div>
          <MenuSticky mode="horizontal">
            <Menu.Item key="home"><Link href="/"><a>Home</a></Link></Menu.Item>
            <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
            <Menu.Item key="mail">
              <SearchInput 
                value={searchInput}
                onChange={onChangeSearchInput}
                onSearch={onSearch}
              enterButton />
            </Menu.Item>
          </MenuSticky>
          
          <div>
            <Row gutter={8}>
              <Col xs={24} md={6}>
                {me ? <UserProfile /> : <LoginForm />}
                <UpDiv onClick={onGoUp}>
                  <img src="https://blog.kakaocdn.net/dn/AcIGI/btqxtp2xkg2/EGABG3i2NAMq3kRu1VaGzk/img.jpg" />
                  <h1>UP!</h1>
                </UpDiv>
              </Col>
              <Col xs={24} md={12}>
                  {children}
              </Col>
              <Col xs={24} md={6}>
                  <Explanation />
              </Col>
            </Row>
          </div>

        </div>
      );
}

AppLayout.propTypes = {
    children : PropTypes.node.isRequired,
}

export default AppLayout;