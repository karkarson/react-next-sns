import axios from 'axios';
import { all, delay, call, fork, put, takeLatest } from 'redux-saga/effects';
import { 
         LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
         LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
         SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
         FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
         UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
         CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE,
         LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE,
         LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE,
         LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
         REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS, REMOVE_FOLLOWER_FAILURE,
         LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE,
} 
from '../reducers/user';

// 1번 유저 getStaticProps 활용
function loadUserAPI(data) { 
    return axios.get(`/user/${data}`);
  }
  
  function* loadUser(action) {
    try {
      const result = yield call(loadUserAPI, action.data);
      yield put({
        type: LOAD_USER_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: LOAD_USER_FAILURE,
        error: err.response.data,
      });
    }
}

//내 정보 복구
function loadMyInfoAPI() {
    return axios.get('/user');
}

function* loadMyInfo() {
    try{
        const result = yield call(loadMyInfoAPI); 
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result.data,
        });
    }catch(err){
        console.error(err);
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: err.response.data,
        });
    }
}

//로그인
function loginAPI(data) {
    return axios.post('/user/login', data);
}

function* login(action) {
    try{
        const result = yield call(loginAPI, action.data); 
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data,
        });
    }catch(err){
        console.error(err);
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        });
    }
}

//로그아웃
function logoutAPI() {
    return axios.post('/user/logout');
}

function* logout() {
    try{
        yield call(logoutAPI); 
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    }catch(err){
        console.error(err);
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        });
    }
}

//회원가입
function signUpAPI(data) {
    return axios.post('/user', data);
}

function* signUp(action) {
    try{
        const result = yield call(signUpAPI, action.data); 
        console.log(result);
        yield put({
            type: SIGN_UP_SUCCESS,
        });
    }catch(err){
        console.error(err);
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        });
    }
}

//닉네임 변경
function changeNicknameAPI(data) {
    return axios.patch('/user/nickname', data);
}

function* changeNickname(action) {
    try{
        const result = yield call(changeNicknameAPI, action.data); 
        yield put({
            type: CHANGE_NICKNAME_SUCCESS,
            data: result.data,
        });
    }catch(err){
        console.error(err);
        yield put({
            type: CHANGE_NICKNAME_FAILURE,
            error: err.response.data,
        });
    }
}

//팔로우
function followAPI(data) {
    return axios.patch(`/user/${data}/follow`);
}

function* follow(action) {
    try{
        const result = yield call(followAPI, action.data); 
        yield put({
            type: FOLLOW_SUCCESS,
            data: result.data,
        });
    }catch(err){
        console.error(err);
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}

//언팔
function unfollowAPI(data) {
    return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action) {
    try{
        const result = yield call(unfollowAPI, action.data); 
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: result.data,
        });
    }catch(err){
        console.error(err);
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}

//팔로워 제거
function removeFollowerAPI(data) {
    return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action) {
    try{
        const result = yield call(removeFollowerAPI, action.data); 
        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data: result.data,
        });
    }catch(err){
        console.error(err);
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error: err.response.data,
        });
    }
}

//팔로워 로딩
function loadFollowersAPI() {
    return axios.get('/user/followers');
}

function* loadFollowers() {
    try{
        const result = yield call(loadFollowersAPI); 
        yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            data: result.data,
        });
    }catch(err){
        console.error(err);
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: err.response.data,
        });
    }
}

//팔로잉 로딩
function loadFollowingsAPI() {
    return axios.get('/user/followings');
}

function* loadFollowings() {
    try{
        const result = yield call(loadFollowingsAPI); 
        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result.data,
        });
    }catch(err){
        console.error(err);
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLoadUser() {// 1번 유저 getStaticProps 활용
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
  }

function* watchLoadMyInfo(){ //내 정보 복구
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo); 
}

function* watchLogIn() { //로그인
    yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogOut() {//로그아웃
    yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchSignUp() { //회원가입
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchChangeNickname() { //닉네임 변경
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchFollow() { //팔로우
    yield takeLatest(FOLLOW_REQUEST, follow);
  }

function* watchUnfollow() { //언팔
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchRemoveFollower() { //팔로워 제거
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function* watchLoadFollowers() { //팔로워 로딩
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchLoadFollowings() { //팔로잉 로딩
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

export default function* userSaga(){
    yield all([
        fork(watchLoadUser),
        fork(watchLoadMyInfo),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchChangeNickname),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchRemoveFollower),
    ]);
}













