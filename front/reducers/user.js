import produce from '../util/produce';

export const initialState = {
    
    loadMyInfoLoading : false, //내 정보 복구
    loadMyInfoDone : false, 
    loadMyInfoError : null,
    logInLoading: false, //로그인 시도 
    logInDone: false,
    logInError: null,
    logOutLoading: false, //로그아웃 시도 
    logOutDone: false,
    logOutError: null,
    signUpLoading: false, // 회원가입 시도
    signUpDone: false,
    signUpError: null,
    changeNicknameLoading: false, // 닉네임 변경 시도
    changeNicknameDone: false,
    changeNicknameError: null,
    followLoading: false, // 팔로우 시도
    followDone: false,
    followError: null,
    unfollowLoading: false, // 언팔로우 시도
    unfollowDone: false,
    unfollowError: null,
    removeFollowerLoading: false, // 팔로워 제거 시도
    removeFollowerDone: false,
    removeFollowerError: null,
    loadFollowersLoading: false, // 팔로워 로딩 시도
    loadFollowersDone: false,
    loadFollowersError: null,
    loadFollowingsLoading: false, // 팔로잉 로딩 시도
    loadFollowingsDone: false,
    loadFollowingsError: null,
    loadUserLoading: false, // 1번 유저 getStaticProps 활용
    loadUserDone: false,
    loadUserError: null,
 
    me : null,   
    userInfo: null, //getStaticProps 활용
}

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

// const dummyUser = (data) => ({
//     ...data,
//     nickname: '닉네임',
//     id: 1,
//     Posts: [{ id: 1 }],
//     Followings: [{ nickname: '닉네임1' }, { nickname: '닉네임2' }, { nickname: '닉네임3' }],
//     Followers: [{ nickname: '닉네임1' }, { nickname: '닉네임2' }, { nickname: '닉네임3' }],
//   });

export const loginRequestAction = (data) => ({
    type : LOG_IN_REQUEST,
    data,
});


const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch(action.type) {
// 1번 유저 getStaticProps 활용
        case LOAD_USER_REQUEST:
            draft.loadUserLoading = true;
            draft.loadUserError = null;
            draft.loadUserDone = false;
            break;
        case LOAD_USER_SUCCESS:
            draft.loadUserLoading = false;
            draft.userInfo = action.data;
            draft.loadUserDone = true;
            break;
        case LOAD_USER_FAILURE:
            draft.loadUserLoading = false;
            draft.loadUserError = action.error;
            break;
//내 정보 복구
        case LOAD_MY_INFO_REQUEST: 
            draft.loadMyInfoLoading = true;
            draft.loadMyInfoDone = false;
            draft.loadMyInfoError = null;
            break;
        case LOAD_MY_INFO_SUCCESS:
            draft.loadMyInfoLoading = false;
            draft.loadMyInfoDone = true;
            draft.me = action.data;
            break;
        case LOAD_MY_INFO_FAILURE:
            draft.loadMyInfoLoading = false;
            draft.loadMyInfoError = action.error;
            break;
//로그인
        case LOG_IN_REQUEST: 
            draft.logInLoading = true;
            draft.logInDone = false;
            draft.logInError = null;
            break;
        case LOG_IN_SUCCESS:
            draft.logInLoading = false;
            draft.logInDone = true;
            draft.me = action.data;
            break;
        case LOG_IN_FAILURE:
            draft.logInLoading = false;
            draft.logInError = action.error;
            break;
//로그아웃
        case LOG_OUT_REQUEST:
            draft.logOutLoading = true;
            draft.logOutDone = false;
            draft.logOutError = null;
            break;
        case LOG_OUT_SUCCESS:
            draft.logOutLoading = false;
            draft.logOutDone = true;
            draft.me = null;
            break;
        case LOG_OUT_FAILURE:
            draft.logOutLoading = false;
            draft.logOutError = action.error;
            break;
//회원가입
        case SIGN_UP_REQUEST:
            draft.signUpLoading = true;
            draft.signUpDone = false;
            draft.signUpError = null;
            break;
        case SIGN_UP_SUCCESS:
            draft.signUpLoading = false;
            draft.signUpDone = true;
            break;
        case SIGN_UP_FAILURE:
            draft.signUpLoading = false;
            draft.signUpError = action.error;
            break;
//닉네임 변경
        case CHANGE_NICKNAME_REQUEST:
            draft.changeNicknameLoading = true;
            draft.changeNicknameDone = false;
            draft.changeNicknameError = null;
            break;
        case CHANGE_NICKNAME_SUCCESS:
            draft.changeNicknameLoading = false;
            draft.changeNicknameDone = true;
            draft.me.nickname = action.data.nickname;
            break;
        case CHANGE_NICKNAME_FAILURE:
            draft.changeNicknameLoading = false;
            draft.changeNicknameError = action.error;
            break;
//팔로우
        case FOLLOW_REQUEST:
            draft.followLoading = true;
            draft.followDone = false;
            draft.followError = null;
            break;
        case FOLLOW_SUCCESS:
            draft.followLoading = false;
            draft.followDone = true;
            draft.me.Followings.push({ id: action.data.UserId });
            break;
        case FOLLOW_FAILURE:
            draft.followLoading = false;
            draft.followError = action.error;
            break;
//언팔
        case UNFOLLOW_REQUEST:
            draft.unfollowLoading = true;
            draft.unfollowDone = false;
            draft.unfollowError = null;
            break;
        case UNFOLLOW_SUCCESS:
            draft.unfollowLoading = false;
            draft.unfollowDone = true;
            draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.UserId);
            break;
        case UNFOLLOW_FAILURE:
            draft.unfollowLoading = false;
            draft.unfollowError = action.error;
            break;
//팔로워 제거
        case REMOVE_FOLLOWER_REQUEST:
            draft.removeFollowerLoading = true;
            draft.removeFollowerDone = false;
            draft.removeFollowerError = null;
            break;
        case REMOVE_FOLLOWER_SUCCESS:
            draft.removeFollowerLoading = false;
            draft.removeFollowerDone = true;
            draft.me.Followers = draft.me.Followers.filter((v) => v.id !== action.data.UserId);
            break;
        case REMOVE_FOLLOWER_FAILURE:
            draft.removeFollowerLoading = false;
            draft.removeFollowerError = action.error;
            break;
//팔로워 로딩
        case LOAD_FOLLOWERS_REQUEST:
            draft.loadFollowersLoading = true;
            draft.loadFollowersDone = false;
            draft.loadFollowersError = null;
            break;
        case LOAD_FOLLOWERS_SUCCESS:
            draft.loadFollowersLoading = false;
            draft.loadFollowersDone = true;
            draft.me.Followers = action.data;
            break;
        case LOAD_FOLLOWERS_FAILURE:
            draft.loadFollowersLoading = false;
            draft.loadFollowersError = action.error;
            break;
//팔로잉 로딩
        case LOAD_FOLLOWINGS_REQUEST:
            draft.loadFollowingsLoading = true;
            draft.loadFollowingsDone = false;
            draft.loadFollowingsError = null;
            break;
        case LOAD_FOLLOWINGS_SUCCESS:
            draft.loadFollowingsLoading = false;
            draft.loadFollowingsDone = true;
            draft.me.Followings = action.data;
            break;
        case LOAD_FOLLOWINGS_FAILURE:
            draft.loadFollowingsLoading = false;
            draft.loadFollowingsError = action.error;
            break;
//해당 유저 게시물 관리
        case ADD_POST_TO_ME:
            draft.me.Posts.unshift({ id: action.data });
            break;
        case REMOVE_POST_OF_ME:
            draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
            break;

        default: break;
    }
    

});

export default reducer;