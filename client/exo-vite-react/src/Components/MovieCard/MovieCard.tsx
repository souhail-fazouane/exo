import { ResultMovie } from "../../App"


export default function MovieCard(props:{index:number, value:ResultMovie,setMovie:React.Dispatch<React.SetStateAction<ResultMovie|undefined>>,setClickDetails:React.Dispatch<React.SetStateAction<number>>,clickDetails:number}){
    const {index, value,setMovie,setClickDetails,clickDetails} = props
    return (
        <div key={index} onClick={()=>{
            if (clickDetails==0){
                setMovie(value)
                setClickDetails(1)
            }
            
        }}  style={{height:360,width:189,marginRight:5,marginTop:10,marginLeft:15,display:"flex",alignItems:"center",flexDirection:"column",fontWeight:"bold"}} >
          <div style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500/${value.poster_path})`,height:305,width:205,backgroundSize:"contain",backgroundRepeat:"no-repeat",borderRadius:25}}> 
          </div>
          <div style={{display:"flex",alignItems:"center",textAlign:"center"}} >
          {value.original_title}
          </div>
        </div>
    )
}