package my.poc.distancematrix.web.interceptor;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class MainInterceptor extends HandlerInterceptorAdapter {

	private static final String APP_PATH = "appPath";
	
	private static final String GOOGLE_API_KEY = "google_api_key";
	
	@Autowired
	private HashMap<String, String> properties;

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {

		return true;
	}

	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			final ModelAndView modelAndView) throws Exception {

		String appPath = request.getContextPath() + "/";
		request.setAttribute(APP_PATH,  appPath);
		String googleApiKey = properties.get(GOOGLE_API_KEY);
		request.setAttribute(GOOGLE_API_KEY,  googleApiKey);
	}

}
