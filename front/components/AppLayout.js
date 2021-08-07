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

const AppLayout = ({ children }) => {

    const { me } = useSelector((state) => state.user);
    const [searchInput, onChangeSearchInput] = useInput('');

    const onSearch = useCallback(() => {
      Router.push(`/hashtag/${searchInput}`);
    },[searchInput]);

    return (
        <div>
          <Menu mode="horizontal">
            <Menu.Item key="home"><Link href="/"><a>Home</a></Link></Menu.Item>
            <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
            <Menu.Item key="mail">
              <SearchInput 
                value={searchInput}
                onChange={onChangeSearchInput}
                onSearch={onSearch}
              enterButton />
            </Menu.Item>
          </Menu>

          <Row gutter={8}>
            <Col xs={24} md={6}>
              {me ? <UserProfile /> : <LoginForm />}
            </Col>
            <Col xs={24} md={12}>
                {children}
            </Col>
            <Col xs={24} md={6}>
                <Explanation />
            </Col>
          </Row>

        </div>
      );
}

AppLayout.propTypes = {
    children : PropTypes.node.isRequired,
}

export default AppLayout;