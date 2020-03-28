package springboot_ext.demo.Myconfiguration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;
import springboot_ext.demo.Mytools.LendinHandlerInterseptor;

//使用WebMvcConfigurerAdapter可以来扩展springmvc的功能
//既保留springboot的自动配置，也扩展了我们的配置
@Configuration
//若配置EnableWebMvc则全面接管springmvc的自动配置，所有的都需要自己设置，会导致所有的自动配置失效例如静态资源无法访问
//@EnableWebMvc
public class config extends WebMvcConfigurerAdapter {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        //浏览器发送/self请求也来到success.html页面
        registry.addViewController("/self").setViewName("success");
    }

    @Bean
    public WebMvcConfigurerAdapter webMvcConfigurerAdapter(){
        WebMvcConfigurerAdapter webMvcConfigurerAdapter=new WebMvcConfigurerAdapter() {
            @Override
            public void addViewControllers(ViewControllerRegistry registry) {
                //重定向的设置
                registry.addViewController("/lendok.html").setViewName("lendsuccess");
            }

//            //登录的拦截器
//            @Override
//            public void addInterceptors(InterceptorRegistry registry) {
//                //springboot已经做好了静态资源的映射，不需要在拦截器中设置
//                registry.addInterceptor(new LendinHandlerInterseptor()).addPathPatterns("/**")//拦截任意请求
//                .excludePathPatterns("/","/lend","/lendin")//拦截除了这些以外的请求
//                ;
//            }
        };
        return webMvcConfigurerAdapter;
    }



}
