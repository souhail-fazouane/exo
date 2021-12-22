import { ResultMovie } from "../App"


export function fetchGetWatchList(props:{setLikedMovies:React.Dispatch<React.SetStateAction<ResultMovie[]>>}){
    const {setLikedMovies,} = props
    
    fetch('http://localhost:8080/feed', {
        method: 'GET',
        mode: "cors",
     }).then(response => {
      if (response.ok){
        return response.json()
      }
      throw response
    })
    .then(data => {
      setLikedMovies(data.map((value:ResultMovie)=>{return {...value,id:value.idMovie.toString()}}))
    })
       .catch(e => {
         console.log(e)
       })
}

export function fetchAddMovieToWatchList(props:{likedMovie:ResultMovie}){
    const {likedMovie,} = props
    fetch('http://localhost:8080/movie', {
        method: 'POST',
        mode: "cors",
        headers: {
             'Content-Type': 'application/json',
             
        },
        body: JSON.stringify({
          idMovie:likedMovie.id.toString(),
            original_title:likedMovie.original_title,
            overview:likedMovie.overview,
            poster_path:likedMovie.poster_path,
            backdrop_path: likedMovie.backdrop_path
        })
     })
}

export function fetchDeleteMovieFromWatchList(props:{likedMovie:ResultMovie}){
    const {likedMovie}= props

    fetch(`http://localhost:8080/movie/${likedMovie.idMovie}`, {
        method: 'DELETE',
        mode:"cors",
     })
}