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
        let sessionLogin = sessionStorage.getItem("username");
        if (sessionLogin != null) {
            $scope.username = sessionLogin;
            $scope.login = true;
        } else {
            $scope.login = false;
        }
        $scope.logout = () => {
            sessionStorage.clear();
            location.replace("../index.html");
        };
        $scope.detail = (sp) =>{
            console.log("id: ")
            idProdct = sp.$id;
            location.replace("../detail.html?idProduct=" + idProdct);
            console.log("id: " + idProdct)
        }


        var ref = firebase.database().ref("sanpham");
        var list = $firebaseArray(ref);
        list.$loaded().then(() => {
            $scope.listSanPham = list;
        });

        $scope.total = 0;

        $scope.gioHang = [];
        $scope.addCart = function(sp){
            $scope.gioHang.push(sp);
            $scope.total++;
            console.log($scope.gioHang);
            localStorage.setItem("GioHang", JSON.stringify($scope.gioHang) );
        }
    }]);
  
