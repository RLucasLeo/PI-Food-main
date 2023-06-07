import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import {postRecipes, getDiets} from "../../redux/actions/index"
 import s from "./Create.module.css"
import {useDispatch, useSelector} from "react-redux"

function controlForm (input){
    let errors= {}
    if(!input.title) errors.title = "Intrudizca titulo de la receta";
    if(!input.image) errors.image = "Ingrese una URL de imagen"
    if(!input.summary) errors.summary = "Por favor agrege resumen de la receta"
    if(input.healthScore < 0 || input.healthScore > 100) errors.healthScore="Introduzca un healthScore entre 0 y 100"
    if(!input.typeDiets) errors.typeDiets="Introduzca los tipos de dietas de la receta"
    if(!input.instructions) errors.instructions="Introduzca 1 paso como minimo"
    return errors;
}

export default function Create(){
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({}) //estado para controlar el forumlario
    const [step, setStep] = useState(1)
    const listDiets = useSelector((state)=> state.typediets)
    const [listSteps, setListSteps] = useState ([])
    const [stepDescription, setStepDescription]=useState("")
    const [input, setInput]= useState({
        title:"",
        image:"",
        summary:"",
        healthScore:"",
        instructions:"",
        typeDiets:[],
    })

    useEffect(()=>{
        dispatch(getDiets())
    },[dispatch])
    
    useEffect(()=>{
        setInput((prevInput)=>{
            const stepsString = listSteps.join(" | ");
            return{
                    ...prevInput,
                    instructions: stepsString,
            } 
        })
    }, [listSteps, setInput])

    function handleChange(e){
        setInput({
            ...input, 
            [e.target.name]: e.target.value
        })
            setErrors(controlForm({
                ...input,
                [e.target.name]: e.target.value
            }))
    }

    function handleSelect(e){
        setInput({
            ...input,
            typeDiets: [...input.typeDiets, e.target.value]
        })
    }

    function handleSubmit (e){
        e.preventDefault();
        if(input.title && input.image &&input.summary && input.healthScore && input.instructions && input.typeDiets){
            dispatch(postRecipes(input))
            alert("Receta creada")
            window.location.href = '/home'
            setInput({
                title:"",
                image:"",
                summary:"",
                healthScore:"",
                instructions:"",
                typeDiets:[]
            })
        }
        else {alert ("Por favor complete todos los campos")}
    }

    function handleDelete (e){
        setInput({
            ...input,
            typeDiets: input.typeDiets.filter(diet=> diet !== e)
        })
    }

    function handleChangeStep(e){
        setStepDescription(e.target.value)
    }

    function handleStep(e){
        e.preventDefault();
        if(stepDescription !== ""){
            setListSteps([
                ...listSteps, stepDescription
            ])
            setStep(step + 1 )
            setStepDescription("")
        }
        else {alert("Intruduzca un paso como minimo")}
    }

    return (
        <div className={s.containerBox}>
            <Link to="/home"><button className={s.myButton}>Regresar</button></Link>
            <h1>¡Crea tu receta!</h1>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <div>
                    <label>Titulo</label>
                    <input type="text" name="title" value={input.title} onChange={(e)=>{handleChange(e)}} />
                    {errors.title && (<p className={s.errmsg}>{errors.title}</p>)}
                </div>

                <div>
                    <label>Imagen</label>
                    <input type="url" name="image" value={input.image} onChange={(e)=>{handleChange(e)}} />
                    {errors.image && (<p className={s.errmsg}>{errors.image}</p>)}
                </div>

                <div>
                    <label>Resumen </label>
                    <input type="text" name="summary" value={input.summary} onChange={(e)=>{handleChange(e)}} />
                    {errors.summary && (<p className={s.errmsg}>{errors.summary}</p>)}
                </div>

                <div>
                    <label >HealthScore </label>
                    <input type="number" name="healthScore" value ={input.healthScore} onChange={(e)=>{handleChange(e)}} />
                    {errors.healthScore && (<p className={s.errmsg}>{errors.healthScore}</p>)}
                </div>

                <div>
                    <label>Paso a paso </label>
                    <input type="text" name="instructions" value={stepDescription} onChange={handleChangeStep} />
                    <button className={s.myButton2} onClick={handleStep}>Añadir paso</button>
                </div>

                <label>Tipo de dieta </label>
                <select onChange={(e)=>handleSelect(e)}>
                    {listDiets?.map((t)=>{
                        return <option key={t} value={t}>{t}</option>
                    })}
                </select>

                {errors.hasOwnProperty("title") || errors.hasOwnProperty("summary") || errors.hasOwnProperty("healthScore")?
                <p className={s.errmsg}>Por favor complete todos los campos para crear su receta</p>:
                <button className={s.myButton3} type="submit">Crear receta</button>}

            </form>

            {input.typeDiets.map(e=>{
                console.log("log de borrar dietas", input.typeDiets)
                return (
                    <div key={e} className={s.diets}>
                        <p>{e}</p>
                        <button className={s.dietsB} onClick={()=> handleDelete(e)}>X</button>
                    </div>
                )
            })}
        </div>
    )
}