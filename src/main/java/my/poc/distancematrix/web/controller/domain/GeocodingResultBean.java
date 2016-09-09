package my.poc.distancematrix.web.controller.domain;


import java.util.HashSet;
import java.util.Set;

import com.google.maps.model.AddressComponent;
import com.google.maps.model.AddressType;
import com.google.maps.model.GeocodingResult;

public class GeocodingResultBean {
	
	public GeocodingResultBean() {}
	
	public GeocodingResultBean(GeocodingResult geocodingResult) {
		
		if (geocodingResult != null) {
			
			this.addressComponentsSet = new HashSet<AddressComponentBean>();
			if (geocodingResult.addressComponents != null && geocodingResult.addressComponents.length > 0) {
				for (AddressComponent component:geocodingResult.addressComponents) {
					this.addressComponentsSet.add(new AddressComponentBean(component));
				}
			}
			
			this.formattedAddress = geocodingResult.formattedAddress;
			
			this.postcodeLocalitiesSet = new HashSet<String>();
			
			if (geocodingResult.postcodeLocalities != null && geocodingResult.postcodeLocalities.length > 0) {
				for (String s: geocodingResult.postcodeLocalities) {
					this.postcodeLocalitiesSet.add(s);
				}
			}
			
			this.geometry = new GeometryBean(geocodingResult.geometry);
			
			this.typesSet = new HashSet<AddressType>();
			if (geocodingResult.types != null && geocodingResult.types.length > 0) {
				for (AddressType type: geocodingResult.types) {
					this.typesSet.add(type);
				}
			}
			
			
			this.partialMatch = geocodingResult.partialMatch;
			this.placeId = geocodingResult.placeId;		
		}
		
	}
	
	private Set<AddressComponentBean> addressComponentsSet;
	
	private String formattedAddress;
	
	private Set<String> postcodeLocalitiesSet;
	
	private GeometryBean geometry;
	
	private Set<AddressType> typesSet;
	
	private boolean partialMatch;
	
	private String placeId;

	public Set<AddressComponentBean> getAddressComponentsSet() {
		return addressComponentsSet;
	}

	public void setAddressComponentsSet(Set<AddressComponentBean> addressComponentsSet) {
		this.addressComponentsSet = addressComponentsSet;
	}

	public String getFormattedAddress() {
		return formattedAddress;
	}

	public void setFormattedAddress(String formattedAddress) {
		this.formattedAddress = formattedAddress;
	}

	public Set<String> getPostcodeLocalitiesSet() {
		return postcodeLocalitiesSet;
	}

	public void setPostcodeLocalitiesSet(Set<String> postcodeLocalitiesSet) {
		this.postcodeLocalitiesSet = postcodeLocalitiesSet;
	}

	public GeometryBean getGeometry() {
		return geometry;
	}

	public void setGeometry(GeometryBean geometry) {
		this.geometry = geometry;
	}

	public Set<AddressType> getTypesSet() {
		return typesSet;
	}

	public void setTypesSet(Set<AddressType> typesSet) {
		this.typesSet = typesSet;
	}

	public boolean isPartialMatch() {
		return partialMatch;
	}

	public void setPartialMatch(boolean partialMatch) {
		this.partialMatch = partialMatch;
	}

	public String getPlaceId() {
		return placeId;
	}

	public void setPlaceId(String placeId) {
		this.placeId = placeId;
	}
	
	
	

}
