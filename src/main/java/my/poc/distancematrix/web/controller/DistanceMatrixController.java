package my.poc.distancematrix.web.controller;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.StringTokenizer;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.TravelMode;

import my.poc.distancematrix.client.googlemap.DistanceMatrixClient;
import my.poc.distancematrix.client.googlemap.GeocodingClient;
import my.poc.distancematrix.web.controller.domain.DistanceMatrixResponse;
import my.poc.distancematrix.web.controller.domain.GeocodingResponse;
import my.poc.distancematrix.web.controller.domain.GeocodingResultBean;
import my.poc.distancematrix.web.controller.domain.ParameterType;

/**
 * This controller is for invoke Google Distance Matrix API 
 */
@Controller
public class DistanceMatrixController {
	
	@Autowired
	private DistanceMatrixClient distanceMatrixClient;
	
	@Autowired
	private GeocodingClient geocodingClient;
	
	@RequestMapping(value = "/getmatrix", method = GET, produces="application/json")
	public @ResponseBody DistanceMatrixResponse getMatrix(
			@RequestParam(value = "origins") String origins,
			@RequestParam(value = "destinations") String destinations, 
			@RequestParam(value = "mode", required = false) String mode,
			@RequestParam(value = "language", required = false) String language,
			@RequestParam(value = "unit", required = false) String unit,
			@RequestParam(value = "avoid", required = false) String avoid) throws Exception {

		String[] originArray = toStringArray(origins, "|");
		String[] destinationArray = toStringArray(destinations, "|");
		TravelMode travelMode = null;
		
		if (StringUtils.isNotBlank(mode)) {
			travelMode = TravelMode.valueOf(mode.toUpperCase());
		}
		
		Set<ParameterType> queryParams = new HashSet<ParameterType>();
		if (StringUtils.isNotBlank(origins)) queryParams.add(new ParameterType("origins" , origins));
		if (StringUtils.isNotBlank(destinations)) queryParams.add(new ParameterType("destinations" , destinations));
		if (StringUtils.isNotBlank(mode)) queryParams.add(new ParameterType("mode" , mode));
		if (StringUtils.isNotBlank(language)) queryParams.add(new ParameterType("language" , language));
		if (StringUtils.isNotBlank(unit)) queryParams.add(new ParameterType("unit" , unit));
		if (StringUtils.isNotBlank(avoid)) queryParams.add(new ParameterType("avoid" , avoid));
		
		DistanceMatrix  distanceMatrix = distanceMatrixClient.getDitanceMatrix(originArray, destinationArray, travelMode, language, unit, avoid);
		
		DistanceMatrixResponse response =  new DistanceMatrixResponse(distanceMatrix, queryParams);
		
		return response;
	}
	
	/**
	 * Check if the input address is valid
	 */
	@RequestMapping(value = "/isvalid", method = GET, produces="application/json")
	public @ResponseBody Boolean isValid(
			@RequestParam(value = "address") String address) throws Exception {

		return geocodingClient.isValidAddress(address);
	}

	/**
	 * Get the Geocoding application of the input address
	 */
	@RequestMapping(value = "/geocoding", method = GET, produces="application/json")
	public @ResponseBody GeocodingResponse getGeocodingResult(
			@RequestParam(value = "address") String address) throws Exception {

		Set<GeocodingResultBean> result = geocodingClient.getGeocodingResult(address);
		GeocodingResponse response = new GeocodingResponse(result); 	
		return response;
	}

	
	private String[] toStringArray(String source, String delimiter) {
		List<String> list = new ArrayList<String>();
		StringTokenizer stk = new StringTokenizer(source, delimiter);
		while (stk.hasMoreTokens()) {
			list.add(stk.nextToken());
		}
		
		String[] result = new String[list.size()];
		result = list.toArray(result);
		
		return result;
	}


}