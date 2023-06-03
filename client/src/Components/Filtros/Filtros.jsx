import React from "react";
import { useEffect } from "react";
import s from "./Filtros.module.css"
import { useDispatch } from "react-redux"
import { getDiets } from "../../redux/actions/index";

export default function Filtros ({handleSort, handleByScore, handleFilterByDiets}){
   const dispatch = useDispatch();
   useEffect(()=>{
    dispatch(getDiets())
   },[dispatch])
    return(
        <div className={s.box}>
        <select onChange={e => handleSort(e)}>
            <option value="Todos" >Ordenar por...</option>
            <option value="asc" >A-Z</option>
            <option value="desc" >Z-A</option>
        </select>

        <select onChange={e => handleByScore(e)}>
             <option value=''>Ordenar por HealthScore</option>
             <option value="menormayor">Menor a mayor score</option>
             <option value="mayormenor">Mayor a menor score</option>
             <option value="mayorcincuenta">Mas de 50</option>
             <option value="menorcincuenta">Menos de 50</option>
        </select>

        <select onChange={e => handleFilterByDiets(e)}>
            <option value='All'>Todas las dietas</option>
            <option value='gluten free'>Gluten free</option>
            <option value='ketogenic'>Ketogenic</option>
            <option value='dairy free'>Dairy free</option>
            <option value='lacto ovo vegetarian'>lacto ovo vegetarian</option>
            <option value='vegan'>vegan</option>
            <option value='pescatarian'>pescatarian</option>
            <option value='paleolithic'>paleolithic</option>
            <option value='primal'>primal</option>
            <option value='whole 30'>whole 30</option>
             
            <option value="createdInDb">Creados</option>
            
        </select>
        
</div>
    )
}