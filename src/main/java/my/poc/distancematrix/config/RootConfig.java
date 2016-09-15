package my.poc.distancematrix.config;

import java.util.HashMap;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.core.env.Environment;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import com.google.maps.GeoApiContext;


/**
 * This class is used by JavaConfig as a source of bean definitions
 *
 */
@Configuration
@ComponentScan(basePackages={"my.poc.distancematrix"},
	excludeFilters={
	@Filter(type=FilterType.ANNOTATION, value=EnableWebMvc.class)
	})
@PropertySource(value = { "classpath:application.properties" })
public class RootConfig {
	
	@Autowired
	private Environment env;
	
	private static final String GOOGLE_API_KEY = "google_api_key";
		
	@Bean
	public GeoApiContext getGeoApiContext() {
		final String apiKey = env.getProperty(GOOGLE_API_KEY);
		GeoApiContext context =  new GeoApiContext()
	    		.setApiKey(apiKey)
	            .setConnectTimeout(1, TimeUnit.SECONDS)
	            .setReadTimeout(1, TimeUnit.SECONDS)
	            .setWriteTimeout(1, TimeUnit.SECONDS);
		return context;
	}
	
	@Bean
	public HashMap<String, String> properties() {
		HashMap<String, String> properties = new HashMap<String, String>();
		
		properties.put(GOOGLE_API_KEY, env.getProperty(GOOGLE_API_KEY));
		return properties;
	}

}
