package springboot_ext.demo;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import springboot_ext.demo.entity.user;


@SpringBootTest
class DemoApplicationTests {

    @Autowired
    springboot_ext.demo.entity.user user;
    @Autowired
    ApplicationContext ioc;

    @Test
    void contextLoads() {
    }

    @Test
    void t1(){
        user u= (springboot_ext.demo.entity.user) ioc.getBean("myuser");
        System.out.println(u.getUsername());
        System.out.println(u.getId());
        System.out.println(u.getDog().getName());
        System.out.println(u.getDog().getAge());
    }

    //日志记录器
    Logger logger= LoggerFactory.getLogger(getClass());

    @Test
    void test(){
        //日志的级别由低到高（trace>debug>info>warn>error）
        //调整日志的级别，日志只会在这个级别以及更高的级别生效
        //Springboot默认使用info的级别（可以通过配置文件配置级别）
        logger.trace("这是跟踪日志");
        logger.debug("这是debug日志");
        logger.info("这是info日志");
        logger.warn("这是警告日志");
        logger.error("这是错误日志");

    }

}
