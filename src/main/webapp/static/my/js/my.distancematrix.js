var app = angular.module("DistanceMatrix", ['ngMessages']);

app.controller('GetMatrixCtrl', function ($scope, $http, DistanceMatrixService) {

 
    // the transit only for Google Maps APIs Premium Plan
    $scope.vm = {
        units: [{code: '', desc:''}, {code:'METRIC', desc:'metric'},{code:'IMPERIAL', desc:'imperial'}],
        avoids: [{code: '', desc:''}, {code:'TOLLS', desc:'tolls'},{code:'HIGHWAYS', desc:'highways'},{code:'FERRIES', desc:'ferries'}],
        travelModes: [{code: '', desc:''}, {code:'DRIVING', desc:'Driving'},{code:'WALKING', desc:'Walking'},{code:'BICYCLING', desc:'Bicycling'}],
        languages: [{code: '', desc:''}, {code: 'ar', desc:'Arabic'}, {code: 'bg', desc:'Bulgarian'}, {code: 'bn', desc:'Bengali'}, {code: 'ca', desc:'Catalan'},
        	       {code: 'cs', desc:'Czech'}, {code: 'da', desc:'Danish'}, {code: 'de', desc:'German'}, {code: 'el', desc:'Greek'},
        	       {code: 'en', desc:'English'}, {code: 'en-AU', desc:'English (Australian)'}, {code: 'en-GB', desc:'English (Great Britain)'},
        	       {code: 'es', desc:'Spanish'}, {code: 'eu', desc:'Basque'}, {code: 'eu', desc:'Basque'}, {code: 'fa', desc:'Farsi'},
        	       {code: 'fi', desc:'Finnish'}, {code: 'fil', desc:'Filipino'}, {code: 'fr', desc:'French'}, {code: 'gl', desc:'Galician'},
        	       {code: 'gu', desc:'Gujarati'}, {code: 'hi', desc:'Hindi'}, {code: 'hr', desc:'Croatian'}, {code: 'hu', desc:'Hungarian'},
        	       {code: 'id', desc:'Indonesian'}, {code: 'it', desc:'Italian'}, {code: 'iw', desc:'Hebrew'},{code: 'ja', desc:'Japanese'},
        	       {code: 'kn', desc:'Kannada'},{code: 'ko', desc:'Korean'}, {code: 'lt', desc:'Lithuanian'}, {code: 'lv', desc:'Latvian'},
        	       {code: 'ml', desc:'Malayalam'}, {code: 'mr', desc:'Marathi'}, {code: 'nl', desc:'Dutch'},
        	       {code: 'no', desc:'Norwegian'}, {code: 'pl', desc:'Polish'}, {code: 'pt', desc:'Portuguese'},
        	       {code: 'pt-BR', desc:'Portuguese (Brazil)'},  {code: 'pt-PT', desc:'	Portuguese (Portugal)'},
        	       {code: 'ro', desc:'Romanian'},  {code: 'ru', desc:'Russian'},  {code: 'sk', desc:'Slovak'},
        	       {code: 'sl', desc:'Slovenian'},  {code: 'sr', desc:'Serbian'}, {code: 'sv', desc:'Swedish'},
        	       {code: 'ta', desc:'Tamil'}, {code: 'te', desc:'Telugu'}, {code: 'th', desc:'Thai'},  {code: 'tl', desc:'Tagalog'},
        	       {code: 'tr', desc:'Turkish'}, {code: 'uk', desc:'Ukrainian'}, {code: 'vi', desc:'Vietnamese'},
        	       {code: 'zh-CN', desc:'Chinese (Simplified)'}, {code: 'zh-TW', desc:'Chinese (Traditional)'}

        	      ]
    }; 
      
    $scope.getMatrix = function () {
        if ($scope.distanceMatrixForm.$invalid) {
            return;
        }
        
        var appPath = $scope.vm.appPath;
        var origins = $scope.vm.origins != undefined ? $scope.vm.origins : '';
        var destinations = $scope.vm.destinations != undefined ? $scope.vm.destinations : '';
        var travelMode = $scope.vm.travelMode != undefined ? $scope.vm.travelMode : '';
        var language = $scope.vm.language != undefined ? $scope.vm.language : '';      
        var unit = $scope.vm.unit != undefined ? $scope.vm.unit : '';   
        var avoid = $scope.vm.avoid != undefined ? $scope.vm.avoid : '';  
        
        var response = DistanceMatrixService.getDistanceMatrix(appPath, origins, destinations, travelMode, language, unit, avoid);
        
        response.then(function(data) {
        	$scope.vm.matrix = data;
        })
    };

});

app.service('DistanceMatrixService', ['$http', '$log', function ($http, $log) {
	
	this.getDistanceMatrix = function (appPath, origins, destinations, travelMode, language, unit, avoid) {
		
        return $http({
            method: 'GET',
            url: appPath + 'getmatrix',
            params: {origins: origins, destinations:destinations, mode:travelMode, language:language , unit:unit, avoid:avoid }
        })   
        .then(function(response) {
            return response.data;
        })
        ;
	};
		
}]);
;

function getAppPath() {
	var appPath = $("#globalForm").find('input[name="appPath"]').val();
	return appPath;
}

var rcSubmitDirective = {
        'rcSubmit': function () {
            return {
                restrict: 'A',
                require: ['rcSubmit', '?form'],
                controller: ['$scope', function ($scope) {
                    this.attempted = false;
 
                    this.setAttempted = function() {
                        this.attempted = true;
                    };
                }],
                compile: function(cElement, cAttributes, transclude) {
                    return {
                        pre: function(scope, formElement, attributes, controllers) {
 
                            var submitController = controllers[0];
 
                            scope.rc = scope.rc || {};
                            scope.rc[attributes.name] = submitController;
                        },
                        post: function(scope, formElement, attributes, controllers) {
 
                            var submitController = controllers[0];
                            var formController = (controllers.length > 1) ? 
                                                 controllers[1] : null;
 
                            var fn = $parse(attributes.rcSubmit);
 
                            formElement.bind('submit', function (event) {
                                submitController.setAttempted();
                                if (!scope.$$phase) scope.$apply();
 
                                if (!formController.$valid) return false;
 
                                scope.$apply(function() {
                                    fn(scope, {$event:event});
                                });
                            });
                        }
                    };
                }
            };
        }};