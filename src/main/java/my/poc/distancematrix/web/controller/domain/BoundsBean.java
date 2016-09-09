package my.poc.distancematrix.web.controller.domain;

import com.google.maps.model.Bounds;

public class BoundsBean {

	public BoundsBean() {
	}

	public BoundsBean(Bounds bounds) {
		if (bounds != null) {
			this.northeast = new LatLngBean(bounds.northeast);
			this.southwest = new LatLngBean(bounds.southwest);
		}

	}

	private LatLngBean northeast;
	private LatLngBean southwest;
	
	public LatLngBean getNortheast() {
		return northeast;
	}

	public void setNortheast(LatLngBean northeast) {
		this.northeast = northeast;
	}

	public LatLngBean getSouthwest() {
		return southwest;
	}

	public void setSouthwest(LatLngBean southwest) {
		this.southwest = southwest;
	}
	
	
}
