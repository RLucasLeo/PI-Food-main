import s from "./Card.module.css"
import React from "react"
import {Link} from "react-router-dom"

const Card = (props)=> {
    const imgCarga = <img className={s.image} src="https://img.freepik.com/fotos-premium/manos-femeninas-sostienen-cubiertos-sobre-plato-vacio-naranja_185193-33404.jpg?w=740" alt="Imagen no disponible" />
       return (
           <div className={s.card}>
               
                   <h3 className={s.nombre}>{props.title}</h3>
                   {props.image? (<img className={s.image} src={props.image} alt=""/>) : imgCarga }
                   <p className={s.genres}>{props.diets}</p>                  
                <Link to={`/detail/${props.id}`} className={s.navLink}><span className={s.leer_mas}>Leer más</span></Link>
            
           </div>
       )
   

}

export default Card;