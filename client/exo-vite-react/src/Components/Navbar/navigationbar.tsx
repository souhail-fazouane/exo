import { text } from '@fortawesome/fontawesome-svg-core'
import React, { useEffect, useState } from 'react'
import { fetchSearchData } from '../../api/tmdb/fetchDataTMDB'
import { ResultMovie } from '../../App'


function NavigationBar(props:{setSearchData:React.Dispatch<React.SetStateAction<ResultMovie[]>>}){
  const {setSearchData}=props
  const [textValue, setTextValue] = useState("")

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value)
  }
  useEffect(()=>{
    if (textValue==""){
      setSearchData([])
    }else{

      fetchSearchData({textValue:textValue,setSearchData:setSearchData})
      
    }
  },[textValue])
    return(
      <div style={{height:"50px",width:"100%",backgroundColor:"black",display:'flex',flexDirection:"row"}}>
        <div style={{color:"white",fontWeight:"bold",width:"100%",height:"50px",paddingLeft:15,display:"flex",alignItems:"center",fontSize:30}}>Tadam</div>
        <div style={{right:0,display:'flex',flexDirection:"row"}}>
        <label style={{display:"flex",flexDirection:"row",alignItems:"center",marginRight:"30px"}}>
          <div style={{color:"white",marginRight:"15px",fontSize:25}}>
          Search:
          </div>
          <input style={{height:"25px"}} type="text" value={textValue} onChange={handleChange} />
        </label>
        
        </div>
      </div>
  )
}

export default NavigationBar

