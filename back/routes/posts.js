const express = require('express');
const { Op } = require('sequelize');
const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

//게시물 로딩
router.get('/', async (req, res, next) => {
    try{
        const where = {};
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

 //팔로잉한 사람 게시물 불러오기
router.get('/related', async (req, res, next) => {
    try {
      const followings = await User.findAll({
        attributes: ['id'],
        include: [{
          model: User,
          as: 'Followers',
          where: { id: req.user.id }
        }]
      });
      const where = {
        UserId: { [Op.in]: followings.map((v) => v.id) }
      };
      if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
        where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
      } 
      const posts = await Post.findAll({
        where,
        limit: 10,
        order: [
          ['createdAt', 'DESC'],
          [Comment, 'createdAt', 'DESC'],
        ],
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
          }],
        }, {
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        }, {
          model: Post,
          as: 'Retweet',
          include: [{
            model: User,
            attributes: ['id', 'nickname'],
          }, {
            model: Image,
          }]
        }],
      });
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  
   //팔로잉하지 않은 사람 게시물 불러오기
  router.get('/unrelated', async (req, res, next) => {
    try {
      const followings = await User.findAll({
        attributes: ['id'],
        include: [{
          model: User,
          as: 'Followers',
          where: { id: req.user.id }
        }]
      });
      const where = {
        UserId: { [Op.notIn]: followings.map((v) => v.id).concat(req.user.id) }
      };
      if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
        where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
      } 
      const posts = await Post.findAll({
        where,
        limit: 10,
        order: [
          ['createdAt', 'DESC'],
          [Comment, 'createdAt', 'DESC'],
        ],
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
          }],
        }, {
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        }, {
          model: Post,
          as: 'Retweet',
          include: [{
            model: User,
            attributes: ['id', 'nickname'],
          }, {
            model: Image,
          }]
        }],
      });
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      next(error);
    }
  })


module.exports = router;