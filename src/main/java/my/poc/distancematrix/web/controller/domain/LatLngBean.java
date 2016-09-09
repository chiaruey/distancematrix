package my.poc.distancematrix.web.controller.domain;

import com.google.maps.model.LatLng;

public class LatLngBean {

	public LatLngBean() {
	}

	public LatLngBean(LatLng latLng) {
		if (latLng != null) {
			this.lat = latLng.lat;
			this.lng = latLng.lng;
		}
	}

	/**
	 * The latitude of this location.
	 */
	private double lat;

	/**
	 * The longitude of this location.
	 */
	private double lng;

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public double getLng() {
		return lng;
	}

	public void setLng(double lng) {
		this.lng = lng;
	}
	
	

}
