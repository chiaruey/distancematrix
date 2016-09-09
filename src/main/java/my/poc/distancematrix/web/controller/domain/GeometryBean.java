package my.poc.distancematrix.web.controller.domain;

import com.google.maps.model.Geometry;

import com.google.maps.model.LocationType;

public class GeometryBean {
	
	public GeometryBean(){}
	
	public GeometryBean(Geometry geometry) {
		if (geometry != null) {
			this.bounds = new BoundsBean(geometry.bounds);
			this.location = new LatLngBean(geometry.location);
			this.locationType = geometry.locationType;
			this.viewport = new BoundsBean(geometry.viewport);
		}
	}
	
	private BoundsBean bounds;
	
	private LatLngBean location;
	
	private LocationType locationType;
	
	private BoundsBean viewport;

	public BoundsBean getBounds() {
		return bounds;
	}

	public void setBounds(BoundsBean bounds) {
		this.bounds = bounds;
	}

	public LatLngBean getLocation() {
		return location;
	}

	public void setLocation(LatLngBean location) {
		this.location = location;
	}

	public LocationType getLocationType() {
		return locationType;
	}

	public void setLocationType(LocationType locationType) {
		this.locationType = locationType;
	}

	public BoundsBean getViewport() {
		return viewport;
	}

	public void setViewport(BoundsBean viewport) {
		this.viewport = viewport;
	}
	
	

}
