import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getRecipesById, deleteRecipes } from "../../redux/actions/index";
import s from './Detail.module.css'


export default function Detail() {

    const [carga, setCarga] = useState(true);
    const {id} = useParams() //rutas dinamicas, Podemos acceder a cualquier parámetro de ruta de una ruta declarada con su componente asociado usando el hook useParams.
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getRecipesById(id)).then(() => setCarga(false))
    }, [dispatch, id])

    function recipeDeleted(){
        window.alert('Recipe Deleted');
        window.location.href = '/home';
    }

    const details = useSelector(state => state.details)
    console.log("Log del details",details)

    if (carga) {
        return (<img className={s.carga}src="https://icon-library.com/images/loading-icon-animated-gif/loading-icon-animated-gif-7.jpg" alt="CARGANDO" />);
      }

    var regex = /(<([^>]+)>)/gi;

    const { title, image, healthScore, diets, summary, createdAt } = details[0];

    return (
        <div className={s.card}>
           
            <h4>ID de la receta: {id}</h4>
           
            <h1>{title}</h1> 
            
            <img className={s.image}src={image} alt={`${title}'s`}/>
            <br />
           
            <div className={s.texto}>
                 <div >💡Summary: {summary?.replace(regex, '').replace('&#39', '')}</div>
            </div>

            <p >💪HealthScore: {healthScore}</p>
            
            <div>
        <h3>📋Step by step:</h3>
        <div>
          {Array.isArray(details[0].instructions) ? details[0].instructions.map(e => e.steps.map(f => (
          <li>{f.step}</li>))) : details[0].instructions.split('|').map(step => <li key={step}>{step}</li> ) }
        </div>
        
      </div>

            <p>❤️Type of diets: {diets?.map(g => (g.name ? g.name : g)).join(' | ')}</p>
           
            {createdAt ? (
                <button className={s.myButtonD} onClick={() => {dispatch(deleteRecipes(id)); recipeDeleted();}}>
                  Delete
                </button>
              ) : null}

            <div >
                <div>
                    <NavLink to={'/home'} className={s.myButton}>
                       Regresar
                    </NavLink>
                </div>
            </div>

        </div>
    );
}