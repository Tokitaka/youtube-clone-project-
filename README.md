# youtube-clone-project-
Youtube clone built using NodeJS, Express, Mongo and ES6 (javaScript)

skills : NODE.JS (14.15.1 이상) / MONGO DB / HTML / CSS  
tools : VSCODE / GITHUB / CHROME
domain : User / Videos <br/>
functions :  
- User : 계정 생성, 로그인, 프로필 수정, 계정 삭제, 비밀번호 변경
- Videos : 비디오 보기, 비디오 업로드, 비디오 수정, 비디오 삭제, 댓글 추가, 댓글 수정, 댓글 삭제, 검색
  
## settings
```jsx
//package.json
"scripts": {
    "dev": "nodemon --exec babel-node src/index.js"
  },

"dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@babel/core": "^7.23.2",
    "@babel/node": "^7.22.19",
    "@babel/preset-env": "^7.23.2",
    "nodemon": "^3.0.1"
  }
```

```jsx
//bable.config.json
{
    "presets": ["@babel/preset-env"]
  }
```

## code convention
### router

```jsx
**global
/ -> Home
/join -> Join
/login -> Login
/search -> Search

**users
/users/edit
/users/delete

**viedos
/videos/watch
/videos/edit
/videos/delete
/videos/comments
/videos/comments/delete
```
