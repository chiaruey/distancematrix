package my.poc.distancematrix.web.controller.domain;

import com.google.maps.model.Duration;

/**
 * This is the adapter class of Duration class from the Google Map Java Client
 * 
 * @see com.google.maps.model.Duration
 *
 */
public class DurationBean {
	
	public DurationBean(){}
	
	public DurationBean(Duration duration){
		if (duration != null) {
			this.inSeconds = String.valueOf(duration.inSeconds);
			this.humanReadable = duration.humanReadable;		
		}

	}
	
	private String inSeconds;
	
	private String humanReadable;

	public String getInSeconds() {
		return inSeconds;
	}

	public void setInSeconds(String inSeconds) {
		this.inSeconds = inSeconds;
	}

	public String getHumanReadable() {
		return humanReadable;
	}

	public void setHumanReadable(String humanReadable) {
		this.humanReadable = humanReadable;
	}
	
	

}
