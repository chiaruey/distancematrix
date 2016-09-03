package my.poc.distancematrix.web.controller.domain;

/**
 * This class is for populating a single response from the Google Distance Matrix API
 */
public class DistanceMatrixItem {
	
	private String origin;
	
	private String destination;
	
	private DistanceMatrixElementBean distanceMatrixElement;

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public DistanceMatrixElementBean getDistanceMatrixElement() {
		return distanceMatrixElement;
	}

	public void setDistanceMatrixElement(DistanceMatrixElementBean distanceMatrixElement) {
		this.distanceMatrixElement = distanceMatrixElement;
	}

	
	

}
