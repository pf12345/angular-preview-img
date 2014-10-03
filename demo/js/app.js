/**
 * Created by lovely on 9/29/2014.
 */

var app = angular.module("app", [
    "ngRoute",
    "ngAnimate",
    "angular-preview-img"
]);
app.config(function($routeProvider) {
    $routeProvider
      .when("/",{
            controller: "indexCtrl",
            templateUrl: "../html/home.html"
        }
    )
    .when("/page1",{
            controller: "oneCtrl",
            templateUrl: "../html/page1.html"
        }
    ).when("/page2",{
            controller: "twoCtrl",
            templateUrl: "../html/page2.html"
        }
    ).otherwise({
        redirectTo: "/"
    })
});
//
app.controller('indexCtrl', function($scope) {

        console.log('this is page index');
})
    .controller('oneCtrl', function($scope) {
        $scope.persons = [{
            name: 'join',
            age: 10
        }, {
            name: "tk",
            age: '11'
        }, {
            name: "lw",
            age: 12
        }];
        $scope.previewSingleImg = {
            imagePath: "../image/google.png"
        };
        $scope.showPreviewSingle = function() {
            $scope.openPreviewSingleImg();
        };
    })
    .controller('twoCtrl', function($scope) {
        $scope.files = [{
            imagePath: "../image/google.png",
            name: "google"
        }, {
            imagePath: "../image/AngularJS-large.png",
            name: "angular"
        }];
        $scope.checkedImg = $scope.files[0];


        $scope.isShow = true;
        $scope.makeShow = function() {
            $scope.isShow = true;
        };
        $scope.makeHide = function() {
            $scope.isShow = false;
        };
    });