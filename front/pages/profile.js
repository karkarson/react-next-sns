import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../store/configureStore';

import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';
import { backUrl } from '../config/config';

const fetcher = (url) => axios.get(url, {withCredentials: true}).then((result)=> result.data);

const Profile = () => {

    //const dispatch = useDispatch(); SWR로 대체
    const [followingsLimit, setFollowingsLimit] = useState(3);
    const [followersLimit, setFollowersLimit] = useState(3);
    const { data: followingsData , error: followingError } = useSWR(`${backUrl}/user/followings?limit=${followingsLimit}` , fetcher);
    const { data: followersData , error: followerError } = useSWR(`${backUrl}/user/followers?limit=${followersLimit}` , fetcher);
    
    const { me } = useSelector((state) => state.user);
    const id = me?.id;

    useEffect(() => {
        if (!(me && me.id)) {
          Router.push('/');
        }
    }, [me && me.id]);

    const loadMoreFollowings = useCallback(() => {
        setFollowingsLimit((prev) => prev + 3);
    },[]);

    const loadMoreFollowers = useCallback(() => {
        setFollowersLimit((prev) => prev + 3);
    },[]);

    if (followerError || followingError) {
        console.error(followerError || followingError);
        return '팔로잉/팔로워 로딩 중 에러가 발생했습니다.';
    }

    if (!id) {
        return '정보를 찾고 있습니다.';
    }

    // useEffect(() => {
    //     if (!id) {
    //       Router.push('/');
    //       return alert('로그인이 필요합니다.')
    //     }
    // }, [id]);

    // SWR로 대체
    // useEffect(() => {
    //     dispatch({
    //         type: LOAD_FOLLOWERS_REQUEST
    //     });
    //     dispatch({
    //         type: LOAD_FOLLOWINGS_REQUEST
    //     });
    // },[]);

    return(
        <AppLayout>
            <Head>
                <title>Profile</title>
            </Head>
            <NicknameEditForm />
            <FollowList header="팔로잉"  data={followingsData} onClickMore={loadMoreFollowings} loading={!followingError && !followingsData} />
            <FollowList header="팔로워"  data={followersData} onClickMore={loadMoreFollowers} loading={!followingError && !followingsData} />
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

export default Profile;