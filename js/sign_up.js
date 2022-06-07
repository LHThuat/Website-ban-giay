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

app.controller("MyCtrl", ["$scope", "$firebaseArray",
    ($scope, $firebaseArray) => {
       //Checklogin
    let sessionLogin = sessionStorage.getItem("username");
    if (sessionLogin != null) {
      location.replace("../index.html");
      return;
    }
    const ref = firebase.database().ref("Users");
    const list = $firebaseArray(ref);

    
    list.$loaded().then(() => {
        console.log(list);
        $scope.register = () => {
          //Lấy giá trị từ ô input
          const username = $scope.idUser;
          const password = $scope.idPassword;
          const repassword = $scope.idRePassword;
          const fullname = $scope.idFullname;
          const email = $scope.idEmail;
          const address = $scope.idAddress;
          //Tạo 1 Object chứa khách hàng
          const registerObj = {
            username: username,
            password: password,
            fullname: fullname,
            email: email,
            address: address,
          };
          //Tạo biến check đăng ký
          var checkRegister = true;
          if ((!username, !password, !repassword, !fullname, !email, !address)) {
            checkRegister = false;
          }
          //Tìm username xem đã tồn tại hay chưa
          var idx = list.findIndex((item) => {
            return username == item.username;
          });
          //Nếu user name đã tồn tại
          if (idx > -1) {
            $scope.reason = "Tên đăng nhập đã tồn tại!";
            checkRegister = false;
          } else if (password != repassword) {
            $scope.reason = "Nhập lại mật khẩu sai!";
            checkRegister = false;
          }else{
            $scope.reason = null;
          }
          // Kiểm tra đăng ký thành công hoặc thất bại
          $scope.registerSucess = checkRegister;
          if (checkRegister) {
            list.$add(registerObj).then((ref) => {
              //Tạo id ngẫu nhiên
              const id = ref.key;
              list.$indexFor(id); // returns location in the array
            });
            alert("Đăng ký thành công");          
            location.replace("../dangky.html");
          }
        };
      });
  },
    ]);
