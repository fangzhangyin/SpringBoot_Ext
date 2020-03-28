package springboot_ext.demo.Myconfiguration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.LocaleResolver;
import springboot_ext.demo.Mytools.MyLocalResolver;
import springboot_ext.demo.entity.user;

//指明当前类为一个配置类，来代替Spring的配置文件
@Configuration
public class MyAppConfig {

    //将方法的返回值注入到bean中，默认id就是该方法名
    @Bean
    public user myuser(){
        System.out.println("往容器中存放组件");
        return new user();
    }

    //将自己的国家加入配置容器
    @Bean
    public LocaleResolver localeResolver(){
        return new MyLocalResolver();
    }
}
