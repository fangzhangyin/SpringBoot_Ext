package springboot_ext.demo.entity;

import javax.persistence.*;

@Entity//使用注解表示该类是一个实体类
@Table(name ="t1")//指定和数据库中的哪一个表进行匹配，如果不配置则自动匹配类名
public class people {
    @Id//表示这是一个主键
    @GeneratedValue(strategy = GenerationType.IDENTITY)//配置主键自增
    private Integer id;
    @Column(name = "name",length = 50)//设置字段名称和最大长度
    private String name;
    @Column
    private String password;
    private String head;
    private String place;
    private String introduction;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getHead() {
        return head;
    }

    public void setHead(String head) {
        this.head = head;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }
}
