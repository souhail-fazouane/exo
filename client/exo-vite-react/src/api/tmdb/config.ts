
export const apiSearchData = (textValue:string)=>`https://api.themoviedb.org/3/search/movie?api_key=aa9f6ed99dc2087a9ba01eeb0cf2b20e&query=${textValue.split(" ").join("+")}`
export const apiNowPlaying = "https://api.themoviedb.org/3/movie/now_playing?api_key=aa9f6ed99dc2087a9ba01eeb0cf2b20e"
export const apiTopRated = "https://api.themoviedb.org/3/movie/top_rated?api_key=aa9f6ed99dc2087a9ba01eeb0cf2b20e"
export const api_Token = "aa9f6ed99dc2087a9ba01eeb0cf2b20e"