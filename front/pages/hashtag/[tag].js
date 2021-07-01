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
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../reducers/post';

const User = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const {tag} = router.query;
    const {mainPosts, hasMorePosts, loadPostsLoading} = useSelector((state) => state.post);

    useEffect(() => {
        function onScroll() {
          if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if (hasMorePosts && !loadPostsLoading) {
              const lastId = mainPosts[mainPosts.length - 1]?.id;
              dispatch({
                type: LOAD_HASHTAG_POSTS_REQUEST,
                lastId,
                data: tag
              });
            }
          }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
          window.removeEventListener('scroll', onScroll);
        };
      }, [hasMorePosts, loadPostsLoading, mainPosts.length, tag]);

    return(
        <AppLayout>
            {mainPosts.map((v) => <PostCard key={v.id} post={v} />)}
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
    store.dispatch({ // 해당 해시태그 게시물
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data: etc.params.tag
    });

    store.dispatch(END);
    await store.sagaTask.toPromise();
    console.log('getState', store.getState().post.mainPosts);
    return { props: {} };
});

export default User;