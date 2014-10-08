angular-preview-img
===================
This is a image preview angular plugin.

##Usage
1. include the supplied js file in your html.
	<pre>
	&lt;script src="angularpreviewImg.js"&gt;&lt;/script&gt;
	</pre>

2. include the loading bar as a dependency for your app.
	<pre>
	angular.module('myApp', ['angular-preview-img'])
	</pre>

3. include the supplied CSS file (or create your own).
4. include the tag in html.



##Configuration

you should provide some data to complete.

1. $scope.files (Array)

<pre>

$scope.files = [{
	imagePath: your image path,
	name: your image path or null //if this is null, please set $scope.previewImgTitle have value
},{
	imagePath: your image path,
	name: your image path or null
},
......
,{
	imagePath: your image path,
	name: your image path or null
}
]
</pre>

2.$scope.checkedImg (Object)

The default value is $scope.files[0], you can set it by yourself; it is the big image in the center area.

3.$scope.openPreviewImg (Function)

you can use the function to open the preview image plugin,for example:

<pre>
&lt;input class="btn btn-cancel" ng-click="openPreviewImg()" type="button" value="PreviewImg"/&gt;
</pre>

4.$scope.closePreviewImg (Function)

you can use it to close the preview image plugin. for example:

<b class='icon-close' ng-click="closePreviewImg()"></b>

5.$scope.previewImgTitle (String)

you can use it to set the title in show area.



###show single image

1.$scope.previewSingleImg (Object)

It is the show image Object, you must set the value.

2.$scope.openPreviewSingleImg (Function)

you can use it to open the single image preview, for example:

<pre>
$scope.showPreviewSingle = (index) ->
        $scope.openPreviewSingleImg(); //open
        $scope.previewSingleImg = $scope.files[index]; //set the image object

or 

$scope.showPreviewSingle = function(index) {
        $scope.openPreviewSingleImg();
        $scope.previewSingleImg = $scope.files[index];
}
</pre>

3.$scope.closePreviewSingleImg (Function)

you can use it to close the single image preview, for example:

<pre>
&lt;b ng-click="closePreviewSingleImg()"&gt;&lt;/b&gt;

</pre>
