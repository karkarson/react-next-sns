const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');
const router = express.Router();

const { User, Post, Comment, Image } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');


//사용자 정보 복구
router.get('/', async (req, res, next) => {
    try{
        if(!req.user){
            res.status(200).json(null);            
        }else{
            const user = await User.findOne({
                where: { id: req.user.id },
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }]    
            });
            res.status(200).json(user);
        }
    }catch(error){
        console.error(error);
        next(error);
    }
});

//회원가입
router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user
    try{
        const exUser = await User.findOne({
            where: {
                email : req.body.email,
            }
        });
        if(exUser){
            return res.status(403).send('이미 사용 중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        res.status(201).send('회원가입 완료');
    }catch(error){
        console.error(error);
        next(error);
    }
});

//로그인
router.post('/login', isNotLoggedIn, (req, res, next) => { //isNotLoggedIn,
    passport.authenticate('local', (err, user, info) => {
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if(loginErr){
                console.error(loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]
            });
            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req, res, next);
});

//로그아웃
router.post('/logout', isLoggedIn, (req, res) => { //isLoggedIn,
   req.logout();
   req.session.destroy();
   res.send('로그아웃 완료'); 
});


//닉네임 변경
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try{
        await User.update({
            nickname : req.body.nickname,
        }, {
            where: { id: req.user.id },
        });
        res.status(200).json({ nickname: req.body.nickname });
    }catch(error){
        console.error(error);
        next(error);
    }
});

//팔로워 로딩
router.get('/followers', isLoggedIn, async (req, res, next) => {
    try{
        const user = await User.findOne({ where : { id: req.user.id }});
        if(!user){
            return res.status(403).send('존재하지 않는 사용자 입니다.')
        }
        const followers = await user.getFollowers({
            attributes: ['id', 'nickname'],
            limit: parseInt(req.query.limit, 10)
        });
        return res.status(200).json(followers);
    }catch(error){
        console.error(error);
        next(error);
    }
});

//팔로잉 로딩
router.get('/followings', isLoggedIn, async (req, res, next) => {
    try{
        const user = await User.findOne({ where : { id: req.user.id }});
        if(!user){
            return res.status(403).send('존재하지 않는 사용자 입니다.')
        }
        const followings = await user.getFollowings({
            attributes: ['id', 'nickname'],
            limit: parseInt(req.query.limit, 10)
        });
        return res.status(200).json(followings);
    }catch(error){
        console.error(error);
        next(error);
    }
});

//팔로우
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
    try{
        const user = await User.findOne({ where : { id: req.params.userId }});
        if(!user){
            return res.status(403).send('존재하지 않는 사용자 입니다.')
        }
        await user.addFollowers(req.user.id);
        return res.status(200).json({ UserId: parseInt(req.params.userId, 10) })
    }catch(error){
        console.error(error);
        next(error);
    }

});

//언팔
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
    try{
        const user = await User.findOne({ where : { id: req.params.userId }});
        if(!user){
            return res.status(403).send('존재하지 않는 사용자 입니다.')
        }
        await user.removeFollowers(req.user.id);
        return res.status(200).json({ UserId: parseInt(req.params.userId, 10) })
    }catch(error){
        console.error(error);
        next(error);
    }

});

//팔로워 제거
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
    try{
        const user = await User.findOne({ where : { id: req.params.userId }});
        if(!user){
            return res.status(403).send('존재하지 않는 사용자 입니다.')
        }
        await user.removeFollowings(req.user.id);
        return res.status(200).json({ UserId: parseInt(req.params.userId, 10) })
    }catch(error){
        console.error(error);
        next(error);
    }

});

// 1번 유저 getStaticProps 활용
router.get('/:userId', async (req, res, next) => {
    try{
        
        const user = await User.findOne({
            where: { id: req.params.userId },
            attributes: {
                exclude: ['password']
            },
            include: [{
                model: Post,
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followers',
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followings',
                attributes: ['id'],
            }]    
        });

        if(user){ 
            const data = user.toJSON(); // 개인정보 보호 차원
            data.Posts = data.Posts.length; 
            data.Followings = data.Followings.length;
            data.Followers = data.Followers.length;
            res.status(200).json(data);
        }else{
            res.status(400).json('존재하지 않는 사용자 입니다.');
        }
        
    }catch(error){
        console.error(error);
        next(error);
    }
});

//특정 유저 게시물
router.get('/:userId/posts', async (req, res, next) => {
    try{
        const where = { UserId : req.params.userId };
        if(parseInt(req.query.lastId, 10)){ //처음 로딩 아닐 때
            where.id = {[Op.lt]: parseInt(req.query.lastId, 10)}
        }
        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC']],
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }]
            }, {
                model: User,
                as: 'Likers',
                attributes: ['id']
            }, {
                model: Post,
                as: 'Retweet',
                include: [{
                  model: User,
                  attributes: ['id', 'nickname'],
                }, {
                  model: Image,
                }]
            }]
        });
        //console.log(posts);
        res.status(200).json(posts);
    }catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;