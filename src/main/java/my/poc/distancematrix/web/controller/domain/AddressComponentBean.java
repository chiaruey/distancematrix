package my.poc.distancematrix.web.controller.domain;

import java.util.HashSet;
import java.util.Set;

import com.google.maps.model.AddressComponent;
import com.google.maps.model.AddressComponentType;

/**
 * This is the Wrapper class of the Google API's AddressComponent class
 */
public class AddressComponentBean {
	
	public AddressComponentBean(){}
	
	public AddressComponentBean(AddressComponent addressComponent) {
		if (addressComponent != null) {
			this.longName = addressComponent.longName;
			this.shortName = addressComponent.shortName;
			
			addressComponentTypeSet = new HashSet<AddressComponentType>();
			
			if (addressComponent.types != null && addressComponent.types.length > 0) {
				
				for (AddressComponentType type:addressComponent.types) {
					addressComponentTypeSet.add(type);
				}
			}
		}
	}
	
	private String longName;
	
	private String shortName;
	
	private Set<AddressComponentType> addressComponentTypeSet;

	public String getLongName() {
		return longName;
	}

	public void setLongName(String longName) {
		this.longName = longName;
	}

	public String getShortName() {
		return shortName;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
	}

	public Set<AddressComponentType> getAddressComponentTypeSet() {
		return addressComponentTypeSet;
	}

	public void setAddressComponentTypeSet(Set<AddressComponentType> addressComponentTypeSet) {
		this.addressComponentTypeSet = addressComponentTypeSet;
	}
	
	
	

}
