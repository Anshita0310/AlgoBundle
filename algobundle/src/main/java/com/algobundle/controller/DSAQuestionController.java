package com.algobundle.controller;

import com.algobundle.model.DSAQuestion;
import com.algobundle.payload.ApiResponse;
import com.algobundle.service.DSAQuestionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dsa")
public class DSAQuestionController {

    private final DSAQuestionService questionService;

    public DSAQuestionController(DSAQuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<DSAQuestion>> createQuestion(@Valid @RequestBody DSAQuestion question) {
        DSAQuestion saved = questionService.create(question);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "Question created", saved));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<DSAQuestion>>> getAllQuestions() {
        List<DSAQuestion> questions = questionService.getAll();
        return ResponseEntity.ok(new ApiResponse<>(true, "Fetched all questions", questions));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DSAQuestion>> getQuestionById(@PathVariable Long id) {
        try {
            DSAQuestion question = questionService.getById(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "Question found", question));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DSAQuestion>> updateQuestion(@PathVariable Long id, @Valid @RequestBody DSAQuestion updatedQuestion) {
        try {
            DSAQuestion updated = questionService.update(id, updatedQuestion);
            return ResponseEntity.ok(new ApiResponse<>(true, "Question updated", updated));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteQuestion(@PathVariable Long id) {
        try {
            questionService.delete(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "Question deleted", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    // Search questions by topic query param
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<DSAQuestion>>> searchByTopic(@RequestParam String topic) {
        List<DSAQuestion> results = questionService.searchByTopic(topic);
        return ResponseEntity.ok(new ApiResponse<>(true, "Search results", results));
    }

    // Filter questions by difficulty query param
    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<List<DSAQuestion>>> filterByDifficulty(@RequestParam String difficulty) {
        List<DSAQuestion> results = questionService.filterByDifficulty(difficulty);
        return ResponseEntity.ok(new ApiResponse<>(true, "Filter results", results));
    }

    @GetMapping("/progress")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getProgress() {
        Map<String, Object> progress = questionService.getProgress();
        return ResponseEntity.ok(new ApiResponse<>(true, "Progress data fetched", progress));
    }

}
