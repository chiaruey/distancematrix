<!DOCTYPE html>
<html lang="en">
<head>
  <title>Distance Matrix UI</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script type="text/javascript" src="${requestScope.appPath}static/angular/angular.min.js"></script>
  <script type="text/javascript" src="${requestScope.appPath}static/angular-messages/angular-messages.min.js"></script>
  <link type="text/css" rel="stylesheet" href="${requestScope.appPath}static/bootstrap/css/bootstrap.min.css" />
  <link type="text/css" rel="stylesheet" href="${requestScope.appPath}static/my/css/master.css" />
  
</head>
<body ng-app="DistanceMatrix">

<div class="container" ng-controller="GetMatrixCtrl">

  <div class="page-header">
    <h1 class="text-primary text-center">Distance Matrix Dashboard</h1>
  </div>
		
  <form class="form-horizontal" ng-submit="getMatrix()" name="distanceMatrixForm" novalidate >
    <div class="form-group required" ng-class="{'has-error': distanceMatrixForm.origins.$invalid && 
         (distanceMatrixForm.origins.$dirty)}">
      <label class="control-label col-sm-2" for="origins">Origins: </label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="origins" ng-model="vm.origins" name="origins" required placeholder="Please enter one or more locations separated by the pipe character (|)">
        <span class="help-block" 
         ng-show="distanceMatrixForm.origins.$invalid && 
         (distanceMatrixForm.origins.$dirty )">Required</span>
      </div>
    </div>
    <div class="form-group required" ng-class="{'has-error': distanceMatrixForm.destinations.$invalid && 
         (distanceMatrixForm.destinations.$dirty)}">
      <label class="control-label col-sm-2" for="destinations">Destinations:</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="destinations" ng-model="vm.destinations" name="destinations" required placeholder="Please enter one or more locations separated by the pipe character (|)">
        <span class="help-block" 
         ng-show="distanceMatrixForm.destinations.$invalid && 
         (distanceMatrixForm.destinations.$dirty)">Required</span>
      </div>
    </div>
    <div class="form-group">
      <label class="control-label col-sm-2" for="travelMode">Travel Mode:</label>
      <div class="col-sm-10">
          <select class="form-control" ng-model="vm.travelMode" name="travelMode">
		    <option ng-repeat="mode in vm.travelModes" value="{{mode.code}}">{{mode.desc}}</option>
		  </select>
      </div>
    </div>
    <div class="form-group">
      <label class="control-label col-sm-2" for="language">Language:</label>
      <div class="col-sm-10">
         <select class="form-control" ng-model="vm.language" name="language">
		    <option ng-repeat="language in vm.languages" value="{{language.code}}">{{language.desc}}</option>
		  </select>
      </div>
    </div>  
    <div class="form-group">
      <label class="control-label col-sm-2" for="unit">Unit:</label>
      <div class="col-sm-10">
         <select class="form-control" ng-model="vm.unit" name="unit">
		    <option ng-repeat="unit in vm.units" value="{{unit.code}}">{{unit.desc}}</option>
		  </select>
      </div>
    </div>  
    <div class="form-group">
      <label class="control-label col-sm-2" for="avoid">Avoid:</label>
      <div class="col-sm-10">
         <select class="form-control" ng-model="vm.avoid" name="avoid">
		    <option ng-repeat="avoid in vm.avoids" value="{{avoid.code}}">{{avoid.desc}}</option>
		  </select>
      </div>
    </div>                  
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary" ng-disabled="distanceMatrixForm.origins.$invalid||distanceMatrixForm.destinations.$invalid">Submit</button>
      </div>
    </div>
    <input type="hidden" ng-model="vm.appPath" value="${requestScope.appPath}" ng-init="vm.appPath='${requestScope.appPath}'"/>
  </form>
    
 <!-- *************************************** -->

	<div ng-show="vm.matrix.distanceMatrixItems.length > 0 " >
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

