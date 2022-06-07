/*!
* Start Bootstrap - Shop Homepage v5.0.4 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

var app = angular.module("myapp", ["firebase"]);
app.config(function () {
    var config = {
        apiKey: "AIzaSyDHoemysMmlT_PW6bOM9HSZ6zl7Buu5dYI",
        authDomain: "forntendasm.firebaseapp.com",
        projectId: "forntendasm",
        storageBucket: "forntendasm.appspot.com",
        messagingSenderId: "787935646575",
        appId: "1:787935646575:web:4ea84dcbb11e51f6d00e9a",
        measurementId: "G-L06LWLM3FY",
        databaseURL: "https://forntendasm-default-rtdb.firebaseio.com/",
    };
    firebase.initializeApp(config);
});

app.controller("MyCtrl", ["$scope", "$firebaseObject",
    ($scope, $firebaseObject) => {
       //Checklogin
    let sessionLogin = sessionStorage.getItem("username");
    if (sessionLogin != null) {
      location.replace("../index.html");
      return;
    }
    const ref = firebase.database().ref("Users");
    const obj = $firebaseObject(ref);
    
    //Chạy đồng bộ
    obj.$loaded().then(() => {
      const khachHangData = obj;
      console.log(khachHangData);
      $scope.login = () => {
        const username = document.getElementById("idUser").value;
        const password = document.getElementById("idPassword").value;
        angular.forEach(khachHangData, (item) => {
          console.log(item.username);
          if (username == item.username && password === item.password) {
            sessionStorage.setItem("username", username);
            console.log('OK')
            location.replace("../index.html");
            return;
          } else {
            $scope.loginFail = true;
            $scope.message = "Tên đăng nhập hoặc mật khẩu không chính xác";
          }
        });
      };
    });
  },
    ]);
