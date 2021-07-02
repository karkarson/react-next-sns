import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import Head from 'next/head';
import {useRouter} from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';

import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from '../../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';

const User = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const {id} = router.query;
    const {mainPosts, hasMorePosts, loadPostsLoading} = useSelector((state) => state.post);
    const {userInfo} = useSelector((state) => state.user);

    useEffect(() => {
        function onScroll() {
          if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if (hasMorePosts && !loadPostsLoading) {
              const lastId = mainPosts[mainPosts.length - 1]?.id;
              dispatch({
                type: LOAD_USER_POSTS_REQUEST,
                lastId,
                data: id
              });
            }
          }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
          window.removeEventListener('scroll', onScroll);
        };
      }, [hasMorePosts, loadPostsLoading, mainPosts.length, id]);

    return(
        <AppLayout>
            {userInfo && (
                <Head>
                <title>{userInfo.nickname}님의 글 </title>
                <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
                <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
                <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
                <meta property="og:image" content="https://naversns.com/favicon.ico" />
                <meta property="og:url" content={`https://naversns.com/user/${id}`} />
                </Head>
            )}
            {userInfo
                ? (
                <Card
                    actions={[
                    <div key="twit">
                        게시물 <br />
                        {userInfo.Posts}
                    </div>,
                    <div key="following">
                        팔로잉 <br />
                        {userInfo.Followings}
                    </div>,
                    <div key="follower">
                        팔로워 <br />
                        {userInfo.Followers}
                    </div>,
                    ]}
                >
                    <Card.Meta
                        avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                        title={userInfo.nickname}
                    />
                    </Card>
                )
                : null}
            {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </AppLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, res, ...etc}) => {
    console.log(req.headers);
    const cookie = req ? req.headers.Cookie : '';
    axios.defaults.headers.Cookie = '';
    if(req && cookie){
        axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch({ //현재 로그인 정보
        type: LOAD_MY_INFO_REQUEST,
    });
    store.dispatch({ //해당 아이디 정보
        type: LOAD_USER_REQUEST,
        data: etc.params.id
    });
    store.dispatch({ // 해당 아이디 게시물
        type: LOAD_USER_POSTS_REQUEST,
        data: etc.params.id
    });

    store.dispatch(END);
    await store.sagaTask.toPromise();
    console.log('getState', store.getState().post.mainPosts);
    return { props: {} };
});

export default User;