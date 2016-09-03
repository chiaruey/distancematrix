package my.poc.distancematrix.web.controller.domain;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.StringUtils;

import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.DistanceMatrixRow;

/**
 * This is the response class of the REST call  which invoking Google Map Distance Matrix API
 * 
 * @see my.poc.distancematrix.web.controller.DistanceMatrixController
 *
 */
public class DistanceMatrixResponse {
	
	public DistanceMatrixResponse(){}
	
	public DistanceMatrixResponse(DistanceMatrix distanceMatrix, Set<ParameterType> queryParams){
		this.queryParams = queryParams;
		validRowNames = new HashSet<String>();
		distanceMatrixItems = new ArrayList<DistanceMatrixItem>();
		
		LinkedList<DistanceMatrixElementBean> elemenets = new LinkedList<DistanceMatrixElementBean>();
		for (int i=0; i<distanceMatrix.rows.length; i++) {
			
			DistanceMatrixRow row = distanceMatrix.rows[i];
			
			for (int j=0; j<row.elements.length; j++) {
				elemenets.add(new DistanceMatrixElementBean(row.elements[j]));
			}
		}

		Iterator<DistanceMatrixElementBean> elementsIterator = elemenets.iterator();
		
		if (distanceMatrix != null) {
			
			for (int i=0; i< distanceMatrix.originAddresses.length; i++) {
				
				for (int j=0; j<distanceMatrix.destinationAddresses.length; j++) {
					
					DistanceMatrixItem item = new DistanceMatrixItem();
					item.setOrigin(distanceMatrix.originAddresses[i]);	
					item.setDestination(distanceMatrix.destinationAddresses[j]);
					item.setDistanceMatrixElement(elementsIterator.next());	
					
					if (StringUtils.isNotBlank(item.getDistanceMatrixElement().getDuration().getHumanReadable())) {
						validRowNames.add("duration");
					}
					
					if (StringUtils.isNotBlank(item.getDistanceMatrixElement().getDurationInTraffic().getHumanReadable())) {
						validRowNames.add("durationInTraffic");
					}
					
					if (StringUtils.isNotBlank(item.getDistanceMatrixElement().getDistance().getHumanReadable())) {
						validRowNames.add("distance");
					}
					
					if (StringUtils.isNotBlank(item.getDistanceMatrixElement().getFare().getValue())) {
						validRowNames.add("fare");
					}
					
					distanceMatrixItems.add(item);
				}
			}
			
		}
	}
	
	
	private List<DistanceMatrixItem> distanceMatrixItems;
	
	private Set<ParameterType> queryParams;
	
	/* valid row names with data to be populated on the UI */
	private Set<String> validRowNames;

	public List<DistanceMatrixItem> getDistanceMatrixItems() {
		return distanceMatrixItems;
	}

	public void setDistanceMatrixItems(List<DistanceMatrixItem> distanceMatrixItems) {
		this.distanceMatrixItems = distanceMatrixItems;
	}

	public Set<String> getValidRowNames() {
		return validRowNames;
	}

	public void setValidRowNames(Set<String> validRowNames) {
		this.validRowNames = validRowNames;
	}

	public Set<ParameterType> getQueryParams() {
		return queryParams;
	}

	public void setQueryParams(Set<ParameterType> queryParams) {
		this.queryParams = queryParams;
	}

	
}
