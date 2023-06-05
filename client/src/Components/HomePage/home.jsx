import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Cards from "../Cards/Cards"
import Filtros from "../Filtros/Filtros";
import Paginado from "../Paginado/Paginado"
import { useEffect, useState } from "react";
import { filterByDiets, filterCreated, orderByName, orderByScore } from "../../redux/actions";

export default function Home (){
    const dispatch = useDispatch();
    const allRecipes = useSelector(state=>state.recipes)
   
    const [//orden
    , setOrden] = useState("")
    const[currentPage, setCurrentPage]= useState(1)
    const recetasPorPag=9;
    const indexUltiJuego= currentPage * recetasPorPag;
    const indexPrimJuego= indexUltiJuego - recetasPorPag;
    const currentRecipes= allRecipes.slice(indexPrimJuego, indexUltiJuego)//esto es para el card

   const paginado= (pageNumber)=>{
      setCurrentPage(pageNumber)
   }
   useEffect(()=>{
    window.scrollTo(0,0)
   },[currentPage])

   const handleFilterByDiets=(e)=>{
    e.preventDefault();
    const dietas = e.target.value;
    dispatch(filterByDiets(dietas));
   }

   const handleFilterCreated=(e)=>{
    e.preventDefault();
    dispatch(filterCreated(e.target.value))
   }

   const handleSort=(e)=>{
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`ordenado ${e.target.value}`);
   }

   const handleByScore=(e)=>{
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setOrden(`ordenado ${e.target.value}`);
   }

    return (
        <div>
        <Navbar></Navbar>
        <Paginado recetasPorPag={recetasPorPag} allRecipes={allRecipes.length} paginado={paginado}></Paginado>
        <Filtros handleSort={handleSort} handleByScore={handleByScore} handleFilterByDiets={handleFilterByDiets} handleFilterCreated={handleFilterCreated}></Filtros>
        <Cards currentRecipes={currentRecipes}></Cards>
        </div>
    )
}