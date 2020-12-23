import axios from 'axios';

const api = axios.create({
  baseURL:"https://api.themoviedb.org/3/",
  params:{
    api_key:"27f74db9227ffc474c6211f5414c9834",
    language:"en-US"
  }
})


// api get은 상대경로로 작성
api.get("tv/popular");

export default api;