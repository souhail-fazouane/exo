import React, { useEffect, useState } from "react"
import MovieCard from "../MovieCard/MovieCard"
import '../../App.css'

export default function MovieList(props:any){
    const {label,data,setMovie,setClickDetails} = props
    if (data.length==0){
        return <div></div>
    }

    if (data.length==0){
        return (<div></div>)
    }
    
    return (
        <div style={{width:"100%"}}>
        <div style={{fontWeight:"bold",fontSize:20,paddingLeft:20}}>{label}</div>
          <div className={"movieCard"} style={{display:"flex",flexDirection:"row",width:"100%",overflowX:"scroll",msOverflowStyle:"none"}}>
          {
            data && data.map((value: any,index: any)=>{
              return (
              <MovieCard  key={index} value={value} index={index} setMovie={setMovie} setClickDetails={setClickDetails} />
            )})
          }
          </div>
        </div>)
    
    
}