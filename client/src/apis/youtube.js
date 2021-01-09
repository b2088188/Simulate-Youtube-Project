import axios from "axios";
const KEY = "AIzaSyABKe1gEdwu212W0-lPJg0HMkZXN9N6EGk";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    type: "video",
    key: KEY,
  },
});
