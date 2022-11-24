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
} from "./actionTypes";

export function activeNavBar(boolean){
    return{
        type:NAV_BAR_ACTIVE,
        payload:boolean
    }
}

export function loaderOnOf(boolean){
    return{
        type:LOADER_ON_OFF,
        payload:boolean
    }
}

export function getAllCountries(orderName, orderPopulation, name) {
    if (name){
        return function (dispatch) {
            return fetch(`http://localhost:3001/countries?name=${name}&orderName=${orderName}&orderPopulation=${orderPopulation}`)
                .then(res => res.json())
                .then(res =>{
                    let numOfPages;
                    console.log(res.length)
                    if (res.length % 10 === 0) {
                        numOfPages = res.length / 10;
                    }else{
                        numOfPages = Math.ceil(res.length / 10);
                    }
                    console.log(numOfPages);
                    dispatch({
                        type: GET_ALL_COUNTRIES,
                        payload: res
                    });
                    dispatch({
                        type: LOADER_ON_OFF,
                        payload: false
                    });
                    dispatch({
                        type: ALL_PAGES,
                        payload:numOfPages
                    });
                    dispatch({
                        type: ACTUAL_PAGE,
                        payload:1
                    });
                    return null;
                })
                .catch(error => {
                    dispatch({
                        type: LOADER_ON_OFF,
                        payload: false
                    });
                    dispatch({
                        type: ERROR_HANDLER,
                        payload: error.message
                    });
                    return null;
                })
        }
    }
    else {
        return function (dispatch) {
            return fetch(`http://localhost:3001/countries?orderName=${orderName}&orderPopulation=${orderPopulation}`)
                .then(res => res.json())
                .then(res => {
                    let numOfPages;
                    if (res.length % 10 === 0) {
                        numOfPages = res.length / 10;
                    } else {
                        numOfPages = Math.ceil(res.length / 10);
                    }
                    dispatch ({
                        type: GET_ALL_COUNTRIES,
                        payload: res
                    });
                    dispatch({
                        type: LOADER_ON_OFF,
                        payload: false
                    });
                    dispatch({
                        type: ALL_PAGES,
                        payload: numOfPages
                    });
                    dispatch({
                        type: ACTUAL_PAGE,
                        payload: 1
                    });
                    return null;
                })
                .catch(error =>{
                    dispatch( {
                        type: LOADER_ON_OFF,
                        payload: false
                    });
                    dispatch({
                        type: ERROR_HANDLER,
                        payload: error.message
                    });
                    return null
                })
        }
    }
}

export function incrementActualPage(){
    return{
        type:INCREMENT_ACTUAL_PAGE,
    }
}

export function decrementActualPage(){
    return{
        type:DECREMENT_ACTUAL_PAGE
    }
}

export function setActualPage(setPage){
    return{
        type:SET_ACTUAL_PAGE,
        payload:setPage
    }
}

export function switchModalActive(boolean){
    return{
        type:SWITCH_MODAL_ACTIVE,
        payload:boolean
    }
}