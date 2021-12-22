import { ResultMovie } from "../../App"
import { apiNowPlaying, apiSearchData, apiTopRated } from "./config"


export function fetchNowPlaying(props:{setNowData:React.Dispatch<React.SetStateAction<ResultMovie[]>>}){
    const {setNowData}= props

    fetch(apiNowPlaying)
    .then(response => {
      if (response.ok){
        return response.json()
      }
      throw response
    })
    .then(data => {
      setNowData(data.results.slice(0,10))
    })
    .catch(error => {
      console.error("Error Fetching Now Playing Data", error)
    })
}

export function fetchTopRated(props:{setTopData:React.Dispatch<React.SetStateAction<ResultMovie[]>>}){
    const {setTopData} = props
    fetch(apiTopRated)
    .then(response => {
      if (response.ok){
        return response.json()
      }
      throw response
    })
    .then(data => {
      setTopData(data.results.slice(0,10))
    })
    .catch(error => {
      console.error("Error Fetching Top Rated Data", error)
    })
}

export function fetchSearchData(props:{setSearchData:React.Dispatch<React.SetStateAction<ResultMovie[]>>,textValue:string}){
    const {textValue,setSearchData} = props
    fetch(apiSearchData(textValue))
    .then(response => {
      if (response.ok){
        return response.json()
      }
      throw response
    })
    .then(data => {
      setSearchData(data.results.slice(0,10))
    })
    .catch(error => {
      console.error("Error Fetching Search Data", error)
    })
}