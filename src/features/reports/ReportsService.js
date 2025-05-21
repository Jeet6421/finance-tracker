import api from "../../services/api";
import handleRequest from "../../services/handleRequest";

/**
 * ReportsService to fetch various report data
 */
const ReportsService = {
  /**
   * Fetch monthly income and expense summary
   * @returns {Promise<{ labels: string[], income: number[], expenses: number[] }>}
   */
  getMonthlySummary() {
    return handleRequest(() =>
      api.get("/reports/monthly", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
    );
  },

  /**
   * Fetch category-wise expense data
   * @returns {Promise<{ labels: string[], data: number[] }>}
   */
  getCategoryWiseExpense() {
    return handleRequest(() =>
      api.get("/reports/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
    );
  },
};

export default ReportsService;
