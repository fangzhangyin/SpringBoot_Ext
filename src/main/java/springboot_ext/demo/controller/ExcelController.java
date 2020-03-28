package springboot_ext.demo.controller;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import springboot_ext.demo.Mytools.ReadExcel;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class ExcelController {

    @RequestMapping("/excel")
    public String excel(){
        return "excel";
    }

    @RequestMapping("/upexcel")
    public String upexcel(@RequestParam("excel1") MultipartFile excel1, @RequestParam("excel2") MultipartFile excel2, HttpServletRequest request) throws IOException{
        String filePath="E:/Jt/";
        String file1 = excel1.getOriginalFilename();
        String file2=excel2.getOriginalFilename();
        System.out.println(file1+"  "+file2);
        excel1.transferTo(new File(filePath+file1));
        excel2.transferTo(new File(filePath+file2));
        request.getSession().setAttribute("file1",filePath+file1);
        request.getSession().setAttribute("file2",filePath+file2);
        return "excelok";
    }

    @RequestMapping("/start")
    @ResponseBody
    public String start(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String file1= (String) request.getSession().getAttribute("file1");
        String file2= (String) request.getSession().getAttribute("file2");
        List<Map<String,String>> list1= ReadExcel.readXlsx(file1);
        List<Map<String,String>>list2=ReadExcel.readXlsx(file2);
        List<String>l1=new ArrayList<>();
        List<String>l2_1=new ArrayList<>();
        List<String>l2_2=new ArrayList<>();
        System.out.println(list1.size()+"  "+list2.size());
        for (Map<String,String> map : list1) {
            for (Map.Entry<String,String> entry : map.entrySet()) {
                l1.add(entry.getValue());
            }
        }

        int flag=0;
        for (Map<String,String> map : list2) {
            for (Map.Entry<String,String> entry : map.entrySet()) {
               if(entry.getKey().equals("0")){
                   l2_1.add(entry.getValue());
               }else if(entry.getKey().equals("1")){
                   l2_2.add(entry.getValue());
               }
            }
            flag++;
        }
//        for(int i=0;i<l1.size();i++){
//            System.out.println(l1.get(i).toString());
//        }
//        for(int i=0;i<l2_1.size();i++){
//            System.out.println(l2_1.get(i)+"  "+l2_2.get(i));
//        }
        List<String>result=new ArrayList<>();
        for(int i=0;i<l1.size();i++){
            boolean f=false;
            for(int y=0;y<l2_1.size();y++){
                if(l1.get(i).equals(l2_1.get(y))){
                    result.add(l2_2.get(y));
//                    result.add(1+"");
                    f=true;
                    break;
                }
            }
            if(f==false){
                result.add(0+"");
            }
        }
        for(int i=0;i<result.size();i++){
            System.out.println(result.get(i).toString());
        }
        File f1=new File(file1);
        f1.delete();
        File f2=new File(file2);
        f2.delete();
        request.getSession().invalidate();

        // 创建工作薄 xlsx
        XSSFWorkbook xssWorkbook = new XSSFWorkbook();
        // 创建工作表
        XSSFSheet sheet = xssWorkbook.createSheet("sheet1");

        for (int row = 0; row < l1.size(); row++)
        {
            XSSFRow rows = sheet.createRow(row);
            for (int col = 0; col < 2; col++)
            {
                // 向工作表中添加数据
                if(col==0){
                    rows.createCell(col).setCellValue(l1.get(row));
                }
                else if(col==1){
                    rows.createCell(col).setCellValue(result.get(row));
                }

            }
        }
        File xlsFile = new File("E:/JT/poi.xlsx");
        FileOutputStream xlsStream = new FileOutputStream(xlsFile);
        xssWorkbook.write(xlsStream);

        response.setContentType("application/force-download");
        //名称编码（防止中文乱码问题，前台页面下载时无法显示中文字）
        //告诉前端服务器，改文件不解析，直接开启下载
        String filename=xlsFile.getName();
        filename= URLEncoder.encode(filename,"utf-8");
        response.addHeader("Content-Disposition","attachment;fileName="+filename);
        response.addHeader("Content-Length", ""+xlsFile.length());

        byte[] bytes=new byte[1024];
        FileInputStream inputStream=new FileInputStream(xlsFile);
        OutputStream outputStream=response.getOutputStream();
        int i=0;
        while ((i=inputStream.read(bytes))!=-1){
            outputStream.write(bytes,0,i);
        }
        inputStream.close();
        outputStream.close();
        xlsFile.delete();
        return "ok";
    }
}
