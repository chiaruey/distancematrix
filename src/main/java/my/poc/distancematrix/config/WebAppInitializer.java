package my.poc.distancematrix.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import my.poc.distancematrix.web.config.WebMvcConfig;

/**
 * This class registers a DispatcherServlet configured with annotated classes
 * 
 */
public class WebAppInitializer extends
		AbstractAnnotationConfigDispatcherServletInitializer {

	@Override
	public void onStartup(ServletContext servletContext)
			throws ServletException {
		
		super.onStartup(servletContext);
	}

	protected Class<?>[] getRootConfigClasses() {
		return new Class<?>[] { RootConfig.class };
	}

	protected Class<?>[] getServletConfigClasses() {
		return new Class[] { WebMvcConfig.class };
	}

	protected String[] getServletMappings() {
		return new String[] { "/", "*.json" };
	}

}
