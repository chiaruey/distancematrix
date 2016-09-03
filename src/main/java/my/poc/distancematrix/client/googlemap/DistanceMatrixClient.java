package my.poc.distancematrix.client.googlemap;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.google.maps.DirectionsApi.RouteRestriction;
import com.google.maps.DistanceMatrixApi;
import com.google.maps.DistanceMatrixApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.TravelMode;
import com.google.maps.model.Unit;

/**
 * This is the client for invoking Google DistanceMatrix API
 */
@Component
public class DistanceMatrixClient {
	
	@Autowired
	private GeoApiContext context;
	  
	public DistanceMatrixClient() {
	}

	/**
	 * avoid=tolls, highways, ferries, indoor
	 * 
	 * units=metric (default) , imperial 
	 * @throws Exception
	 */
	public DistanceMatrix getDitanceMatrix(String[] origins, String[] destinations, TravelMode travelMode, 
			String language, String unit, String avoid) throws Exception {

		DistanceMatrixApiRequest request = DistanceMatrixApi.newRequest(context);
		request = request
	            .origins(origins)//()
	            .destinations(destinations);
		
	    if (travelMode != null ) {
	    	request = request.mode(travelMode);
	    }
	    
	    if (StringUtils.isNotBlank(language)) {
	    	request = request.language(language);
	    }
	    
	    if (StringUtils.isNotBlank(unit)) {
	    	Unit unitEnum = Unit.valueOf(unit.toUpperCase());
	    	if (unitEnum!= null) {
	    		request = request.units(unitEnum);
	    	}
	    }
	    
	    if (StringUtils.isNotBlank(avoid)) {
	    	RouteRestriction routeRestriction  = RouteRestriction.valueOf(avoid.trim().toUpperCase());
	    	if (routeRestriction != null) {
	    		request = request.avoid(routeRestriction);
	    	}
	    }
	           
	            
		DistanceMatrix matrix = request.await();
	    return matrix;
	}

}
