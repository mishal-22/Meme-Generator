import React, { useEffect, useState } from 'react'
// import memesData from '../memesData'

function Meme() {
    
      const[meme,setMeme]=useState({
        topText:"",
        bottomText:"",
        randomImage: "http://i.imgflip.com/1bij.jpg"

      })

      const[allMemes,setAllMemes]=useState([])

      useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res=>res.json())
        .then(data=>setAllMemes(data.data.memes))
      },[])

      function handleChange(event){
        const {name,value}=event.target
        setMeme(prevState=>({
            ...prevState,
            [name]:value
        }))
      }

    function getMemeImage(){
        const randomNumber=Math.floor(Math.random()*allMemes.length)
        const url=allMemes[randomNumber].url
        setMeme(prevState=>({
            ...prevState,
            randomImage:url
        }))
    }
  return (
    <>
    <div className='form'>
        
          <input  
                type="text"
                placeholder='Top Text'
                name='topText'
                value={meme.topText}
                onChange={handleChange}
         />
         <input  
                type="text"
                placeholder='Bottom Tex'
                name='bottomText'
                value={meme.bottomText}
                onChange={handleChange}
         />
         <br />
         <button
           onClick={getMemeImage}
         >Generate New Image</button>
         </div>
         <div className='meme'>
             <img src={meme.randomImage} className='meme-image' />
             <h2 className='meme-text top'>{meme.topText}</h2>
             <h2 className='meme-text bottom'>{meme.bottomText}</h2>

         </div>
    </>
  )
}

export default Meme