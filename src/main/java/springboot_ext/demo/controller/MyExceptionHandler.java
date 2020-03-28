package springboot_ext.demo.controller;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.HashMap;
import java.util.Map;

//页面响应异常配置(主要是设置错误的返回jason数据针对非浏览器的访问出错错误返回)
@ControllerAdvice
public class MyExceptionHandler {

    //下面的配置导致无论是浏览器和其他访问都会返回jason数据
//    @ResponseBody
//    @ExceptionHandler(UserPrincipalNotFoundException.class)
//    public Map<String, Object> handlerexcept(Exception e){
//        Map<String,Object> map=new HashMap<>();
//        map.put("code","notexist");
//        map.put("message",e.getMessage());
//        return map;
//    }

    @ExceptionHandler(UserPrincipalNotFoundException.class)
    public String handler(Exception e, HttpServletRequest request){
        Map<String,Object> map=new HashMap<>();
        //传入自己的状态码
        request.setAttribute("javax.servlet.error.status_code",500);
        map.put("code","notexist");
        map.put("message",e.getMessage());
        request.setAttribute("ext",map);
        //转发到/error文件夹中
        return "forward:/error";
    }
}
