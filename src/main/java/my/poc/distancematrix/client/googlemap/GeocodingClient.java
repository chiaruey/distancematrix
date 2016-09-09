package my.poc.distancematrix.client.googlemap;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.GeocodingApiRequest;
import com.google.maps.model.GeocodingResult;

import my.poc.distancematrix.web.controller.domain.GeocodingResultBean;

@Component
public class GeocodingClient {
	
	@Autowired
	private GeoApiContext context;
	
	public GeocodingClient(){}
	
	public static void main(String[] address) throws Exception {
		String address1 = "394";
		
		GeocodingClient client = new GeocodingClient();
		
		System.out.println(address1 + " is valid address : ? " + client.isValidAddress(address1));
	}
	
	/**
	 * Return true if the input address can be recognized by google API
	 */
	public boolean isValidAddress(String address) throws Exception {
		GeocodingApiRequest request = GeocodingApi.newRequest(context);
		
		request = request.address(address);
		
		GeocodingResult[] response = request.await();
		
		if (response != null && response.length > 0) {
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * Return response by invoking the Google Geocoding API
	 */
	public Set<GeocodingResultBean> getGeocodingResult(String address) throws Exception {
		GeocodingApiRequest request = GeocodingApi.newRequest(context);		
		request = request.address(address);
		GeocodingResult[] response = request.await();
		
		Set<GeocodingResultBean> geocodingResultSet = new HashSet<GeocodingResultBean> ();
		
		if (response != null && response.length > 0) {
			for (GeocodingResult result: response) {
				geocodingResultSet.add(new GeocodingResultBean(result));
			}
		}
		
		return geocodingResultSet;
	}
	
	

}
