import axios from 'axios';

class ExampleService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/examples
  sendData = async (requestBody) => {
    return this.api.post('/api/upload', requestBody);
  }

  // GET /api/examples
  getAll = async () => {
    return this.api.get('/api/examples');
  }

}

// Create one instance of the service
const exampleService = new ExampleService();

export default exampleService;