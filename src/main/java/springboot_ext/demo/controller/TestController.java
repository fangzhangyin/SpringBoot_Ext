package springboot_ext.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import springboot_ext.demo.entity.user;

import java.util.Map;

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

    @RequestMapping("/success")
    public String success(Map<String,Object> map){//应用map将自动返回到http的相应前台（可用来传值）
        //若引用thymeleaf，则自动去templates文件夹下去寻找success.html
        map.put("hello","我是后台响应回来的值");
        return "success";
    }
}
