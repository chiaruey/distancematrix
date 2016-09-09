var app = angular.module("DistanceMatrix", ['ngMessages', 'ngMaterial']);

app.controller('GetMatrixCtrl', function ($scope, $http, $mdDialog,  DistanceMatrixService) {

 
    // the transit only for Google Maps APIs Premium Plan
    $scope.vm = {
    	origins:'',
    	destinations:'',
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
        
        var distanceMatrixPromise = DistanceMatrixService.getDistanceMatrix(appPath, origins, destinations, travelMode, language, unit, avoid);
        
        distanceMatrixPromise.then(function(response) {
        	$scope.vm.matrix = response.data;
        	resetForm($scope);
        	resetMessage($scope, 'The system has successfully submitted the request, please scroll down for the Distance Matrix Response ');
        })
    };

    
    $scope.showOriginPrompt = function(ev) {
    	resetMessage($scope);

        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
          .title('Please add an origin address')
          .textContent('This entered address will be validated by Google API.')
          .placeholder('adderss')
          .ariaLabel('address')
          .targetEvent(ev)
          .ok('Done')
          .cancel('Cancel');

        $mdDialog.show(confirm).then(function(result) {
          var appPath = $scope.vm.appPath;
          var address = result; 
          
          var geocodingPromise = DistanceMatrixService.getGeocodingResult(appPath, address);
          
          geocodingPromise.then(function(response) {
          var valid = response.data.valid;
          var resultCount = response.data.resultCount;
          var formattedAddress = response.data.formattedAddress;
          var addressType = response.data.addressType;         
          if (valid === true) {
        	  $scope.infoMessage = 'Successfully added a valid origin: ' + result ;
        	  
              if(!isBlank(formattedAddress)){
            	  $scope.infoMessage =  $scope.infoMessage + '. [ Found Address = ' + formattedAddress + " ] ";
         	  }        	  
              if(!isBlank(addressType)){
            	  $scope.infoMessage =  $scope.infoMessage + '. [ Address Type = ' + addressType + " ] " ;
         	  }               	  
        	  
              if(isBlank($scope.vm.origins)){
                	$scope.vm.origins = result;
           	  } else {
           		$scope.vm.origins=$scope.vm.origins + "|" + result;            		  
           	  }
          } else {
        	  $scope.errorMessage = 'Invalid origin : ' + result + '. [ The system has found ' + resultCount + ' matching address(es) ]';
          }
          	
          })
          

          
        }, function() {
          $scope.status = 'You didn\'t add an origin address.';
        });
      };
      
      
      $scope.showDestinationPrompt = function(ev) {
    	  resetMessage($scope);

    	  
          // Appending dialog to document.body to cover sidenav in docs app
          var confirm = $mdDialog.prompt()
            .title('Please add a destination address')
            .textContent('This entered address will be validated by Google API.')
            .placeholder('adderss')
            .ariaLabel('address')
            .targetEvent(ev)
            .ok('Done')
            .cancel('Cancel');
          
          $mdDialog.show(confirm).then(function(result) {
              var appPath = $scope.vm.appPath;
              var address = result; 
              
              var geocodingPromise = DistanceMatrixService.getGeocodingResult(appPath, address);
              
              geocodingPromise.then(function(response) {
              var valid = response.data.valid;
              var resultCount = response.data.resultCount;
              var formattedAddress = response.data.formattedAddress;
              var addressType = response.data.addressType;         
              if (valid === true) {
            	  $scope.infoMessage = 'Successfully added a valid destination: ' + result ;
            	  
                  if(!isBlank(formattedAddress)){
                	  $scope.infoMessage =  $scope.infoMessage + '. [ Found Address = ' + formattedAddress + " ] ";
             	  }        	  
                  if(!isBlank(addressType)){
                	  $scope.infoMessage =  $scope.infoMessage + '. [ Address Type = ' + addressType + " ] " ;
             	  }               	  
            	  
                  if(isBlank($scope.vm.destinations)){
                    	$scope.vm.destinations = result;
               	  } else {
               		$scope.vm.destinations=$scope.vm.destinations + "|" + result;            		  
               	  }
              } else {
            	  $scope.errorMessage = 'Invalid destination : ' + result + ' . [ The system has found ' + resultCount + ' matching address(es) ]';
              }
              	
              })
              

              
            }, function() {
              $scope.status = 'You didn\'t add an origin address.';
            });
          };
        
        
        $scope.clearErrorMessage = function() {
        	$scope.errorMessage = '';
        	
        }
        
        $scope.clearInfoMessage = function() {
        	$scope.infoMessage = '';
        	
        }


});

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}



app.service('DistanceMatrixService', ['$http', '$log', '$q', function ($http, $log, $q) {
	
	// Use Deferred Promise
	this.getDistanceMatrix = function (appPath, origins, destinations, travelMode, language, unit, avoid) {
		var deferred = $q.defer();
		
		var successCallback = function (data) {
			$log.debug("DistanceMatrixService.getDistanceMatrix(): LOOKUP SUCCEEDED, Json response = " + angular.toJson(data));
			deferred.resolve(data);
		};
		
		var errorCallback = function (reason) {
			$log.error("DistanceMatrixService.getDistanceMatrix(): FAILED LOOKUP, Json response =  " + angular.toJson(reason));
			deferred.reject("Fail to search distance matrix");
		};
		var req = {
				 method: 'GET',
				 url: appPath + 'getmatrix',
				 params: {origins: origins, destinations:destinations, mode:travelMode, language:language , unit:unit, avoid:avoid }
				}

		$http(req).then(successCallback, errorCallback);
		
		return deferred.promise;
	};

	// Use Deferred Promise
	this.getGeocodingResult = function (appPath, address) {
		var deferred = $q.defer();
		
		var successCallback = function (data) {
			$log.debug("DistanceMatrixService.getGeocodingResult(): LOOKUP SUCCEEDED, Json response = " + angular.toJson(data));
			deferred.resolve(data);
		};
		
		var errorCallback = function (reason) {
			$log.error("DistanceMatrixService.getGeocodingResult(): FAILED LOOKUP, Json response =  " + angular.toJson(reason));
			deferred.reject("Fail to search Geocoding for address " + address);
		};
		var req = {
				 method: 'GET',
				 url: appPath + 'geocoding',
				 params: {address: address }
				}

		$http(req).then(successCallback, errorCallback);
		
		return deferred.promise;
	};

}]);
;

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

/*function getAppPath() {
	var appPath = $("#globalForm").find('input[name="appPath"]').val();
	return appPath;
}*/

function resetForm($scope) {
	$scope.vm.origins='';
	$scope.vm.destinations='';
	$scope.vm.travelMode='';
	$scope.vm.language='';
	$scope.vm.unit='';
	$scope.vm.avoid='';

}

function resetMessage($scope, infoMessage, errorMessage) {
	if (isBlank(infoMessage)) {
		$scope.infoMessage = '';
	} else {
		$scope.infoMessage = infoMessage;
	}
	
	if (isBlank(errorMessage)) {
		$scope.errorMessage = '';
	} else {
		$scope.errorMessage = errorMessage;
	}
}

