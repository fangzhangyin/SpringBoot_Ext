package springboot_ext.demo.controller;

import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

//自定义的页面访问错误信息
@Component
public class MyErrorAttribute extends DefaultErrorAttributes {
    @Override
    public Map<String, Object> getErrorAttributes(WebRequest webRequest, boolean includeStackTrace) {
        Map<String,Object> map=super.getErrorAttributes(webRequest,includeStackTrace);
        map.put("person","这是自定义的错误信息");
        //异常处理器携带的数据
        Map<String,Object> ext= (Map<String,Object>) webRequest.getAttribute("ext",0);
        map.put("ext",ext);
        return map;
        //返回值就是页面和json能获取的所有字段
    }
}
