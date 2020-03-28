package springboot_ext.demo.Mytools;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class ReadExcel {


    public static List  readXlsx(String path) throws IOException {
        //用来存放表中数据
        List<Map<String,String>> list = new ArrayList<Map<String,String>>();
        String extString = path.substring(path.lastIndexOf("."));
        String cellData = null;
        Workbook wb=readExcel(path);
        if(wb!=null){
            Sheet sheet=wb.getSheetAt(0);
            int rows=sheet.getPhysicalNumberOfRows();
            Row row=sheet.getRow(0);
            int col=row.getPhysicalNumberOfCells();
            for (int i = 0; i<rows; i++) {
                Map<String,String> map = new LinkedHashMap<String,String>();
                row = sheet.getRow(i);
                if(row !=null){
                    for (int j=0;j<col;j++){
                        cellData = (String) getCellFormatValue(row.getCell(j));
                        map.put(j+"", cellData);
                    }
                }else{
                    break;
                }
                list.add(map);
            }
        }
        return list;
    }

    private static Object getCellFormatValue(Cell cell) { Object cellValue = null;
        if(cell!=null){
            //判断cell类型
            switch(cell.getCellType()){
                case Cell.CELL_TYPE_NUMERIC:{
                    cellValue = String.valueOf(cell.getNumericCellValue());
                    break;
                }
                case Cell.CELL_TYPE_FORMULA:{
                    //判断cell是否为日期格式
                    if(DateUtil.isCellDateFormatted(cell)){
                        //转换为日期格式YYYY-mm-dd
                        cellValue = cell.getDateCellValue();
                    }else{
                        //数字
                        cellValue = String.valueOf(cell.getNumericCellValue());
                    }
                    break;
                }
                case Cell.CELL_TYPE_STRING:{
                    cellValue = cell.getRichStringCellValue().getString();
                    break;
                }
                default:
                    cellValue = "";
            }
        }else{
            cellValue = "";
        }
        return cellValue;
    }

    private static Workbook readExcel(String path) throws IOException {
        Workbook wb = null;
        String extString = path.substring(path.lastIndexOf("."));
        InputStream is = null;
        is=new FileInputStream(path);
        if(".xls".equals(extString)){
            return wb = new HSSFWorkbook(is);
        }else if(".xlsx".equals(extString)){
            return wb = new XSSFWorkbook(is);
        }else{
            return wb = null;
        }
    }


}
