import s from "./Cards.module.css"
import Card from "../Card/Card"
import { useDispatch } from "react-redux"
import React from "react";
import { useState } from "react";
import { getRecipes } from "../../redux/actions";

const Cards = ({currentRecipes}) => {
   const dispatch = useDispatch()
   const [carga, setCarga] = useState(true);

   React.useEffect(() => {
       dispatch(getRecipes()).then(() => setCarga(false)) //me traigo la action creators q me trae todos mis recetas de la API
   }, [dispatch])

   const errorCarga = <h4 className={s.errorCarga}>⚠No se econtró ninguna receta</h4>
   if(carga){
      return(
         <img className={s.carga}src="https://icon-library.com/images/loading-icon-animated-gif/loading-icon-animated-gif-7.jpg" alt="CARGANDO" />
      )
   }

   return (
       <div className={s.containerCard}>
           {currentRecipes.length > 0 ?
           currentRecipes?.map(v => {
               return (<Card
                   key={v.id}
                   id={v.id}
                   image={v.image ? v.image : "IMAGEN AQUI"}
                   title={v.title}
                   diets={v.diets?.map(e => typeof (e) === 'object' ? e.name : e).join(', ')}
                   rating={v.rating}
                   />)}) : errorCarga}

       </div>
   )
}

export default Cards;