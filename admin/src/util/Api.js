import axios from 'axios';

export default axios.create({
  baseURL: "http://18.119.60.218",
  headers: {
    'Content-Type': 'application/json',
  }
});
