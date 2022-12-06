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

function sendToStoreOk(dispatch, filterByContinent, filterByActivity, res){
    let filtered = [];
    if (res.length) {
        if (filterByContinent !== 'Not' && filterByActivity !== 'Not') {
            filtered = res.filter(country => {
                return country.continent === filterByContinent
            });
            filtered = filtered.filter(country => {
                if (country.activities) {
                    let activityIncluded = country.activities.filter(activity => activity.name === filterByActivity);
                    if (activityIncluded.length) return true
                    else return false
                }
                return false
            })
        }
        else if (filterByContinent !== 'Not' && filterByActivity === 'Not') {
            console.log(filterByContinent)
            filtered = res.filter(country => {
                return country.continent === filterByContinent
            });
            console.log(filtered)
        }
        else if (filterByContinent === 'Not' && filterByContinent !== 'Not') {
            filtered = res.filter(country => {
                if (country.activities) {
                    const activityIncluded = country.activities.filter(activity => activity.name === filterByActivity);
                    if (activityIncluded.length) return true
                    else return false
                }
                return false
            })
        }
        else {
            filtered = res
        }
        if (filtered.length) {
            let numOfPages;
            if (filtered.length % 10 === 0) {
                numOfPages = filtered.length / 10;
            } else {
                numOfPages = Math.ceil(filtered.length / 10);
            }
            dispatch({
                type: GET_ALL_COUNTRIES,
                payload: filtered
            });
            dispatch({
                type: LOADER_ON_OFF,
                payload: false
            });
            dispatch({
                type: ALL_PAGES,
                payload: numOfPages
            });
        } else {
            let numOfPages = 1;
            dispatch({
                type: GET_ALL_COUNTRIES,
                payload: [{ id: 1, message: 'Not Found' }]
            });
            dispatch({
                type: LOADER_ON_OFF,
                payload: false
            });
            dispatch({
                type: ALL_PAGES,
                payload: numOfPages
            });
        }
    }
}

function sendToStoreFail (dispatch, error){
    dispatch({
        type: LOADER_ON_OFF,
        payload: false
    });
    dispatch({
        type: ERROR_HANDLER,
        payload: error.message
    });
}

export function getAllCountries(orderName, orderPopulation, filterByContinent='Not', filterByActivity='Not', name ) {
    return async function(dispatch){
        if(name) try {
            const res = await fetch(`http://localhost:3001/countries?name=${name}&orderName=${orderName}&orderPopulation=${orderPopulation}`);
            const res_1 = await res.json();
            return sendToStoreOk(dispatch, filterByContinent, filterByActivity, res_1);
        } catch (error) {
            return sendToStoreFail(dispatch, error);
        }
        else try {
                const res_2 = await fetch(`http://localhost:3001/countries?orderName=${orderName}&orderPopulation=${orderPopulation}`);
                const res_3 = await res_2.json();
                return sendToStoreOk(dispatch, filterByContinent, filterByActivity, res_3);
            } catch (error_1) {
                return sendToStoreFail(dispatch, error_1);
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

export function setOrderName(setOrderName){
    return{
        type:SET_ORDER_NAME,
        payload:setOrderName
    }
}

export function setOrderPopulation(setOrderPopulation){
    return{
        type:SET_ORDER_POPULATION,
        payload:setOrderPopulation
    }
}

export function getAllContinents(){
    return function(dispatch){
        fetch('http://localhost:3001/continents')
            .then(res=>res.json())
            .then(res=>{
                dispatch({
                    type:GET_ALL_CONTINENTS,
                    payload:res
                })
            })
            .catch(error=>{
                dispatch({
                type: ERROR_HANDLER,
                payload: error.message
            })
            })
    }
}

export function getAllActivities(){
    return function (dispatch){
        fetch('http://localhost:3001/activities')
            .then(res=>res.json())
            .then(res=>dispatch({
                type:GET_ALL_ACTIVITIES,
                payload:res
            }))
            .catch(error=>{
                dispatch({
                    type: ERROR_HANDLER,
                    payload: error.message
                })
            })

    }
}

export function setFilters(continent,activity){
    const filters = {continent, activity}
    return{
        type:SET_FILTERS,
        payload:filters
    }
}

export function setAllPages(pages){
    return{
        type:ALL_PAGES,
        payload:pages
    }
}

export function resetName(){
    const reset="";
    return{
        type:SET_NAME,
        payload:reset
    }
}

export function setName(name){
    return{
        type:SET_NAME,
        payload:name
    }
}

export function getCountryDetail (id){
    
    return function(dispatch){
        return fetch(`http://localhost:3001/countries/${id}`)
            .then(res => res.json())
            .then(res => {
                dispatch({
                    type:GET_COUNTRY_DETAIL,
                    payload:res
                })
                dispatch({
                    type:LOADER_ON_OFF,
                    payload:false,
                })
            })
            .catch(error => {
                dispatch({
                    type: ERROR_HANDLER,
                    payload: error.message
                })
                dispatch({
                    type: LOADER_ON_OFF,
                    payload: false,
                })
            })
    }
}

export function cleanCountryDetail(){
    return{
        type:CLEAN_COUNTRY_DETAIL
    }
}

export function cleanCountries(){
    return{
        type:CLEAN_COUNTRTIES
    }
}

export function errorHandlerAdd(message){
    return{
        type: ERROR_HANDLER,
        payload:message
    }
}