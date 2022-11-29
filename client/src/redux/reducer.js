import { 
    GET_ALL_COUNTRIES, 
    NAV_BAR_ACTIVE,
    LOADER_ON_OFF,
    ERROR_HANDLER,
    ALL_PAGES,
    INCREMENT_ACTUAL_PAGE,
    DECREMENT_ACTUAL_PAGE,
    SET_ACTUAL_PAGE,
    SET_ORDER_NAME,
    SET_ORDER_POPULATION,
    GET_ALL_CONTINENTS,
    GET_ALL_ACTIVITIES,
    SET_FILTERS,
    SET_NAME,
    GET_COUNTRY_DETAIL,
    CLEAN_COUNTRY_DETAIL,
    CLEAN_COUNTRTIES
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
    filterByContinent:'Not',
    filterByActivity:'Not',
    allCountriesToRender:[],
    actualName:""
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
        case SET_ORDER_NAME:
            return{
                ...state,
                orderName:action.payload
            }
        case SET_ORDER_POPULATION:
            return{
                ...state,
                orderPopulation:action.payload
            }
        case GET_ALL_CONTINENTS:
            return{
                ...state,
                continents:action.payload
            }
        case GET_ALL_ACTIVITIES:
            return{
                ...state,
                activities:action.payload
            }
        case SET_FILTERS:
            return{
                ...state,
                filterByContinent:action.payload.continent,
                filterByActivity:action.payload.activity
            }
        case SET_NAME:
            console.log(action.payload)
            return{
                ...state,
                actualName:action.payload
            }
        case GET_COUNTRY_DETAIL:
            return{
                ...state,
                country:action.payload
            }
        case CLEAN_COUNTRY_DETAIL:
            return{
                ...state,
                country:[]
            }
        case CLEAN_COUNTRTIES:
            return{
                ...state,
                allCountries:[]
            }
        default:
            return state
    }
}