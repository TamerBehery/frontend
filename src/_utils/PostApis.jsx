import axiosClient from "./axiosClient";

const getPosts = () => axiosClient.get("/posts?populate=*");
const getPostById = (id) => axiosClient.get(`/posts/${id}?populate=*`);

export default {
  getPosts,
  getPostById,
};
