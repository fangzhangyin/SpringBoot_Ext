package springboot_ext.demo.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import springboot_ext.demo.entity.people;

import java.util.List;

public interface PeopleDAO extends JpaRepository<people,Integer> {//传入实体类和主键类型
    people findById(int id);

    List<people> findAllByName(String name);
    

}
