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
    SET_NAME
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

export function getAllCountries(orderName, orderPopulation, filterByContinent='Not', filterByActivity='Not', name ) {
    const filters = {filterByContinent,filterByActivity}
    //console.log(e.target.value);
    if (name){
        return function (dispatch) {
            return fetch(`http://localhost:3001/countries?name=${name}&orderName=${orderName}&orderPopulation=${orderPopulation}`)
                .then(res => res.json())
                .then(res =>{
                    let filtered = [];
                    if (res.length) {
                        if (filterByContinent !== 'Not' && filterByActivity !== 'Not') {
                            filtered = res.filter(country => {
                                return country.continent === filterByContinent
                            });
                            filtered = filtered.filter(country => {
                                if (country.activities) {
                                    const activityIncluded = country.activities.filter(activity => activity.name === filterByActivity);
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
                            console.log('else', filterByContinent)
                            filtered = res
                        }
                    if(filtered.length){
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
                        return null;
                    }else{
                        let numOfPages=1;
                        dispatch({
                            type: GET_ALL_COUNTRIES,
                            payload: [{id:1, message:'Not Found'}]
                        });
                        dispatch({
                            type: LOADER_ON_OFF,
                            payload: false
                        });
                        dispatch({
                            type: ALL_PAGES,
                            payload: numOfPages
                        });
                        return null;
                    }
                    }
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

                    let filtered = [];
                    if (res.length) {
                        if (filterByContinent !== 'Not' && filterByActivity !== 'Not') {

                            filtered = res.filter(country => {
                                return country.continent === filterByContinent
                            });
                            filtered = filtered.filter(country => {
                                if (country.activities) {
                                    const activityIncluded = country.activities.filter(activity => activity.name === filterByActivity);
                                    if (activityIncluded.length) return true
                                    else return false
                                }
                                return false
                            })
                        }
                        else if (filterByContinent !== 'Not' && filterByActivity === 'Not'){
                            filtered = res.filter(country => {
                                return country.continent === filterByContinent
                            });
                        }
                        else if (filterByContinent === 'Not' && filterByActivity !== 'Not') {
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
                            return null;
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
                            return null;
                        }
                    }
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