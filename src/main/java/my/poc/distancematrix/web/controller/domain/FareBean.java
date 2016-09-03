package my.poc.distancematrix.web.controller.domain;

import com.google.maps.model.Fare;

/**
 * This is the adapter class of Fare class from the Google Map Java Client
 * 
 * @see com.google.maps.model.Fare
 *
 */
public class FareBean {
	public FareBean(){}
	
	public FareBean(Fare fare){
		if (fare != null) {
			if (fare.value != null) {
				this.value = fare.value.toPlainString();
			}
			
			if (fare.currency != null) {
				this.currencyCode = fare.currency.getCurrencyCode();
			}
		}
	}

	private String currencyCode;
	
	private String value;

	public String getCurrencyCode() {
		return currencyCode;
	}

	public void setCurrencyCode(String currencyCode) {
		this.currencyCode = currencyCode;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	};
	
	
	

}
