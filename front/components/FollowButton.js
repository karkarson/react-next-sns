import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';


const FollowButton = ({post}) => {

    const dispatch = useDispatch();
    const { me , followLoading, unfollowLoading } = useSelector((state) => state.user);
    const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
    
    const onClickButton = useCallback(() => {
      if (isFollowing) {
        dispatch({
          type: UNFOLLOW_REQUEST,
          data: post.User.id,
        });
      } else {
        dispatch({
          type: FOLLOW_REQUEST,
          data: post.User.id,
        });
      }
    },[isFollowing]);

    if (me?.id === post.User.id) { //자신의 아이디가 올린 게시글 팔로우/언팔 버튼 제거
      return null;
    }

    return(
      <Button loading={followLoading || unfollowLoading} onClick={onClickButton}> 
         {isFollowing ? '언팔로우' : '팔로우'}
      </Button>
    )
}

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;