import s from "./Card.module.css"
import React from "react"
import {Link} from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteRecipes } from "../../redux/actions"

const Card = (props)=> {

   const dispatch = useDispatch()
       return (
           <div className={s.card}>
               
                   <h3 className={s.nombre}>{props.title}</h3>
                   <img className={s.image} src={props.image} alt=""/>
                   <p className={s.genres}>{props.diets}</p>                  
                <Link to={`/detail/${props.id}`} className={s.navLink}><span className={s.leer_mas}>Leer más</span></Link>
            
           </div>
       )
   

}

export default Card;