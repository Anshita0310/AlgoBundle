package com.algobundle.service.impl;

import com.algobundle.exception.ResourceNotFoundException;
import com.algobundle.model.DSAQuestion;
import com.algobundle.repository.DSAQuestionRepository;
import com.algobundle.service.DSAQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor // Lombok generates constructor for all final fields
public class DSAQuestionServiceImpl implements DSAQuestionService {

    private final DSAQuestionRepository repo; // make it final for constructor injection

    @Override
    public DSAQuestion create(DSAQuestion question) {
        return repo.save(question);
    }

    @Override
    public DSAQuestion update(Long id, DSAQuestion updated) {
        DSAQuestion existing = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id " + id));
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setTopic(updated.getTopic());
        existing.setDifficulty(updated.getDifficulty());
        existing.setLink(updated.getLink());
        existing.setSolved(updated.isSolved());
        return repo.save(existing);
    }

    @Override
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new ResourceNotFoundException("Question not found with id " + id);
        }
        repo.deleteById(id);
    }

    @Override
    public DSAQuestion getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id " + id));
    }

    @Override
    public List<DSAQuestion> getAll() {
        return repo.findAll();
    }

    @Override
    public List<DSAQuestion> searchByTopic(String topic) {
        return repo.findByTopicContainingIgnoreCase(topic);
    }

    @Override
    public List<DSAQuestion> filterByDifficulty(String difficulty) {
        return repo.findByDifficultyIgnoreCase(difficulty);
    }

    /**
     * Method to calculate progress metrics for DSA questions.
     *
     * @return A map containing progress details.
     */
    @Override
    public Map<String, Object> getProgress() {
        long totalQuestions = repo.count();
        long solvedQuestions = repo.countBySolved(true);
        long attemptedQuestions = repo.countByStatus("ATTEMPTED");

        Map<String, Object> progress = new HashMap<>();
        progress.put("totalQuestions", totalQuestions);
        progress.put("solvedQuestions", solvedQuestions);
        progress.put("attemptedQuestions", attemptedQuestions);
        progress.put("remainingQuestions", totalQuestions - solvedQuestions - attemptedQuestions);

        return progress;
    }
}
