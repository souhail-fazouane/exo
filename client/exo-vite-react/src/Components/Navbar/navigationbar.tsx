import React, { useEffect, useState } from 'react'


function NavigationBar(props:any){
  const {setSearchData}=props
  const [textValue, setTextValue] = useState("")

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value)
  }
  useEffect(()=>{
    if (textValue==""){
      setSearchData([])
    }else{
      const apiSearchData = `https://api.themoviedb.org/3/search/movie?api_key=aa9f6ed99dc2087a9ba01eeb0cf2b20e&query=${textValue.split(" ").join("+")}`

      fetch(apiSearchData)
    .then(response => {
      if (response.ok){
        return response.json()
      }
      throw response
    })
    .then(data => {
      setSearchData(data.results)
      console.log(data.results)
    })
    .catch(error => {
      console.error("Error Fetching Top Rated Data", error)
    })
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

