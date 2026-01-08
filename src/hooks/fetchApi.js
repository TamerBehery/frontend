import axios from "axios";


const fectchApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_END_API_URL,
  headers: {
    //Authorization: `Bearer ${process.env.BACK_END_KEY}`,
    //"Content-Type": "application/json",
  },
});


export default fectchApi;
