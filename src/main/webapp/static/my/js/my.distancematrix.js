var app = angular.module("DistanceMatrix", ['ngMessages', 'ngMaterial','angularSpinner']);

app.controller('GetMatrixCtrl', function ($scope, $http, $mdDialog,  DistanceMatrixService, usSpinnerService) {

 
    // the transit only for Google Maps APIs Premium Plan
    $scope.vm = {
    	loadingProcessCount: 0,
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
    
    // start spin the spinner
    $scope.startSpin = function(){
        usSpinnerService.spin('spinner-1');
        $scope.vm.loadingProcessCount ++;
    }
    
    // stop spin the spinner
    $scope.stopSpin = function(){
    	$scope.vm.loadingProcessCount --;
    	// Stop spinner after loading
    	if ($scope.vm.loadingProcessCount <= 0 ) {
    		usSpinnerService.stop('spinner-1');;
    	}
        
    }
      
    // click on the show map link
    $scope.showMap = function() {
    	$scope.mapshown = true;
    };
    
    // click on the hide map link
    $scope.hideMap = function() {
    	$scope.mapshown = '';
    };
    
    // invoke the Distance Matrix API
    $scope.getMatrix = function () {
    	$scope.startSpin();
    	
        if ($scope.distanceMatrixForm.$invalid) {
            return;
        }
        
        var appPath = document.getElementById('appPath').value;
        var origins = $scope.vm.origins != undefined ? $scope.vm.origins : '';
        var destinations = $scope.vm.destinations != undefined ? $scope.vm.destinations : '';
        var travelMode = $scope.vm.travelMode != undefined ? $scope.vm.travelMode : '';
        var language = $scope.vm.language != undefined ? $scope.vm.language : '';      
        var unit = $scope.vm.unit != undefined ? $scope.vm.unit : '';   
        var avoid = $scope.vm.avoid != undefined ? $scope.vm.avoid : '';  
        
        var distanceMatrixPromise = DistanceMatrixService.getDistanceMatrix(appPath, origins, destinations, travelMode, language, unit, avoid);
        
        distanceMatrixPromise.then(function(response) {
        	$scope.stopSpin();
        	$scope.vm.matrix = response.data;
        	resetForm($scope);
        	resetMessage($scope, 'The system has successfully submitted the request, please scroll down for the Distance Matrix Response ');
        	$scope.responseshown=true;
        })
    };

    // click on the origin button
    $scope.showOriginPrompt = function(ev) {
    	resetMessage($scope);
    	$scope.responseshown='';
    	$scope.mapshown='';

        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
          .title('Enter an origin address')
          .textContent('Address will be validated by the system')
          .placeholder('adderss')
          .ariaLabel('address')
          .targetEvent(ev)
          .ok('Done')
          .cancel('Cancel');

        $mdDialog.show(confirm).then(function(result) {
        	
        	if (isBlank(result)) {
        		return;
        	}
        	$scope.startSpin();
        	
          var appPath = document.getElementById('appPath').value;
          var address = result; 
          
          var geocodingPromise = DistanceMatrixService.getGeocodingResult(appPath, address);
          
          geocodingPromise.then(function(response) {
          $scope.stopSpin();
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
              var zoom = findZoomByAddrType(addressType);
        	  $scope.lat = response.data.latlng.lat;
        	  $scope.lng = response.data.latlng.lng;     	  
        	  $scope.zoom = zoom;
        	  
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
      
      // click on the destination button
      $scope.showDestinationPrompt = function(ev) {
    	  resetMessage($scope);
    	  $scope.mapshown='';
    	  $scope.responseshown='';

    	  
          // Appending dialog to document.body to cover sidenav in docs app
          var confirm = $mdDialog.prompt()
            .title('Enter a destination address')
            .textContent('Address will be validated by the system')
            .placeholder('adderss')
            .ariaLabel('address')
            .targetEvent(ev)
            .ok('Done')
            .cancel('Cancel');
          
          $mdDialog.show(confirm).then(function(result) {
          	if (isBlank(result)) {
        		return;
        	}
        	  $scope.startSpin();
              var appPath = document.getElementById('appPath').value;
              var address = result; 
              
              var geocodingPromise = DistanceMatrixService.getGeocodingResult(appPath, address);
              
              geocodingPromise.then(function(response) {
	              $scope.stopSpin();
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
	                  var zoom = findZoomByAddrType(addressType);
	            	  $scope.lat = response.data.latlng.lat;       	  
	            	  $scope.lng = response.data.latlng.lng;            	  
	            	  $scope.zoom = zoom;
	            	  
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
        
        // clear the error message
        $scope.clearErrorMessage = function() {
        	$scope.errorMessage = '';
        	$scope.mapshown='';
        	
        }
        
        // clear the information message
        $scope.clearInfoMessage = function() {
        	$scope.infoMessage = '';
        	$scope.mapshown='';
        	
        }


});


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

// Directive to show Google Map
app.directive('googleMap', function($rootScope, lazyLoadApi) {

  return {
    restrict: 'CA', // restrict by class name
    scope: {
      mapId: '@id', // map ID
      lat: '@', // latitude
      long: '@', // longitude
      zoom: '@' // zoom
    },
    link: function(scope, element, attrs) {
      var location = null;
      var map = null;
      var mapOptions = null;

      // Check if latitude and longitude are specified
      if (angular.isDefined(scope.lat) && angular.isDefined(scope.long)&& angular.isDefined(scope.zoom)) {
        // Loads google map script
        lazyLoadApi.then( initializeMap )
      }
      
      // Initialize the map
      function initializeMap() {
        location = new google.maps.LatLng(scope.lat, scope.long);

        var zoom = Number(scope.zoom);
        
        mapOptions = {
          zoom: zoom,
          center: location,
          draggable:false
        };

        map = new google.maps.Map(element[0], mapOptions);

        new google.maps.Marker({
          position: location,
          map: map,
        });
      }
    }
  };
});

// Service to show google map
app.service('lazyLoadApi', function lazyLoadApi($window, $q) {
  function loadScript() {
    console.log('loadScript')
      // use global document since Angular's $document is weak
    var s = document.createElement('script')
    var googleApiKey = document.getElementById('googleApiKey').value;
    s.src = '//maps.googleapis.com/maps/api/js?key=' + googleApiKey + '&sensor=false&language=en&callback=initMap'
    document.body.appendChild(s)
  }
  var deferred = $q.defer()

  $window.initMap = function() {
    deferred.resolve()
  }

  if ($window.attachEvent) {
    $window.attachEvent('onload', loadScript)
  } else {
    $window.addEventListener('load', loadScript, false)
  }

  return deferred.promise
});

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function findZoomByAddrType(addressType) {
	var zoom = 12;
    if(!isBlank(addressType)){	  
  	  if (addressType.indexOf("premise") != -1 || addressType.indexOf("street_address") != -1 ) {
  		  zoom = 15;
  	  } else if (addressType.indexOf("locality") != -1 ) {
  		  zoom = 10; 
  	  } else if (addressType.indexOf("administrative_area_level_1") != -1 || addressType.indexOf("natural_feature") != -1  || addressType.indexOf("country") != -1 ) {
  		  zoom = 6;
  	  }
  }
    return zoom;
}


function resetForm($scope) {
	$scope.vm.origins='';
	$scope.vm.destinations='';
	$scope.vm.travelMode='';
	$scope.vm.language='';
	$scope.vm.unit='';
	$scope.vm.avoid='';
	$scope.mapshown='';
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

