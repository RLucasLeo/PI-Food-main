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
        let auxi=[]
        if(action.payload){
            auxi = state.recipes.filter(e=>{
                if(e.diets.length === 0){
                    console.log("ESTE ES DE === 0")
                    return e.diets;
                }
                else if (e.diets.some(e=> e.title === action.payload)){
                    console.log("else if", e.diets)
                        return e.diets.map(el=>el.title)
                        }
                else {console.log("else ", e.diets)
                   return e.diets.includes(action.payload)
               }
                    })
               }
               else { console.log("log del else fuera")
                   auxi=state.recipes;
              }
               return {
                  ...state,
                   allRecipes: auxi,
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