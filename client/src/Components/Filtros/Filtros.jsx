import React from "react";
import { useEffect } from "react";
import s from "./Filtros.module.css"
import { useDispatch, useSelector } from "react-redux"
import { getDiets } from "../../redux/actions/index";

export default function Filtros ({handleSort, handleByScore, handleFilterByDiets, handleFilterCreated}){
    const listDiets = useSelector((state)=> state.typediets)
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
             <option value='All'>Ordenar por HealthScore</option>
             <option value='menormayor'>Menor a mayor score</option>
             <option value='mayormenor'>Mayor a menor score</option>
            
        </select>

        <select onChange={e => handleFilterByDiets(e)}>
            <option value='All'>Todas las dietas</option>
            {listDiets?.map((t)=>{
        return <option key={t} value={t}>{t}</option>
                    })}
        </select>
            
        <select onChange={(e)=>handleFilterCreated(e)}>
                <option value='All'>Todas las recetas</option>
                <option value='Created'>Creados</option>
        </select>
        
</div>
    )
}