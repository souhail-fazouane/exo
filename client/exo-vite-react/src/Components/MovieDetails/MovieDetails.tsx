import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle, faHeart,faHeartBroken } from '@fortawesome/free-solid-svg-icons'

import React, { useEffect, useState } from "react"
import { ResultMovie } from "../../App"


export default function MovieDetails(props:{movie:ResultMovie|undefined,clicked:number,setClickDetails:React.Dispatch<React.SetStateAction<number>>,setLikedMovie:React.Dispatch<React.SetStateAction<ResultMovie|undefined>>,likedMovies:ResultMovie[]}){
    const {movie,clicked,setClickDetails,setLikedMovie,likedMovies}=props
    const [zIndex,setZIndex] = useState(-1)
    const [iconHeart, setIconHeart] = useState(faHeartBroken)
    const [colorHeart, setColorHeart] = useState("pink")
    
    useEffect(() => {
        if (clicked==1){
            setZIndex(1)
        }else{
            setZIndex(-1)
        }
        if (movie && likedMovies.filter(function(value,index,arr){return value.idMovie!=movie.id.toString()}).length!=likedMovies.length){
            setIconHeart(faHeart)
            setColorHeart("red")
        }else{
            setIconHeart(faHeartBroken)
            setColorHeart("pink")
                }
    }, [clicked])

    if (!movie){
        return (
            <div></div>
        )
    }
    

    
    return (
        <div style={{position:"absolute",zIndex:zIndex,height:"70%",width:"57.6%",left:"25%",top:"15%",opacity:clicked,borderRadius:15,}}>
        <div style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,height:"100%",width:"100%",backgroundSize:"contain",backgroundRepeat:"no-repeat",borderRadius:15}}> 
        <div style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,height:"55%",width:"20.5%",backgroundSize:"contain",backgroundRepeat:"no-repeat",borderRadius:15,marginLeft:"79.5%",}}> 
        <div style={{backgroundColor:"white",marginLeft:"80.3%",borderRadius:15}} onClick={()=>{setClickDetails(0)}}><FontAwesomeIcon icon={faTimesCircle}  size={"2x"} /></div>
        <div onClick={()=>{
            setLikedMovie({...movie,idMovie:movie.id.toString()})
        setClickDetails(0)}} style={{marginLeft:"80%",marginTop:"95%"}}><FontAwesomeIcon icon={iconHeart}  size={"2x"} color={colorHeart} /> </div>
          </div>
          </div>
          <div style={{width:"100%",height:"20%",backgroundColor:"white",display:"flex",textAlign:"center",flexDirection:"column",fontWeight:"bold",borderRadius:15,overflowY:"scroll"}} >
            <div >
            
                Title : {movie.original_title}
            </div>
            <div >
                Overview : {movie.overview}
            </div>
            
            </div>
        </div>
    )
}