import React from 'react'
import Loader from '../components/Loader'
import { useContext } from 'react';
import { appContext } from '../App';
import '../static/extractedText.css'
const ExtractedText = () => {
    const {data,isLoading}=useContext(appContext);
    // console.log(data);
  return (
    <div>
      {isLoading===true ? (<Loader/>) : <div className='para'><pre>{data}</pre></div>}
    </div>
  )
}

export default ExtractedText
