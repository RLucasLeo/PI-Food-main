import styles from "./Navbar.module.css"
import React, {useState} from "react";
import {useDispatch} from "react-redux"
import { Link } from "react-router-dom";
import { getRecipesByName } from "../../redux/actions";


export default function Navbar (){

  const[search, setSearch]= useState("")
  const dispatch= useDispatch();

//   const handleChange=(e)=>{
//     e.preventDefault()
//     setState(e.target.value)
//   }
  const handleInputName=(e)=>{
    setSearch(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault(e);
      dispatch(getRecipesByName(search));
      setSearch(""); 
  }

   return(
    
    <div className={styles.navbar}>  
       <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}>
          <input
            type="text" placeholder="Buscar por nombre" value={search}
            onChange={(e) => {
              handleInputName(e);
            }}
            className={styles.searchbar}></input>
          <button type="submit" className={styles.Button}>
            Buscar
          </button>
        </form> <div> <br />
      <span ><Link to={'/create'} className={styles.Button2}> Crear Receta</Link></span></div>
    </div>
    
   )
}