package my.poc.distancematrix.web.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class MainInterceptor extends HandlerInterceptorAdapter {

	public static final String APP_PATH = "appPath";

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
		
	}

}
