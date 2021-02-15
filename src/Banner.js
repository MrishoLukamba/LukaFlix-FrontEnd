import React,{useState, useEffect} from 'react'
import './Banner.css';
import axios from './Axios';
import requests from './Request';
import instance from './Axios';

function Banner() {
    const [movie, setMovie]=useState([]);

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            const newMovie = setInterval(() => {
                Math.floor(Math.random() * request.data.results.length - 1)                
            }, 10);
            const result = request.data.results[newMovie]
            
            setMovie(result); 
            return request;
        }
        const intervalId = setInterval(()=>{
            fetchData()
        },10000)
        return ()=>{
            clearInterval(intervalId);
        }
    },[])

    

    const trancate=(string, n)=>{
        return string?.length > n ? string.substring(0,n-1) +'  . . .': string
    }

    return (
        <header>
        <div className='banner' style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            transition: 'all 500ms',
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`}}>
            <div className='banner_content'>
                <h1 className='banner_title'>{movie?.title ||movie?.name|| movie?.original_name}</h1>
                <div className='banner_buttons'>
                    <button className='banner_button'>Play</button>
                    <button className='banner_button'>My list</button>
                </div>
                <h1 className='banner_description'>{trancate(movie?.overview,153)}
               </h1>
            </div>   
            <div className='banner_fadeButton'/>
        </div>
        </header>
    )
}

export default Banner
