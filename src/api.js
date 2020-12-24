import axios from 'axios';

const api = axios.create({
  baseURL:"https://api.themoviedb.org/3/",
  params:{
    api_key:"27f74db9227ffc474c6211f5414c9834",
    language:"ko"
  }
})

export const MoviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  movieDetail: (id) => api.get(`movie/${id}`, {
    params: {
      append_to_response:'videos'
    }
  }),
  search: (term) => api.get("/search/movie",{
    params: {
      query:  encodeURIComponent(term)
    }
  }),
}

export const TVApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_tody"),
  showDetail: (id) => api.get(`tv/${id}`, {
    params: {
      append_to_response:'videos'
    }
  }),
  search: term => api.get("search/tv",{
    params:{
      query: encodeURIComponent(term)
    }
  })
}