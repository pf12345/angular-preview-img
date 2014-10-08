/**
 * Created by lovely on 9/29/2014.
 */
(function () {
    angular.module('angular-preview-img', ['angularPreviewImg']);

    angular.module('angularPreviewImg', []).directive('previewImg', function ($window, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="view-image-fs ngPreviewAnimate" ng-class="{previewImgShow: previewImgOpacity}" ng-show="previewImgShow">' +
                '<div class="preview-title">' +
                '<span class="file-name-fs">{{checkedImg.name || previewImgTitle}}</span>' +
                '<a ng-if="previewImgDesign" class="btn btn-ok" style="margin-left: 20px" href="/design/{{project.id}}?fileId={{checkedImg.id}}">' +
                '{{modify}}' +
                '</a>' +
                '<b ng-click="closePreviewImg()"></b>' +
                '</div>' +
                '<div class="left-show-img">' +
                '<div>' +
                '<button class="left-view" ng-click="leftChangeImg()" ng-class="{unUse: files.length==0 || index == 0}"></button>' +
                '<img self-adapting class="file-img-fs" ng-src="{{checkedImg.imagePath}}" alt=""/>' +
                '<button class="right-view" ng-click="rightChangeImg()" ng-class="{unUse: files.length==0 || index == files.length-1}"></button>' +
                '</div>' +
                '</div>' +
                '<div class="right-img-list">' +
                '<button class="up-view" ng-click="upMoveImg()"></button>' +
                '<ul class="right-img-list-ul" id="right-img-list-ul">' +
                '<li class="preview-animate" ng-repeat="file in files" ng-style="{top: top}" ng-click="changeImg(file, $index)"' +
                ' ng-class="{checked: file.pos == index, unchecked: file.pos != index}">' +
                '<img height="60" ng-src="{{file.imagePath}}" alt=""/>' +
                '</li>' +
                '</ul>' +
                '<button class="down-view" ng-click="downMoveImg()"></button>' +
                '</div>' +
                '</div>',
            link: function (scope) {
                var liHeight = 72,
                    ulHeight = $window.innerHeight - 140;
                scope.index = 0;
                scope.top = 0;
                scope.previewImgShow = false;

                /**
                 * get ul and li height
                 */
                var getUlAndLiHeight = function() {
                    var ulElement = document.getElementById('right-img-list-ul'),
                        uHeight = ulElement.clientHeight,
                        element = ulElement.getElementsByTagName('li')[0],
                        style = element.currentStyle || window.getComputedStyle(element),
                        height = parseInt(element.offsetHeight) + parseInt(style.marginTop);
                    /**get li height again*/
                    if (height && height > 0) {
                        liHeight = height;
                    }
                    /**get ul height again*/
                    ulHeight = uHeight && ulHeight > 0 ? uHeight : ulHeight;
                };

                /**
                 * resize event function
                 */
                var resizeFun = function () {
                    getUlAndLiHeight();
                    scope.selfAdapting = false;
                    scope.selfAdapting = true;
                };

                /** ie and other */
                if ($window.addEventListener)  // W3C DOM
                    $window.addEventListener("resize", resizeFun);
                else if ($window.attachEvent) { // IE DOM
                    $window.attachEvent("resize", resizeFun);
                }

                /**
                 * open preview img
                 */
                scope.openPreviewImg = function () {
                    for (var i = 0, _i = scope.files.length; i < _i; i++) {
                        var file = scope.files[i];
                        file.pos = i;
                    }
                    scope.index = 0;
                    scope.checkedImg = scope.files[scope.index];
                    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
                    scope.previewImgShow = true;
                    scope.selfAdapting = true;
                    $timeout(function () {
                        scope.previewImgOpacity = true;
                        getUlAndLiHeight();
                    }, 20);
                };

                /**
                 * close preview img
                 */
                scope.closePreviewImg = function () {
                    scope.previewImgOpacity = false;
                    $timeout(function () {
                        document.getElementsByTagName('html')[0].removeAttribute('style');
                        scope.previewImgShow = false;
                        scope.selfAdapting = false;
                    }, 300);
                };

                /**
                 * change show img info
                 * @param file {Object} file info
                 * @param index {Number} left list img pos number
                 */
                scope.changeImg = function (file, index) {
                    scope.checkedImg = file;
                    scope.index = index;
                    scope.selfAdapting = true;
                };

                /**
                 * show img left icon click event,show pri image
                 */
                scope.leftChangeImg = function () {
                    scope.index -= 1;
                    if (scope.index < 0) {
                        scope.index = 0;
                        return;
                    }
                    if (scope.index * liHeight + scope.top + 10 > ulHeight) {
                        var ulHeight1 = (Math.ceil(ulHeight / liHeight) - 1) * liHeight;
                        scope.top = -((scope.index + 1) * liHeight - ulHeight1);
                    }
                    scope.checkedImg = scope.files[scope.index];
                    if (scope.index * liHeight < -scope.top) {
                        scope.top += liHeight;
                    }
                };

                /**
                 * show img right icon click event,show next image
                 */
                scope.rightChangeImg = function () {
                    scope.index += 1;
                    if (scope.index >= scope.files.length) {
                        scope.index = scope.files.length - 1;
                        return;
                    }
                    if (scope.index * liHeight < -scope.top) {
                        scope.top = -scope.index * liHeight
                    }

                    scope.checkedImg = scope.files[scope.index];
                    if (ulHeight < (scope.index + 1) * liHeight) {
                        scope.top -= liHeight
                    }
                };

                /**
                 * right list down icon click event
                 */
                scope.downMoveImg = function () {
                    if (scope.data.files.length * liHeight + scope.top < ulHeight) return;
                    scope.top -= liHeight;
                };

                /**
                 * right list up click event
                 */
                scope.upMoveImg = function () {
                    if (scope.top === 0) return;
                    scope.top += liHeight;
                }
            }
        }
    }).directive('previewImgSingle', function ($window, $timeout) {
        return {
            restrict: "E",
            replace: true,
            template: '<div class="preview-single-img-container ngPreviewAnimate"' +
                ' ng-class="{previewImgShow:previewSingleOpacity}" ng-show="previewSingleShow">' +
                '<div class="preview-file-mc cursor_decrease" ng-click="closePreviewSingleImg()"></div>' +
                '<div class="preview-single-img-big cursor_decrease" ng-click="closePreviewSingleImg()">' +
                '<img img-vertical-align class="cursor_decrease" ng-src="{{previewSingleImg.imagePath}}" alt=""/>' +
                '</div>' +
                '</div>',
            link: function (scope) {
                /**
                 * close single image preview
                 */
                scope.closePreviewSingleImg = function () {
                    scope.previewSingleOpacity = false;
                    $timeout(function () {
                        document.getElementsByTagName('html')[0].removeAttribute("style");
                        scope.previewSingleShow = false;
                    }, 300);
                };

                /**
                 * show single image preview
                 */
                scope.openPreviewSingleImg = function () {
                    scope.previewSingleShow = true;
                    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
                    $timeout(function () {
                        scope.previewSingleOpacity = true;
                    }, 20);
                };
            }
        }
    }).directive("imgVerticalAlign", function ($window) {
        return {
            link: function (scope, element, attr) {
                scope.$watch('previewSingleShow', function () {
                    var imageHeight = element[0].height;
                    var windowHeight = $window.innerHeight;
                    if (imageHeight > windowHeight) {
                        element.css({
                            "margin-top": -windowHeight / 2 + 20
                        });
                        return true;
                    }
                    element.css("margin-top", (-imageHeight / 2 + 'px'));
                })
            }
        }
    }).directive("selfAdapting", function ($window) {
        return {
            link: function (scope, element, attr) {
                scope.$watch("selfAdapting", function () {
                    if (scope.selfAdapting) {
                        var imgHeight = element[0].height,
                            imgWidth = element[0].width,
                            windowHeight = $window.innerHeight,
                            windowWidth = $window.innerWidth;
                        if (imgHeight > windowHeight - 100) {
                            element.css({
                                "max-height": windowHeight - 100
                            });
                        }
                        if (imgWidth > windowWidth - 300) {
                            element.css({
                                "max-width": windowWidth - 300
                            });
                        }
                    } else {
                        element.removeAttr('style');
                    }
                })
            }
        }
    });
})();