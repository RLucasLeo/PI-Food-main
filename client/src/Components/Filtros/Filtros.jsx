import { useEffect } from "react";
import s from "./Filtros.module.css"
import { useDispatch, useSelector } from "react-redux"
import { getDiets } from "../../redux/actions";

export default function Filtros ({handleSort, handleByScore, handleFilterByDiets}){
   const dispatch = useDispatch();
   const dietas = useSelector(state=>state.dietas)
    console.log("CONSOLE LOG DE DIETAS",dietas)
   useEffect(()=>{
    dispatch(getDiets())
   },[dispatch])
    return(
        <div className={s.box}>
        <select onChange={e => handleSort(e)}>
            <option value="" >Ordenar por...</option>
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
            {dietas && dietas.length > 0 ? (
            dietas.map((d) => (
             <option key={d.id} value={d.name}>{d.name}</option>))
                ) : <option>Error carga Dietas</option> }
            <option value="createdInDb">Creados</option>
            
        </select>
        
</div>
    )
}