import axios from "axios";


const apikey=process.env.NEXT_PUBLIC_REST_API_KEY;
const apiurl=process.env.NEXT_PUBLIC_REST_API_URL;

const axiosClient = axios.create({
    baseURL:apiurl,
    headers:{
        Authorization:`Bearer ${apikey}`
    }
})

export default axiosClient;
