<!DOCTYPE html>
<html lang="en">
<head>
  <title>Distance Matrix UI</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script type="text/javascript" src="${requestScope.appPath}static/angular/angular.min.js"></script>
  <script type="text/javascript" src="${requestScope.appPath}static/angular-messages/angular-messages.min.js"></script>
  <script type="text/javascript" src="${requestScope.appPath}static/angular-aria/angular-aria.min.js"></script> 
  <script type="text/javascript" src="${requestScope.appPath}static/angular-animate/angular-animate.min.js"></script> 
  <script type="text/javascript" src="${requestScope.appPath}static/angular-material/angular-material.min.js"></script> 
  <script type="text/javascript" src="${requestScope.appPath}static/spinner-js/version/js/spin.js"></script>
  <script type="text/javascript" src="${requestScope.appPath}static/angular-spinner/0.8.1/js/angular-spinner.js"></script> 
  <link type="text/css" rel="stylesheet" href="${requestScope.appPath}static/bootstrap/css/bootstrap.min.css" />
  <link type="text/css" rel="stylesheet" href="${requestScope.appPath}static/angular-material/angular-material.min.css" />
  <link type="text/css" rel="stylesheet" href="${requestScope.appPath}static/my/css/master.css" />
</head>
<body ng-app="DistanceMatrix" >

<div class="container" ng-controller="GetMatrixCtrl">

  <div class="page-header">
    <h1 class="text-primary text-center">Distance Matrix Dashboard</h1>
    <!-- Spinner while backend processing -->
	<span us-spinner="{radius:100, width:24, length: 32, position:'fixed'}"  spinner-key="spinner-1"></span>
  </div>
  
<!--   <div ng-if="status" id="status" class="form-messages">
    <b layout="row" layout-align="center center" class="md-padding">
      {{status}}
    </b>
  </div>  -->
  
  <div ng-if="infoMessage" class="alert alert-info"><span class="glyphicon glyphicon-info-sign"></span>
  <a href="#" class="close" ng-click="clearInfoMessage()" aria-label="close">&times;</a>
  {{infoMessage}}
  <div ng-if="!responseshown">
  	<a ng-if="!mapshown" href="#" ng-click="showMap()" >Show Map</a><a ng-if="mapshown" href="#" ng-click="hideMap()" >Hide Map</a>
  </div>
  </div> 	
    

  <div ng-if="errorMessage" class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span>
  <a href="#" class="close" ng-click="clearErrorMessage()" aria-label="close">&times;</a>
 {{errorMessage}}
  </div>
  <div ng-if="mapshown"  id="map-container" class="google-map" lat="{{lat}}" long="{{lng}}" zoom={{zoom}}></div>
  	
  <form class="form-horizontal"  name="distanceMatrixForm" novalidate >
    <div class="form-group required" ng-class="{'has-error': distanceMatrixForm.origins.$invalid && 
         (distanceMatrixForm.origins.$dirty)}">
      <label class="control-label col-sm-2" for="origins">Origins:</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" id="origins" disabled ng-model="vm.origins" name="origins" required placeholder="Please use the add button to add an origin (max:25)">
        <span class="help-block" 
         ng-show="distanceMatrixForm.origins.$invalid && 
         (distanceMatrixForm.origins.$dirty )">Required</span>
      </div>
      <div class="col-sm-1">
      	<button ng-click="showOriginPrompt($event)" class="btn btn-info btn-block">Add</button>
      </div>
    </div>
    <div class="form-group required" ng-class="{'has-error': distanceMatrixForm.destinations.$invalid && 
         (distanceMatrixForm.destinations.$dirty)}">
      <label class="control-label col-sm-2" for="destinations">Destinations:</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" id="destinations" disabled ng-model="vm.destinations" name="destinations" required placeholder="Please use the add button to add a destination (max:25)">
        <span class="help-block" 
         ng-show="distanceMatrixForm.destinations.$invalid && 
         (distanceMatrixForm.destinations.$dirty)">Required</span>
      </div>
      <div class="col-sm-1">
      	<button ng-click="showDestinationPrompt($event)" class="btn btn-info btn-block">Add</button>
      </div>      
    </div>
    <div class="form-group">
      <label class="control-label col-sm-2" for="travelMode">Travel Mode:</label>
      <div class="col-sm-8">
          <select class="form-control" ng-model="vm.travelMode" name="travelMode">
		    <option ng-repeat="mode in vm.travelModes" value="{{mode.code}}">{{mode.desc}}</option>
		  </select>
      </div>
    </div>
    <div class="form-group">
      <label class="control-label col-sm-2" for="language">Language:</label>
      <div class="col-sm-8">
         <select class="form-control" ng-model="vm.language" name="language">
		    <option ng-repeat="language in vm.languages" value="{{language.code}}">{{language.desc}}</option>
		  </select>
      </div>
    </div>  
    <div class="form-group">
      <label class="control-label col-sm-2" for="unit">Unit:</label>
      <div class="col-sm-8">
         <select class="form-control" ng-model="vm.unit" name="unit">
		    <option ng-repeat="unit in vm.units" value="{{unit.code}}">{{unit.desc}}</option>
		  </select>
      </div>
    </div>  
    <div class="form-group">
      <label class="control-label col-sm-2" for="avoid">Avoid:</label>
      <div class="col-sm-8">
         <select class="form-control" ng-model="vm.avoid" name="avoid">
		    <option ng-repeat="avoid in vm.avoids" value="{{avoid.code}}">{{avoid.desc}}</option>
		  </select>
      </div>
    </div>                  
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-8">
        <button ng-click="getMatrix()" class="btn btn-primary" ng-disabled="distanceMatrixForm.origins.$invalid||distanceMatrixForm.destinations.$invalid">Submit</button>

      </div>
    </div>
    
    <input type="hidden" id="appPath" value="${requestScope.appPath}" />
    <input type="hidden" id="googleApiKey" value="${requestScope.google_api_key}" />

  </form>
    
 <!-- *************************************** -->

	<div ng-if="responseshown" >
	  <hr />
      <h2 class="text-primary text-center">Distance Matrix Response</h2>
	  <h4 class="text-primary">Used Query Parameters</h4>
	  <table class="table table-bordered table-responsive">
	    <thead>
	      <tr>
	        <th>parameter Name</th>
	        <th>Parameter value</th>
	      </tr>
	    </thead>
	    <tbody>	    	
	      <tr ng-repeat="queryParam in vm.matrix.queryParams">
	        <td>{{queryParam.name}}</td>
	        <td>{{queryParam.value}}</td>       
	      </tr>
	    </tbody>
	  </table>

	  <br />
	  <h4 class="text-primary">Server Response</h4>
	  
	  <table class="table table-bordered table-responsive">
	    <thead>
	      <tr>
	        <th>Origin</th>
	        <th>Destination</th>
	        <th ng-if="vm.matrix.validRowNames.indexOf('duration') >=0 ">Duration (seconds)</th>
	        <th ng-if="vm.matrix.validRowNames.indexOf('duration') >=0 ">Duration</th>
	        <th ng-if="vm.matrix.validRowNames.indexOf('distance') >=0 ">Distance (meters)</th>
	        <th ng-if="vm.matrix.validRowNames.indexOf('distance') >=0 ">Distance</th>	        
	      </tr>
	    </thead>
	    <tbody>
	    	
	      <tr ng-repeat="item in vm.matrix.distanceMatrixItems">
	        <td>{{item.origin}}</td>
	        <td>{{item.destination}}</td>
	        <td>{{item.distanceMatrixElement.duration.inSeconds}}</td>
	        <td>{{item.distanceMatrixElement.duration.humanReadable}}</td>
	        <td>{{item.distanceMatrixElement.distance.inMeters}}</td>
	        <td>{{item.distanceMatrixElement.distance.humanReadable}}</td>	        
	      </tr>
	    </tbody>
	  </table>
	</div>   

 <!-- *************************************** -->

</div>

 <script type="text/javascript" src="${requestScope.appPath}static/my/js/my.distancematrix.js"></script>

 

</body>
</html>

