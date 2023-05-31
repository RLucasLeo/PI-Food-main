import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import {postRecipes, getDiets} from "../../redux/actions/index"
// import s from "./Create.module.css"
import {useDispatch, useSelector} from "react-redux"

function controlForm (input){
    const reg = new RegExp('^[0-9]+$');
    let errors= {}
    if(!input.title) errors.title = "Intrudizca titulo de la receta"
    if(!input.summary) errors.summary = "Por favor agrege resumen de la receta"
    if(input.healthScore < 0 || input.healthScore > 100 || reg.test(input.healthScore)) errors.healthScore="Introduzca un healthScore entre 0 y 100"
    if(!input.typeDiets) errors.typeDiets="Introduzca los tipos de dietas de la receta"
    return errors;
}

export default function Create(){
    const dispatch = useDispatch();
    const listDiets = useSelector((state)=> state.typediets)
    const [errors, setErrors] = useState({}) //estado para controlar el forumlario
    const [step, setStep] = useState(1)
    const [listSteps, setListSteps] = useState ([])
    const [stepDescription, setStepDescription]=useState("")
    const [input, setInput]= useState({
        title:"",
        summary:"",
        healthScore:"",
        analyzedInstructions:"",
        typeDiets:[],
    })

    useEffect(()=>{
        dispatch(getDiets())
    },[dispatch])
    
    useEffect(()=>{
        setInput((prevInput)=>{
            const stepsString = listSteps.join("|");
            return{
                    ...prevInput,
                    analyzedInstructions: stepsString,
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
            typeDiets: [...input.typeDiets, e.target.vlaue]
        })
    }

    function handleSubmit (e){
        e.preventDefault();
        dispatch(postRecipes(input))
        if(input.title && input.summary && input.healthScore && input.analyzedInstructions && input.typeDiets){
            alert("Recipe created")
            setInput({
                title:"",
                summary:"",
                healthScore:"",
                analyzedInstructions:"",
                typeDiets:[]
            })
        }
        else {alert ("Please fill all the fields")}
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
        else {alert("Please put a step")}
    }

    return (
        <div>
            <Link to="/home"><button>Back to the main page</button></Link>
            <h1>Create your recipe</h1>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={input.title} onChange={(e)=>{handleChange(e)}} />
                    {errors.title && (<p>{errors.title}</p>)}
                </div>

                <div>
                    <label>Summary:</label>
                    <input type="text" name="summary" value={input.summary} onChange={(e)=>{handleChange(e)}} />
                    {errors.summary && (<p>{errors.summary}</p>)}
                </div>

                <div>
                    <label >HealthScore:</label>
                    <input type="text" name="healthScore" value ={input.healthScore} onChange={(e)=>{handleChange(e)}} />
                    {errors.healthScore && (<p>{errors.healthScore}</p>)}
                </div>

                <div>
                    <label>Step by step:</label>
                    <input type="text" name="analyzedInstructions" value={stepDescription} onChange={handleChangeStep} />
                    <button onClick={handleStep}>Add step</button>
                </div>

                <select onChange={(e)=>handleSelect(e)}>
                    {listDiets?.map((d)=>{return <option key={d} value={d}></option>})}
                </select>

                {errors.hasOwnProperty("title") || errors.hasOwnProperty("summary") || errors.hasOwnProperty("healthScore")?
                <p>Please complete all the inputs to create your recupe</p>:
                <button type="submit">Create recipe</button>}

            </form>

            {input.typeDiets.map(e=>{
                return (
                    <div key="typeDiets">
                        <h5>{e}</h5>
                        <button onClick={()=> handleDelete(e)}>X</button>
                    </div>
                )
            })}
        </div>
    )
}