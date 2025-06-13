package com.algobundle.repository;

import com.algobundle.model.DSAQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface DSAQuestionRepository extends JpaRepository<DSAQuestion, Long>{

    List<DSAQuestion> findByTitleContainingIgnoreCase(String keyword);
    List<DSAQuestion> findByTopicContainingIgnoreCase(String topic);
    List<DSAQuestion> findByDifficultyIgnoreCase(String difficulty);
    long countByStatus(String status);

    long countBySolved(boolean b);
}

// this gives full working  connection bw app and mysql
// this gives save, findall, findbyid, deletebyid
//  no need to write  sql its all handled
