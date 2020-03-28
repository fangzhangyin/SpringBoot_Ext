package springboot_ext.demo.DAO;
import springboot_ext.demo.entity.people;

import java.util.ArrayList;
import java.util.List;

public class peopleSql {

    private PeopleDAO peopleDAO;

    public peopleSql(PeopleDAO peopleDAO) {
        this.peopleDAO = peopleDAO;
    }

    public people findByID(int id){
        people people=peopleDAO.findById(id);
        return people;
    }

    public List<people> findAll(){
        List<people> people=new ArrayList<>();
        people=peopleDAO.findAll();
        return people;
    }

    public List<people>findByname(String name){
        List<people> peoples=new ArrayList<>();
        peoples=peopleDAO.findAllByName(name);
        return peoples;
    }

    public people save(people people){
     people people1=peopleDAO.save(people);
     return people1;
    }

    public void delteById(int id){
        peopleDAO.deleteById(id);
    }
}
