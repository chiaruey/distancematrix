package my.poc.distancematrix.web.controller.domain;

import com.google.maps.model.Distance;

/**
 * This is an Adapter class for the Distance class from the Google Maps Java Client
 * 
 * @see com.google.maps.model.Distance
 *
 */
public class DistanceBean {
	
	public DistanceBean(){}
	

	public DistanceBean(Distance distance){
		
		if (distance != null) {
			this.inMeters = distance.inMeters;
			this.humanReadable = distance.humanReadable;
		}

	}
	
	private long inMeters;
	
	private String humanReadable;

	public long getInMeters() {
		return inMeters;
	}


	public void setInMeters(long inMeters) {
		this.inMeters = inMeters;
	}


	public String getHumanReadable() {
		return humanReadable;
	}


	public void setHumanReadable(String humanReadable) {
		this.humanReadable = humanReadable;
	}
	
	
}
