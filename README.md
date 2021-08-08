back(폴더 구조)
├── config
├── models (DB 설계)
│      ├ index
│      └ comment, hastag, image, post, user
├── passport (로그인 검사)
│      └ index, local
├── routes
│     ├ middlewares (로그인/ 비로그인)
│     └ hashtag, post, posts, user
├── app.js

front(컴포넌트 흐름)
@Applayout : Components폴더 -> Applayout.js
pages@index : pages 폴더 -> index.js

@Applayout 
├── 상단메뉴 (Home, pages@profile, 다이나믹 라우팅)
├── 로그인(좌) ── @UserProfile(프로필 정보)
├── 비로그인(좌) ── @LoginForm(로그인 폼)
│                         └─ pages@signup(회원가입 폼)
├── pages@index(중)
│        ├─ @PostForm(게시글 작성란)   
│        └─ @PostCard(게시물)
│                 ├─ @FollowButton(팔로우/언팔 버튼)
│                 ├─ @PostImages(이미지)
│                 │         └── @imagesZoom@ImagesZoom(상세 이미지)
│                 ├─ @PostCardContent(작성글)
│                 ├─ @CommentForm(댓글 작성)
│
├── 상단메뉴 ── pages@profile(중)
│                     ├── @FollowList(팔로우 리스트)
│                     └─  @NicknameEditForm(닉네임 변경)
│
├── @Explanation@index(우) 
│            ├─ FuncExplan(정보)
│            └─ ChipArray(기술 스택)

