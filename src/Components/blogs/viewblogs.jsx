import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styles from "./viewblog.module.css"
const  Viewblogs = () => {
      const {data}=useSelector(state=>state.blog)
      const {id}=useParams()
      const [state,setState]=useState()
      useEffect(()=>{
          
               let flt=data.find(item=>id==item.blogid)
               setState(flt)
      },[])


  return (
    <div className={styles.main}>
{state &&<div className={styles.viewblog}>
      <div className='w-50'>
      <h3>{state.title}</h3>
      <hr/>
      <p className={styles.description}>{state.description}</p>
      </div>
      <div>
      <img src={state.Image} style={{objectFit:"contain",borderRadius:"5px"}} height={200}/>
</div>
</div>}




    </div>
  )
}

export default Viewblogs