import axios from 'axios';
const GET_RECIPES = 'GET_RECIPES';
const FILTER_BY_TYPEDIET = 'FILTER_BY_TYPEDIET';
const ORDER_BY_NAME = 'ORDER_BY_NAME';
const ORDER_BY_PUNTUATION = 'ORDER_BY_PUNTUATION';
const GET_BY_NAME = 'GET_BY_NAME';
const GET_BY_ID = 'GET_BY_ID';
const  GET_TYPE_DIETS = 'GET_TYPE_DIETS';
const DELETE_RECIPE = 'DELETE_RECIPE';

export const getRecipes=()=>{
    return async(dispatch)=>{
        try {
            const {data} = await axios.get("http://localhost:3000/recipes");
            return dispatch({
                type: "GET_RECIPES",
                payload: data,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const filterByDiets = (payload)=>{
    return{
        tpye: "FILTER_BY_TYPEDIET",
        payload
    }
}

export const orderByName =(payload)=>{
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}

export const orderByScore=(payload)=>{
    return{
        type: "ORDER_BY_PUNTUATION",
        payload
    }
}

export const getRecipesByName=(name)=>{
    return async (dispatch)=>{
        try {
            const {data}= await axios.get(`http://localhost:3000/videogames?name=${name}`);
            return dispatch ({
                type: "GET_BY_NAME",
                payload: data,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getRecipesById = (id) =>{
return async (dispatch)=>{
     try {
        const {data}= await axios.get(`http://localhost:3000/recipes/${id}`)
        return dispatch({
            type: "GET_BY_ID",
            payload: data,
        })
     } catch (error) {
        console.log(error)
        }
    }
}

export const getDiets(){
    return async (dispatch)=>{
        try {
            const {data} = await axios.get("http://")
        } catch (error) {
            
        }
    }
}