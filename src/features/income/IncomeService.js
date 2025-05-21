import api from "../../services/api"; // Adjust path if needed
import handleRequest from "../../services/handleRequest"; // Adjust path if needed

const IncomeService = {
  // getTotal: () => handleRequest(() => api.get('/income')),
  getAll: () => handleRequest(() => api.get('/income/total')),
  create: (payload) => handleRequest(() => api.post('/income', payload)),
  delete: (id) => handleRequest(() => api.delete(`/income/${id}`)),
};

export default IncomeService;
