import React, { useCallback, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

import useInput from '../hooks/useInput';

const CommentForm = ({post}) => {

    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const {addCommentLoading, addCommentDone} = useSelector((state) => state.post);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    useEffect(() => {
      if(addCommentDone){
        setCommentText('');
      }
    },[addCommentDone]);

    const onSubmitComment = useCallback(() => {
      if(!id){
        return alert('로그인이 필요합니다.');
      }
      if(!commentText || !commentText.trim()){
        return alert('내용을 작성하시기 바랍니다.');
      }

      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          content: commentText,
          //userId: id, 
          postId: post.id
        }
      });
    }, [commentText, id]); // ,id .. back req.user.id로 생성

    return(
        <Form onFinish={onSubmitComment}>
        <Form.Item style={{ position: 'relative', margin: 0 }}>
          <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
          <Button 
            style={{ position: 'absolute', right: 0, bottom: -40 , zIndex: 1}} 
            type="primary" 
            htmlType="submit"
            loading={addCommentLoading}
          >작성 완료
         </Button>
        </Form.Item>
      </Form>
    )
}

// CommentForm.propTypes = {
//   post: PropTypes.shape({
//     id: PropTypes.number,
//     User: PropTypes.object,
//     UserId: PropTypes.number,
//     content: PropTypes.string,
//     createdAt: PropTypes.object,
//     Comments: PropTypes.arrayOf(PropTypes.any),
//     Images: PropTypes.arrayOf(PropTypes.any),
//   }).isRequired,
// };
CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;