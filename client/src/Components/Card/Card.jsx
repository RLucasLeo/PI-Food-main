import s from "./Card.module.css"
import React from "react"
import {Link} from "react-router-dom"

class Card extends React.Component {

   render() {
       return (
           <div className={s.card}>
               
                   <h3 className={s.nombre}>{this.props.title}</h3>
                   <img className={s.image} src={this.props.image} alt=""/>
                   <p className={s.genres}>{this.props.diets}</p>
                <Link to={`/detail/${this.props.id}`} className={s.navLink}><span className={s.leer_mas}>Leer más</span></Link>
            
           </div>
       )
   }

}
export default Card;