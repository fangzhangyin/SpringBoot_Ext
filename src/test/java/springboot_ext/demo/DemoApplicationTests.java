package springboot_ext.demo;

import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import springboot_ext.demo.DAO.PeopleDAO;
import springboot_ext.demo.DAO.peopleSql;
import springboot_ext.demo.entity.people;
import springboot_ext.demo.entity.user;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;


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

    @Autowired
    PeopleDAO peopleDAO;
    @Test
    void jap(){
        peopleSql peopleSql=new peopleSql(peopleDAO);
        people people=peopleSql.findByID(1);
        System.out.println(people.getName());
//        people=peopleSql.findByID(7);
//        people.setName("fzy");
//        people p1=peopleSql.save(people);
//        System.out.println(p1.getName());
        List<people>list=peopleSql.findByname("fzy");
        int s=0;
        while(s<list.size()){
            System.out.println(list.get(s).getId());
            s++;
        }
    }

    @Test
    public void excel() throws IOException {
        // 创建工作薄 xlsx
        XSSFWorkbook xssWorkbook = new XSSFWorkbook();
        // 创建工作表
        XSSFSheet sheet = xssWorkbook.createSheet("sheet1");

        for (int row = 0; row < 6; row++)
        {
            XSSFRow rows = sheet.createRow(row);
            for (int col = 0; col < 10; col++)
            {
                // 向工作表中添加数据
                rows.createCell(col).setCellValue("data" + row + col);
            }
        }
//
        File xlsFile = new File("E:/JT/poi.xlsx");
        FileOutputStream xlsStream = new FileOutputStream(xlsFile);
        xssWorkbook.write(xlsStream);
    }

}
