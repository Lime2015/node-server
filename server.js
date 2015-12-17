var passport = require("passport");
var express =  require("express");
var bodyParser = require('body-parser');
var KakaoStrategy = require("passport-kakao").Strategy;
var requestKakaoLogin = require('request');

var appKey = "acd16274636c8807be1f6e2aa436ae52";
var redirectUrl = "http://52.69.102.82:3000/oauth";

// passport 에 Kakao Oauth 추가
passport.use( new KakaoStrategy({
        clientID: 'acd16274636c8807be1f6e2aa436ae52',
        callbackURL: "http://52.69.102.82:3000/oauth"
    },
    function(accessToken, refreshToken, params, profile, done){
        // authorization 에 성공했을때의 액션
        console.log( "accessToken :" + accessToken );
        console.log( "사용자 profile: " + JSON.stringify(profile._json) );

        save(accessToken, refreshToken, profile);
        return done(null, profile._json);
    })
);
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// express 앱 설정
var app = express();
app.use(bodyParser());
app.use(passport.initialize());
app.get("/login", passport.authenticate('kakao',{state: "myStateValue"}));
// app.post("/kakao-login", function(req, res){
//   var result;
//   var isWait = true;
//   var email = req.body.email;
//   var password = req.body.password;
//   console.log(">>kakao-login request:" + email + "/" + password);
//   requestKakaoLogin('https://kauth.kakao.com/oauth/authorize?client_id=' + appKey + '&redirect_uri=' + redirectUrl + '&response_type=code',
//         function (error, response, body) {
//     // if (!error && response.statusCode == 200) {
//     //   console.log(body); // Print the body of response.
//     // }
//     // console.log(body);
//     // res.send("result:" + response);
//
//     console.log("<<kakao-login return:" + response);
//     result = body;
//     isWait = false;
//   });
//
//   while (isWait) {
//     require('deasync').sleep(100);
//   }
//
//   res.send(result);
// });
app.get("/oauth", passport.authenticate('kakao'), function(req, res){
    // 로그인 시작시 state 값을 받을 수 있음
    res.send("state :" + req.query.state);
});
app.listen(3000);

// 사용자 구현 부분
function save(){
    //save 로직 구현
}
