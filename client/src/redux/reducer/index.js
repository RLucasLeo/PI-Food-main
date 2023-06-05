export const initialState = {
    recipes: [],
    allRecipes : [],
    details : [],
    typediets :[]
}

function rootReducer (state=initialState, action) {
    switch(action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload, 
                allRecipes: action.payload,
                
            }

        case 'FILTER_BY_TYPEDIET':
        let auxi=[];
        if(typeof action.payload ==='string'){auxi = [action.payload]}
        else{auxi = action.payload}
        const recipesFiltradas = state.recipes.filter((recipe)=>{
            return recipe.diets.some((dieta)=> {
            return auxi.includes(dieta.name)})
        })
        return {
            
            ...state,
            recipes: recipesFiltradas,
        }
        
        

        case 'FILTER_CREATED':
           switch(action.payload){
            case ('Api'):
                 return {...state, 
                recipes: state.allRecipes.filter((recipe)=> !isNaN(recipe.id))
                        }
            case ('Created'):
                return {
                    ...state,
                    recipes: state.allRecipes.filter((recipe)=>isNaN(recipe.id))
                        }
            case ('All'):
                return {
                    ...state,
                    recipes: state.allRecipes
                }
                default: return {...state}
           }

        case 'ORDER_BY_NAME' :
            let order = action.payload === 'asc' ? 
            state.recipes.sort(function(a,b) {
                
                if(a.title.toLowerCase() > b.title.toLowerCase()) {
                  
                    return 1
                }
                if( b.title.toLowerCase() > a.title.toLowerCase()){
                    return -1
                }
                return 0
            }) : 
            state.recipes.sort(function(a,b) {
                if(a.title.toLowerCase() > b.title.toLowerCase()) {
                    return -1
                }
                if( b.title.toLowerCase() > a.title.toLowerCase()){
                    return 1
                }
                return 0
            })
            return{
                ...state ,
                recipes : order

        }

        case 'ORDER_BY_PUNTUATION' : 
        let orderpunt = action.payload === 'menormayor' ? 
            state.recipes.sort(function(a,b) {
                if(a.healthScore > b.healthScore) {
                    return 1
                }
                if( b.healthScore > a.healthScore){
                    return -1
                }
                return 0
            }) : 
            state.recipes.sort(function(a,b) {
                if(a.healthScore > b.healthScore) {
                    return -1
                }
                if( b.healthScore > a.healthScore){
                    return 1
                }
                return 0
            })
            if(action.payload === 'mayorcincuenta'){
                const orderpunt = state.recipes.filter(t => t.healthScore >= 50)
                return{
                    ...state ,
                    recipes : orderpunt
                }
            }
            if(action.payload === 'menorcincuenta'){
                    const orderpunt = state.recipes.filter(t => t.healthScore <= 50)
            return{
                ...state ,
                recipes : orderpunt
        }
        }
            return{
                ...state ,
                recipes : orderpunt
        }
        case 'GET_BY_NAME':
            return {
                ...state,
                recipes: action.payload,
            }
        case 'GET_BY_ID':
            return{
                ...state,
                details: action.payload
            }
        case 'POST_RECIPE':
                return{
                    ...state,
                }
        case 'GET_TYPE_DIETS':
            return {
                ...state,
                typediets : action.payload
            }        
        case 'DELETE_RECIPE':
            return{
                ...state,
            }
       
        default:
            return state;
    }
}

export default rootReducer;