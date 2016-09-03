package my.poc.distancematrix.web.controller.domain;

import com.google.maps.model.DistanceMatrixElement;
import com.google.maps.model.DistanceMatrixElementStatus;

/**
 * This is the adapter class of the DistanceMatrixElement class from the Google Maps Java Client
 * 
 * @see com.google.maps.model.DistanceMatrixElement
 *
 */
public class DistanceMatrixElementBean {
	
	public DistanceMatrixElementBean(){}
	
	public DistanceMatrixElementBean(DistanceMatrixElement distanceMatrixElement){
		if (distanceMatrixElement != null) {
			this.status = distanceMatrixElement.status;
			this.duration = new DurationBean(distanceMatrixElement.duration);
			this.durationInTraffic = new DurationBean(distanceMatrixElement.durationInTraffic);
			this.distance = new DistanceBean(distanceMatrixElement.distance);
			this.fare = new FareBean(distanceMatrixElement.fare);
		}
	}
	
	
	private DistanceMatrixElementStatus status;
	
	private DurationBean duration;
	
	private DurationBean durationInTraffic;
	
	private DistanceBean distance;
	
	private FareBean fare;

	public DistanceMatrixElementStatus getStatus() {
		return status;
	}

	public void setStatus(DistanceMatrixElementStatus status) {
		this.status = status;
	}

	public DurationBean getDuration() {
		return duration;
	}

	public void setDuration(DurationBean duration) {
		this.duration = duration;
	}

	public DurationBean getDurationInTraffic() {
		return durationInTraffic;
	}

	public void setDurationInTraffic(DurationBean durationInTraffic) {
		this.durationInTraffic = durationInTraffic;
	}

	public DistanceBean getDistance() {
		return distance;
	}

	public void setDistance(DistanceBean distance) {
		this.distance = distance;
	}

	public FareBean getFare() {
		return fare;
	}

	public void setFare(FareBean fare) {
		this.fare = fare;
	}

	

	
}
