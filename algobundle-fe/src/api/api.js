import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = 'http://localhost:8080/api/dsa';

/**
 * Fetch all DSA questions.
 * @returns {Promise<Object>} Response containing all questions.
 */
export const fetchAllQuestions = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

/**
 * Fetch a specific question by ID.
 * @param {number} id - ID of the question.
 * @returns {Promise<Object>} Response containing the question details.
 */
export const fetchQuestionById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching question with id ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new question.
 * @param {Object} question - Question data.
 * @returns {Promise<Object>} Response containing the created question.
 */
export const createQuestion = async (question) => {
  try {
    const response = await axios.post(API_BASE_URL, question);
    return response.data;
  } catch (error) {
    console.error('Error creating question:', error);
    throw error;
  }
};

/**
 * Update an existing question.
 * @param {number} id - ID of the question to update.
 * @param {Object} question - Updated question data.
 * @returns {Promise<Object>} Response containing the updated question.
 */
export const updateQuestion = async (id, question) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, question);
    return response.data;
  } catch (error) {
    console.error(`Error updating question with id ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a question by ID.
 * @param {number} id - ID of the question to delete.
 * @returns {Promise<Object>} Response containing the delete confirmation.
 */
export const deleteQuestion = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting question with id ${id}:`, error);
    throw error;
  }
};

/**
 * Search questions by topic.
 * @param {string} topic - Topic to search for.
 * @returns {Promise<Object>} Response containing search results.
 */
export const searchQuestionsByTopic = async (topic) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, { params: { topic } });
    return response.data;
  } catch (error) {
    console.error('Error searching questions by topic:', error);
    throw error;
  }
};

/**
 * Filter questions by difficulty.
 * @param {string} difficulty - Difficulty level to filter by.
 * @returns {Promise<Object>} Response containing filter results.
 */
export const filterQuestionsByDifficulty = async (difficulty) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/filter`, { params: { difficulty } });
    return response.data;
  } catch (error) {
    console.error('Error filtering questions by difficulty:', error);
    throw error;
  }
};

/**
 * Fetch progress data for the progress tracker.
 * @returns {Promise<Object>} Response containing progress details.
 */
export const fetchProgress = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/progress`);
    return response.data;
  } catch (error) {
    console.error('Error fetching progress data:', error);
    throw error;
  }
};
