import api from "../../services/api";
import handleRequest from "../../services/handleRequest";

const InvestmentService = {
  /**
   * Fetch all investment entries.
   */
  getTotal: () => handleRequest(() => api.get("/investment")),

  /**
   * Add a new investment entry.
   * @param {Object} investment - InvestmentDTO containing type, amount, returns, date, and description
   */
  add: (investment) =>
    handleRequest(() =>
      api.post("/investment", {
        type: investment.type,
        amount: investment.amount,
        returns: investment.returns,
        investmentDate: investment.date,
        description: investment.description,
      })
    ),

  /**
   * Delete an investment entry by ID.
   * @param {string|number} id - The investment ID
   */
  delete: (id) => handleRequest(() => api.delete(`/investment/${id}`)),
};


export default InvestmentService;
