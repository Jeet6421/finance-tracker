import api from "../../services/api";
import handleRequest from "../../services/handleRequest"; // assuming you have a handleRequest utility for better error handling

const ExpenseService = {
  /**
   * Get total expenses
   * @returns {Promise<any>} - The total expense data
   */
  getTotal: async () => {
    return handleRequest(() => api.get("/expense"));
  },

  /**
   * Add a new expense
   * @param {Object} expense - The expense data to be added
   * @returns {Promise<any>} - The added expense data
   */
  add: async (expense) => {
    return handleRequest(() => api.post("/expense", expense));
  },

  /**
   * Delete an expense by ID
   * @param {string} id - The ID of the expense to be deleted
   * @returns {Promise<void>} - A promise that resolves when the expense is deleted
   */
  delete: async (id) => {
    return handleRequest(() => api.delete(`/expense/${id}`));
  },
};

export default ExpenseService;
