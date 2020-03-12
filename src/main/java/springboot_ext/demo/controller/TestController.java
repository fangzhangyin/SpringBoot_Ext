package springboot_ext.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import springboot_ext.demo.entity.user;

@Controller
public class TestController {

    @Autowired
    user user;

    @RequestMapping("/hello")
    @ResponseBody
    public String hello(){
        return "hello!";
    }

    @RequestMapping("/user")
    @ResponseBody
    public String user(){
        return user.getUsername();
    }
}
