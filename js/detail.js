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

app.controller("MyCtrl", ['$scope', '$firebaseArray',
function ($scope, $firebaseArray) {
    
    let url = new URL(location.href);
    let idProduct = url.searchParams.get("idProduct");
    var ref = firebase.database().ref("sanpham");
    var list = $firebaseArray(ref);
    list.$loaded().then(()=>{
        objectGiay=list.$getRecord(idProduct);
        $scope.objectGiay = objectGiay;
        console.log(objectGiay)
    });   
    $scope.total = 0;

    $scope.giohang = [];

    $scope.addToCart = function (sp) {

        var idx = $scope.giohang.findIndex((item) => {
            return (item.products.$id == sp.$id);
        });
        if (idx < 0) {
            var newSp = {
                products: sp,
                slBan: 1
            };
            $scope.giohang.push(newSp);
        } else {
            $scope.giohang[idx].slBan++;
        }


        $scope.total++;
        console.log($scope.giohang);
        localStorage.setItem("GioHang", JSON.stringify($scope.giohang));
    }
}

]);
  
