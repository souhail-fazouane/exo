import React, { useEffect, useState } from "react"
import MovieCard from "../MovieCard/MovieCard"
import '../../App.css'
import { ResultMovie } from "../../App"

export default function MovieList(props:{label:string,data:ResultMovie[],setMovie:React.Dispatch<React.SetStateAction<ResultMovie|undefined>>,setClickDetails:React.Dispatch<React.SetStateAction<number>>,clickDetails:number}){
    const {label,data,setMovie,setClickDetails,clickDetails} = props
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
            data && data.map((value: ResultMovie,index: number)=>{
              return (
              <MovieCard key={index} value={value} index={index} setMovie={setMovie} setClickDetails={setClickDetails} clickDetails={clickDetails} />
            )})
          }
          </div>
        </div>)
    
    
}