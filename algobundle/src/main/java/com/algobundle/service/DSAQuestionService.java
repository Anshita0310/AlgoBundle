package com.algobundle.service;

import com.algobundle.model.DSAQuestion;
import java.util.List;
import java.util.Map;

public interface DSAQuestionService {
    DSAQuestion create(DSAQuestion question);
    DSAQuestion update(Long id, DSAQuestion question);
    void delete(Long id);
    DSAQuestion getById(Long id);
    List<DSAQuestion> getAll();
    List<DSAQuestion> searchByTopic(String topic);
    List<DSAQuestion> filterByDifficulty(String difficulty);

    Map<String, Object> getProgress();
}
