import React from 'react'
import Loader from '../components/Loader'
import { useContext } from 'react';
import { appContext } from '../App';
import '../static/extractedText.css'
const ExtractedText = () => {
    const {data,isLoading}=useContext(appContext);
  return (
    <div>
      {isLoading===true ? (<Loader/>) : <div className='para'><pre>{data.translated_text}</pre></div>}
    </div>
  )
}

export default ExtractedText
