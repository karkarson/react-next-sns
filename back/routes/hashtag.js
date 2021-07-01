const express = require('express');
const { Op } = require('sequelize');

const { User, Hashtag, Comment, Image, Post } = require('../models');

const router = express.Router();

//특정 해시태그 게시물
router.get('/:tag', async (req, res, next) => {
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
                model: Hashtag,
                where: { name: decodeURIComponent(req.params.tag) },
            }, {
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
