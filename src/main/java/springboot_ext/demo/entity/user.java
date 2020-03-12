package springboot_ext.demo.entity;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@PropertySource(value = {"classpath:people.properties"})//通过properties文件寻找对象的实例化（需要配合@ConfigurationProperties使用）
//@ConfigurationProperties(prefix = "user")
@ConfigurationProperties(prefix = "user")
@Component
public class user {

    private int id;
    private String username;
    private dog dog;

    @Override
    public String toString() {
        return "user{" +
                "id=" + id +
                ", name='" + username + '\'' +
                ", dog=" + dog +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public springboot_ext.demo.entity.dog getDog() {
        return dog;
    }

    public void setDog(springboot_ext.demo.entity.dog dog) {
        this.dog = dog;
    }
}
