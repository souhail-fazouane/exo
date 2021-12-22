import React, { useState, useEffect } from 'react'
import './App.css'
import MovieCard from './Components/MovieCard/MovieCard'
import MovieDetails from './Components/MovieDetails/MovieDetails'
import MovieList from './Components/MovieList/MovieList'
import NavigationBar from './Components/Navbar/navigationbar'



interface ResultMovie {
  adult: boolean;
backdrop_path: string;
id: number;
original_language: string;
original_title: string;
overview: string;
popularity: number;
poster_path: string;
release_date: string;
title: string;
video: boolean;
vote_average: number;
vote_count: number;
idMovie:string;
}



function App() {
  const [nowData,setNowData] = useState<ResultMovie[]>([])
  const [topData,setTopData] = useState<ResultMovie[]>([])
  const [searchData,setSearchData] = useState<ResultMovie[]>([])
  const [clickDetails,setClickDetails] = useState(0)
  const [filter,setFilter] = useState("")
  const [movie,setMovie] = useState<ResultMovie>()
  const [likedMovies,setLikedMovies] = useState<ResultMovie[]>([])
  const [likedMovie,setLikedMovie] = useState<ResultMovie>()
  const api_Token = "aa9f6ed99dc2087a9ba01eeb0cf2b20e"
  const apiNowPlaying = "https://api.themoviedb.org/3/movie/now_playing?api_key=aa9f6ed99dc2087a9ba01eeb0cf2b20e"
  const apiTopRated = "https://api.themoviedb.org/3/movie/top_rated?api_key=aa9f6ed99dc2087a9ba01eeb0cf2b20e"

  useEffect(()=>{
    fetch('http://localhost:8080/feed', {
        method: 'GET',
        mode: "cors",
     }).then(response => {
       console.log(response)
      if (response.ok){
        return response.json()
      }
      throw response
    })
    .then(data => {
      console.log("data feed",data)
      setLikedMovies(data.map((value:ResultMovie)=>{return {...value,id:value.idMovie.toString()}}))
    })
    .then(function(myJson) {
         console.log(JSON.stringify(myJson));
       })
       .catch(e => {
         console.log(e)
       })
  },[])

  useEffect(()=>{
    console.log(likedMovie)
    
    if (likedMovie && likedMovies.filter(function(value,index,arr){return value.id!=likedMovie.id}).length==likedMovies.length){
      likedMovies.push({...likedMovie,idMovie:likedMovie.id.toString()})
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
     
       
    }else if(likedMovie){
      setLikedMovies(likedMovies.filter(function(value,index,arr){
        return value.id!=likedMovie.id
      }))
      fetch(`http://localhost:8080/movie/${likedMovie.idMovie}`, {
        method: 'DELETE',
        mode:"cors",
     })
     
       
    }
  },[likedMovie])
  
  
  useEffect(()=>{
    fetch(apiNowPlaying)
    .then(response => {
      if (response.ok){
        return response.json()
      }
      throw response
    })
    .then(data => {
      setNowData(data.results)
      console.log(data.results)
    })
    .catch(error => {
      console.error("Error Fetching Now Playing Data", error)
    })
  },[])
  
  useEffect(()=>{
    fetch(apiTopRated)
    .then(response => {
      if (response.ok){
        return response.json()
      }
      throw response
    })
    .then(data => {
      setTopData(data.results)
      console.log(data.results)
    })
    .catch(error => {
      console.error("Error Fetching Top Rated Data", error)
    })
    
  },[])

  useEffect(()=>{
    if (clickDetails===0){
      setFilter("")
    }else{
      setFilter("blur(5px) brightness(0.7)")
    }
  },[clickDetails])
  
  return (
    <div>
      <MovieDetails movie={movie} clicked={clickDetails} setClickDetails={setClickDetails} setLikedMovie={setLikedMovie} likedMovies={likedMovies}/>
      <div style={{filter:filter,}}>
      <NavigationBar setSearchData={setSearchData}  />
      <div style={{overflowY:"scroll",height:"92vh"}}>
      <MovieList label="Searching Movies" data={searchData} setMovie={setMovie} setClickDetails={setClickDetails} />
      <MovieList label="Now Playing in The Theater" data={nowData} setMovie={setMovie} setClickDetails={setClickDetails} />
      <MovieList label="Top Rated Movies" data={topData} setMovie={setMovie} setClickDetails={setClickDetails} />
      <MovieList label="My WatchList" data={likedMovies} setMovie={setMovie} setClickDetails={setClickDetails} />

      </div>
      </div>
    </div>
  )
}

export default App
