package my.poc.distancematrix.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import static org.springframework.web.bind.annotation.RequestMethod.*;

/**
 * This controller is for showing up the home page
 *
 */
@Controller
public class HomeController {
	@RequestMapping(value = "/", method = GET)
	public String home() {
		return "distancematrix";
	}
}