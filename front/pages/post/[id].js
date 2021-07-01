import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../../store/configureStore';

import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';

const Post = () => {

    const { singlePost } = useSelector((state) => state.post);
    const router = useRouter();
    const { id } = router.query;

    return(
        <AppLayout>
            <Head>
                <title> {singlePost.User.nickname}님의 게시글 </title>
                <meta name="description" content={singlePost.content} />
                <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
                <meta property="og:description" content={singlePost.content} />
                <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.ico'} />
                <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
            </Head>

            <PostCard post={singlePost} />

        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, res, ...etc}) => {
    console.log(req.headers);
    const cookie = req ? req.headers.Cookie : '';
    axios.defaults.headers.Cookie = '';
    if(req && cookie){
        axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    store.dispatch({
        type: LOAD_POST_REQUEST,
        data: etc.params.id,
    });
    store.dispatch(END);
    await store.sagaTask.toPromise();
    return { props: {} };
});

export default Post;




