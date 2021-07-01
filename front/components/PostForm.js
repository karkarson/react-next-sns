import React, { useCallback, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';

const PostForm = () => {
  
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput('');
  const { imagePaths, addPostLoading, addPostDone } = useSelector((state) => state.post);
  const { me } =  useSelector((state) => state.user);

  useEffect(() => { // 게시글 등록 후 Text 제거
    if(addPostDone){
        setText('');
    }
  },[addPostDone]);

  const onSubmit = useCallback(() => { //게시글 등록
    if(!text || !text.trim()){
      return alert('게시글을 작성하세요');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);
    return dispatch({
        type: ADD_POST_REQUEST,
        data: formData
    });
  },[text, imagePaths]);

  const onChangeImages = useCallback((e) => { //이미지 업로드
    console.log('imgages => ', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });

    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData
    });
  },[]);
  
  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index
    });
  });

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => { //이미지 업로드 버튼
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="어떤 신기한 일이 있었나요?"  />
      <div>
        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={addPostLoading}>작성 완료</Button>
      </div>
      <div>
        {imagePaths && imagePaths.map((v, i) => (
          //return (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
              <div>
                <Button onClick={onRemoveImage(i)}>제거</Button>
              </div> 
            </div>
          //)
        ))}
      </div>
    </Form>
  );
  
};

export default PostForm;
