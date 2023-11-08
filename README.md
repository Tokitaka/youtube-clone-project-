# youtube-clone-project-
Youtube clone built using NodeJS, Express, Mongo and ES6 (javaScript)

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
