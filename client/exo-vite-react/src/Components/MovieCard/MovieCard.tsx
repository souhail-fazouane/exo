

export default function MovieCard(props:any){
    const {index, value,setMovie,setClickDetails} = props
    return (
        <div key={index} onClick={()=>{setMovie(value)
            setClickDetails(1)
        console.log(value)}} style={{height:360,width:189,marginRight:5,marginTop:10,marginLeft:15,display:"flex",alignItems:"center",flexDirection:"column",fontWeight:"bold"}} >
          <div style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500/${value.poster_path})`,height:305,width:205,backgroundSize:"contain",backgroundRepeat:"no-repeat",borderRadius:25}}> 
          </div>
          <div style={{display:"flex",alignItems:"center",textAlign:"center"}} >
          {value.original_title}
          </div>
        </div>
    )
}