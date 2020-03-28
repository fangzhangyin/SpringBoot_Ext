package springboot_ext.demo.controller.testController;

import com.alibaba.fastjson.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import springboot_ext.demo.entity.book;
import springboot_ext.demo.entity.data;
import springboot_ext.demo.entity.people;
import springboot_ext.demo.entity.user;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.net.URLEncoder;
import java.util.*;

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

    @RequestMapping("/lend")
    public String lend(){
        return "lend";
    }

    @RequestMapping("/lendin")
    public String lendin(String username, String password, Map<String,Object>map, HttpSession session) {
        if("".equals(username)||"".equals(password)){
            map.put("error","用户名或者密码不能为空");
            return "lend";
        }else if("fzy".equals(username)&&"123456".equals(password)){
            //登录成功防止重复提交，设置页面的重定向
            session.setAttribute("username","fzy");//将登陆的信息放入session，主要用于登录的拦截
            return "redirect:lendok.html";
        }else{
            map.put("error","用户名或者密码不正确");
            return "lend";
        }
    }

    @RequestMapping("/ext1")
    public String ext1(){
        return "Ext1";
    }
    @RequestMapping("/ext2")
    public String ext2(){
        return "ext2";
    }
    @RequestMapping("/ext3")
    public String ext3(){
        return "panel";
    }

    @RequestMapping("/booklist")
    @ResponseBody
    public String booklist(HttpServletRequest request){
        String bookname=request.getParameter("searchbook");
        List<book> book1=new ArrayList<book>();
        book1.add(new book("java编程思想"));
        book1.add(new book("java入门"));
        book1.add(new book("java程序设计"));
        List<book> book2=new ArrayList<book>();
        book2.add(new book("c++编程思想"));
        book2.add(new book("c++入门"));
        book2.add(new book("c++程序设计"));
        List<book> book3=new ArrayList<book>();
        book3.add(new book("php编程思想"));
        book3.add(new book("php入门"));
        book3.add(new book("php程序设计"));
        List<book> booklist=new ArrayList<book>();
        if(bookname.equals("allbook")){
            for(int i=0;i<3;i++){
                booklist.add(book1.get(i));
                booklist.add(book2.get(i));
                booklist.add(book3.get(i));
            }
        }else{
            bookname=bookname.substring(0,3);
            if(bookname.equals("jav")){
                booklist=book1;
            }else if(bookname.equals("c++")){
                    booklist=book2;
            }else if(bookname.equals("php")){
                booklist=book3;
            }else{
                booklist.add(new book("没有数据"));
            }
        }
        String books=JSON.toJSONString(booklist);
//        System.out.println(books);
        return books;
    }

    @RequestMapping("/test1")
    @ResponseBody
    public String test(HttpServletRequest request){
        String name=request.getParameter("username");
        System.out.println(name);
        return "sss";
    }

    @RequestMapping("/event")
    public String event(){
        return "event";
    }

    @RequestMapping("/work1")
    public String work1(){
        return "ExtWork1";
    }

    @RequestMapping("/admin")
    public String admin(){
        return "admin";
    }

    @RequestMapping("/grid")
    public String grid(){
        return "grid";
    }

    @RequestMapping("/dolend")
    @ResponseBody
    public String dolend(String username,String password){
        System.out.println(username+"   "+password);
        people people=new people();
        people.setName(username);
        people.setPassword(password);
        Map<String,Object> map=new HashMap<>();
        map.put("success",true);
        map.put("people",people);
        String books=JSON.toJSONString(map);
        return books;
    }

    @RequestMapping("/reg")
    @ResponseBody
    public String reg(String username, String password, String introduction, MultipartHttpServletRequest multiReq){
        // 获取上传文件的路径
        String uploadFilePath = multiReq.getFile("head").getOriginalFilename();
        System.out.println(uploadFilePath);
        // 截取上传文件的文件名
        String uploadFileName = uploadFilePath.substring(
                uploadFilePath.lastIndexOf('\\') + 1, uploadFilePath.indexOf('.'));
        System.out.println("multiReq.getFile()" + uploadFileName);
        // 截取上传文件的后缀
        String uploadFileSuffix = uploadFilePath.substring(uploadFilePath.indexOf('.') , uploadFilePath.length());
        System.out.println("uploadFileSuffix:" + uploadFileSuffix);
        //重新生成文件名
        String fileName = UUID.randomUUID()+"Ext"+uploadFileSuffix;
        String filePath = "E:/JT/";
        MultipartFile file = multiReq.getFile("head");
        try {
            file.transferTo(new File(filePath, fileName));
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println(username+"  "+password+"  "+introduction);
        Map<String,Object>map=new HashMap<>();
        map.put("success",true);
        map.put("user","asdfasdf");
        String s=JSON.toJSONString(map);
        return s;
    }

    @RequestMapping("model")
    public String model(){
        return "model";
    }


    @RequestMapping("/Spring")
    @ResponseBody
    public void getresource(HttpServletRequest request, HttpServletResponse response) throws IOException {
        ServletOutputStream out=response.getOutputStream();
        String filename=request.getParameter("filename");
        File file = new File("E://JT/"+filename);//文件名称
//        System.out.println(file.length());
        InputStream inputStream=new FileInputStream(file);
        byte[] b=new byte[1024];
        int length=0;
        while ((length=inputStream.read(b))>0){
            out.write(b,0,length);
        }
        inputStream.close();
        out.close();
    }

    @RequestMapping("/file")
    public String file(){
        return "file";
    }

    @RequestMapping("/upfile1")//单文件上传
    @ResponseBody
    public String upfile1( @RequestParam("file")MultipartFile fileUpload,@RequestParam("text")String text){
        System.out.println(text);
        //获取文件名
        String fileName = fileUpload.getOriginalFilename();
        System.out.println(fileName);
        //获取文件后缀名
        String suffixName = fileName.substring(fileName.lastIndexOf("."));
        //重新生成文件名
        fileName = UUID.randomUUID()+suffixName;
        //指定本地文件夹存储图片
        String filePath = "E:/JT/"+fileName;
        try {
            fileUpload.transferTo(new File(filePath));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "ok";
    }
    @RequestMapping("/upfile2")//单文件上传
    @ResponseBody
    public String upfile2(@RequestParam("file1")MultipartFile[] file1,@RequestParam("file2")MultipartFile file2,String flag){
        System.out.println(flag);
        List<String> name=new ArrayList<>();
        if(file1.length>0){
            for(int i=0;i<file1.length;i++){
                name.add(file1[i].getOriginalFilename());
                System.out.println(name.get(i));
            }
        }
        String name2=file2.getOriginalFilename();
        String filepath2="E:/JT/"+name2;
        try {
            file2.transferTo(new File(filepath2));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "ok";
    }

    @RequestMapping("/upfile3")
    @ResponseBody
    public String upfile3(@RequestParam("tt")String tt,@RequestParam("file")MultipartFile file){
        String name2=file.getOriginalFilename();
        System.out.println(tt+"  "+name2);
        return "ok";
    }

    @RequestMapping("/downfile")
    @ResponseBody
    public String downfile(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String filename="E:/JT/123.png";
        File file=new File(filename);
        response.setContentType("application/force-download");
        //名称编码（防止中文乱码问题，前台页面下载时无法显示中文字）
        //告诉前端服务器，改文件不解析，直接开启下载
        filename= URLEncoder.encode(filename,"utf-8");
        response.addHeader("Content-Disposition","attachment;fileName="+filename);
        response.addHeader("Content-Length", ""+file.length());

        byte[] bytes=new byte[1024];
        FileInputStream inputStream=new FileInputStream(file);
        OutputStream outputStream=response.getOutputStream();
        int i=0;
        while ((i=inputStream.read(bytes))!=-1){
            outputStream.write(bytes,0,i);
        }
        return "success";
    }

    @RequestMapping("/getpage")
    @ResponseBody
    public String getpage(String start,String limit){
        int index=Integer.parseInt(start);
        int pagesize=Integer.parseInt(limit);//分页标记
//        System.out.println(index+"    "+pagesize);
        Map<Object,Object>map=new HashMap<>();
        List<data> list=new ArrayList<>();
        data data=new data();
        data data2=new data();
        data.setId(1);data.setName("fzy");data.setAge(10);
        list.add(data);
        data2.setId(2);data2.setName("qewr");data2.setAge(15);
        list.add(data2);
        map.put("rows",list);
        map.put("results",4);
        return JSON.toJSONString(map);
    }
}