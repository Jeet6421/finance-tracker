// services/handleRequest.js
import api from './api';

/**
 * A generic wrapper for making API requests and handling errors.
 * 
 * @param {Function} requestFunc - A function that returns an Axios request (e.g., () => api.get(...))
 * @returns {Promise<any>} - The resolved data from the response
 * @throws {Error} - Throws an error with a user-friendly message
 */
const handleRequest = async (requestFunc) => {
  try {
    const response = await requestFunc();
    return response.data;
  } catch (error) {
    // Attempt to extract a meaningful error message
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      `Request failed with status ${status}` ||
      "Something went wrong.";

    console.error("❌ API Request Error:", {
      status,
      message,
      details: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });

    throw new Error(message);
  }
};

export default handleRequest;
