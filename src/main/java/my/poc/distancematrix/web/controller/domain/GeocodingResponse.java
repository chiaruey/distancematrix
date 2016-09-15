package my.poc.distancematrix.web.controller.domain;

import java.util.Iterator;
import java.util.Set;

import com.google.maps.model.AddressType;

public class GeocodingResponse {
	
	public GeocodingResponse() {}
	
	public GeocodingResponse(Set<GeocodingResultBean> geocodingResultSet) {
		this.geocodingResultSet = geocodingResultSet;
		
		if (geocodingResultSet != null) {
			
			// For the purpose of distance matrix, one address should only have one response
			valid = geocodingResultSet.size() == 1;
			this.resultCount = geocodingResultSet.size();
			if (valid) {
				GeocodingResultBean geocodingResult = geocodingResultSet.iterator().next();
				
				this.formattedAddress = geocodingResult.getFormattedAddress();
				if (geocodingResult.getGeometry() != null && geocodingResult.getGeometry().getLocation() != null) {
					LatLngBean latlng = geocodingResult.getGeometry().getLocation();
					this.latlng = latlng;
				}
				
				if (geocodingResult.getTypesSet() != null && geocodingResult.getTypesSet().size() > 0) {
					StringBuffer sbType = new StringBuffer();
					
					Iterator<AddressType> itr = geocodingResult.getTypesSet().iterator();
					for (int i=0; i<geocodingResult.getTypesSet().size(); i++ ) {
						if (i > 0) {
							sbType.append(", ");
						}
						sbType.append(itr.next());
					}
					this.addressType = sbType.toString();					
				}
			}
		}
	}
	
	private Set<GeocodingResultBean> geocodingResultSet;

	private boolean valid;
	
	private int resultCount;
	
	private String formattedAddress;
	
	private String addressType;
	
	private LatLngBean latlng;
	
	public Set<GeocodingResultBean> getGeocodingResultSet() {
		return geocodingResultSet;
	}

	public void setGeocodingResultSet(Set<GeocodingResultBean> geocodingResultSet) {
		this.geocodingResultSet = geocodingResultSet;
	}

	public boolean isValid() {
		return valid;
	}

	public void setValid(boolean valid) {
		this.valid = valid;
	}

	public int getResultCount() {
		return resultCount;
	}

	public void setResultCount(int resultCount) {
		this.resultCount = resultCount;
	}

	public String getFormattedAddress() {
		return formattedAddress;
	}

	public void setFormattedAddress(String formattedAddress) {
		this.formattedAddress = formattedAddress;
	}

	public String getAddressType() {
		return addressType;
	}

	public void setAddressType(String addressType) {
		this.addressType = addressType;
	}

	public LatLngBean getLatlng() {
		return latlng;
	}

	public void setLatlng(LatLngBean latlng) {
		this.latlng = latlng;
	}


}
