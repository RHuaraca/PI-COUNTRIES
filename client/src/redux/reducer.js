import { 
    GET_ALL_COUNTRIES, 
    NAV_BAR_ACTIVE,
    LOADER_ON_OFF,
    ERROR_HANDLER,
    ALL_PAGES,
    ACTUAL_PAGE,
    INCREMENT_ACTUAL_PAGE,
    DECREMENT_ACTUAL_PAGE,
    SET_ACTUAL_PAGE,
    SWITCH_MODAL_ACTIVE
} from "./actionTypes"

const initialState = {
    allCountries: [],
    country : [],
    continents : [],
    activities: [],
    activity: [],
    orderName: 'AZ',
    orderPopulation: 'Not',
    navBarActive:true,
    loader:null,
    errorHandler:[],
    allPages:0,
    actualPage:1,
    modalActive:false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case NAV_BAR_ACTIVE:
            return{
                ...state,
                navBarActive:action.payload
            }
        case LOADER_ON_OFF:
            return{
                ...state,
                loader:action.payload
            }
        case ERROR_HANDLER:
            return{
                ...state,
                errorHandler:[...state.errorHandler, {error:action.payload}]
            }
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload
            }
        case ALL_PAGES:
            return{
                ...state,
                allPages:action.payload
            }
        case ACTUAL_PAGE:
            return{
                ...state,
                actualPage:action.payload
            }
        case INCREMENT_ACTUAL_PAGE:
            return{
                ...state,
                actualPage:state.actualPage+1
            }
        case DECREMENT_ACTUAL_PAGE:
            return{
                ...state,
                actualPage:state.actualPage-1
            }
        case SET_ACTUAL_PAGE:
            return{
                ...state,
                actualPage:action.payload
            }
        case SWITCH_MODAL_ACTIVE:
            return{
                ...state,
                modalActive:action.payload 
            }
        default:
            return state
    }
}