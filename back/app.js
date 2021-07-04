const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const hashtagRouter = require('./routes/hashtag');
const passportConfig = require('./passport');
const db = require('./models');

dotenv.config();
const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);
passportConfig();


if(process.env.NODE_ENV === 'production'){ //배포 모드일 때
  app.set('trust proxy', 1); //cookie
  app.use(morgan('combined')); //자세한 로그
  app.use(hpp()); //보안
  app.use(helmet({ contentSecurityPolicy: false })); //보안
  app.use(cors({
    origin: 'https://naversns.com',
    credentials: true,
  }))
}else{
  app.use(morgan('dev'));
  //origin: ['http://localhost:3000']
  app.use(cors({ 
    origin: true,
    credentials: true,
  }))
}

app.use('/', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
  proxy: true,
  cookie: {
    httpOnly: true,
    secure: true, 
    domain: process.env.NODE_ENV === 'production' && '.naversns.com'
  },
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('express 실행 완료');
});

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/hashtag', hashtagRouter);


app.listen(3065, () => {
    console.log('서버 실행 중')
});
