import React, { useState, useEffect } from 'react'
import { fetchAddMovieToWatchList, fetchDeleteMovieFromWatchList, fetchGetWatchList } from './api/fetchDataBackend'
import { fetchNowPlaying, fetchTopRated } from './api/tmdb/fetchDataTMDB'
import './App.css'
import MovieDetails from './Components/MovieDetails/MovieDetails'
import MovieList from './Components/MovieList/MovieList'
import NavigationBar from './Components/Navbar/navigationbar'



export interface ResultMovie {
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
  

  useEffect(()=>{
    fetchGetWatchList({setLikedMovies:setLikedMovies})
    
  },[])

  useEffect(()=>{
    
    if (likedMovie && likedMovies.filter(function(value,index,arr){return value.id!=likedMovie.id}).length==likedMovies.length){
      likedMovies.push({...likedMovie,idMovie:likedMovie.id.toString()})
      fetchAddMovieToWatchList({likedMovie:likedMovie})
          
    }else if(likedMovie){
      setLikedMovies(likedMovies.filter(function(value,index,arr){
        return value.id!=likedMovie.id
      }))
      fetchDeleteMovieFromWatchList({likedMovie:likedMovie})
       
    }
  },[likedMovie])
  
  
  useEffect(()=>{
    fetchNowPlaying({setNowData:setNowData})
    
  },[])
  
  useEffect(()=>{
    fetchTopRated({setTopData:setTopData})
    
    
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
      <MovieList label="Searching Movies" data={searchData} setMovie={setMovie} setClickDetails={setClickDetails} clickDetails={clickDetails} />
      <MovieList label="Now Playing in The Theater" data={nowData} setMovie={setMovie} setClickDetails={setClickDetails} clickDetails={clickDetails} />
      <MovieList label="Top Rated Movies" data={topData} setMovie={setMovie} setClickDetails={setClickDetails} clickDetails={clickDetails} />
      <MovieList label="My WatchList" data={likedMovies} setMovie={setMovie} setClickDetails={setClickDetails} clickDetails={clickDetails} />

      </div>
      </div>
    </div>
  )
}

export default App
