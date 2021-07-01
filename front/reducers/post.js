import produce from '../util/produce';
import shortId from 'shortid';
import faker from 'faker';

export const initialState = {
    mainPosts: [],
    imagePaths: [],
    singlePost: null, // 다이나믹 라우팅 해당 아이디 게시물 
    hasMorePosts: true, //스크롤바

    loadPostsLoading: false, //게시물 불러오기
    loadPostsDone: false,
    loadPostsError: null,
    addPostLoading: false, //게시물 작성
    addPostDone: false,
    addPostError: null,
    removePostLoading: false, //게시물 제거
    removePostDone: false,
    removePostError: null,
    addCommentLoading: false, //게시물 댓글 작성
    addCommentDone: false,
    addCommentError: null,
    likePostLoading: false, //좋아요 
    likePostDone: false,
    likePostError: null,
    unlikePostLoading: false, // 좋아요 취소
    unlikePostDone: false,
    unlikePostError: null,
    uploadImagesLoading: false, //이미지 업로드
    uploadImagesDone: false,
    uploadImagesError: null,
    retweetLoading: false, //리트윗 
    retweetDone: false,
    retweetError: null,
    
}

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const generateDummyPost = (number) => Array(number).fill().map(() => ({
    id: shortId.generate(),
    User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
    },
    content: faker.lorem.paragraph(),
    Images: [{
        src: faker.image.image(),
    }],
    Comments: [{
        User: {
          id: shortId.generate(),
          nickname: faker.name.findName(),
        },
        content: faker.lorem.sentence(),
    }],
}));

const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch(action.type){
//다이나믹 라우팅 특정 게시물
        case LOAD_POST_REQUEST:
            draft.loadPostLoading = true;
            draft.loadPostDone = false;
            draft.loadPostError = null;
            break;
        case LOAD_POST_SUCCESS:
            draft.loadPostLoading = false;
            draft.loadPostDone = true;
            draft.singlePost = action.data;
            break;
        case LOAD_POST_FAILURE:
            draft.loadPostLoading = false;
            draft.loadPostError = action.error;
            break;
//게시물 불러오기 ( 특정 유저 게시물 , 특정 해시태그 게시물, 전체 게시물)
        case LOAD_USER_POSTS_REQUEST:
        case LOAD_HASHTAG_POSTS_REQUEST:
        case LOAD_POSTS_REQUEST:
            draft.loadPostsLoading= true; 
            draft.loadPostsDone= false;
            draft.loadPostsError= null;
            break;
        case LOAD_USER_POSTS_SUCCESS:
        case LOAD_HASHTAG_POSTS_SUCCESS:
        case LOAD_POSTS_SUCCESS:
            draft.loadPostsLoading= false; 
            draft.loadPostsDone= true;
            draft.mainPosts = draft.mainPosts.concat(action.data);
            draft.hasMorePosts = action.data.length === 10;
            break;
        case LOAD_USER_POSTS_FAILURE:
        case LOAD_HASHTAG_POSTS_FAILURE:
        case LOAD_POSTS_FAILURE:
            draft.loadPostsLoading= false; 
            draft.loadPostsError= action.error;
            break;
//게시물 작성
        case ADD_POST_REQUEST:
            draft.addPostLoading= true;
            draft.addPostDone= false;
            draft.addPostError= null;
            break;
        case ADD_POST_SUCCESS:
            draft.addPostLoading= false; 
            draft.addPostDone= true;
            draft.mainPosts.unshift(action.data);
            draft.imagePaths = [];
            break;
        case ADD_POST_FAILURE:
            draft.addPostLoading= false; 
            draft.addPostError= action.error;
            break;
//게시물 제거
        case REMOVE_POST_REQUEST:
            draft.removePostLoading= true; 
            draft.removePostDone= false;
            draft.removePostError= null;
            break;
        case REMOVE_POST_SUCCESS:
            draft.removePostLoading= false; 
            draft.removePostDone= true;
            draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
            break;
        case REMOVE_POST_FAILURE:
            draft.removePostLoading= false; 
            draft.removePostError= action.error;
            break;
//게시물 댓글 작성
        case ADD_COMMENT_REQUEST:
            draft.addCommentLoading= true; 
            draft.addCommentDone= false;
            draft.addCommentError= null;
            break;
        case ADD_COMMENT_SUCCESS:{
            draft.addCommentLoading= false; 
            draft.addCommentDone= true;
            const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
            post.Comments.unshift(action.data);
            break;
        }
        case ADD_COMMENT_FAILURE:
            draft.addCommentLoading= false; 
            draft.addCommentError= action.error;
            break;
//좋아요
        case LIKE_POST_REQUEST:
            draft.likePostLoading= true; 
            draft.likePostDone= false;
            draft.likePostError= null;
            break;
        case LIKE_POST_SUCCESS:{
            draft.likePostLoading= false; 
            draft.likePostDone= true;
            const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
            post.Likers.push({ id: action.data.UserId });   
            break;
        }
        case LIKE_POST_FAILURE:
            draft.likePostLoading= false; 
            draft.likePostError= action.error;
            break;
//좋아요 취소
        case UNLIKE_POST_REQUEST:
            draft.unlikePostLoading= true;
            draft.unlikePostDone= false;
            draft.unlikePostError= null;
            break;
        case UNLIKE_POST_SUCCESS:{
            draft.unlikePostLoading= false; 
            draft.unlikePostDone= true;
            const post = draft.mainPosts.find((v)=> v.id === action.data.PostId);
            post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
            break;
        }
        case UNLIKE_POST_FAILURE:
            draft.unlikePostLoading= false; 
            draft.unlikePostError= action.error;
            break;
//리트윗
        case RETWEET_REQUEST:
            draft.retweetLoading= true;
            draft.retweetDone= false;
            draft.retweetError= null;
            break;
        case RETWEET_SUCCESS:
            draft.retweetLoading= false; 
            draft.retweetDone= true;
            draft.mainPosts.unshift(action.data);
            break;
        case RETWEET_FAILURE:
            draft.retweetLoading= false; 
            draft.retweetError= action.error;
            break;
//이미지 업로드
        case UPLOAD_IMAGES_REQUEST:
            draft.uploadImagesLoading= true; 
            draft.uploadImagesDone= false;
            draft.uploadImagesError= null;
            break;
        case UPLOAD_IMAGES_SUCCESS:
            draft.uploadImagesLoading= false; 
            draft.uploadImagesDone= true;
            draft.imagePaths = action.data;
            break;
        case UPLOAD_IMAGES_FAILURE:
            draft.uploadImagesLoading= false; 
            draft.uploadImagesError= action.error;
            break;
//업로드 이미지 제거 (프론트)
        case REMOVE_IMAGE:
            draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
            break;

        default: break;
    }
})

export default reducer;


