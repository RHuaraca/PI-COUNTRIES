import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    getAllCountries, 
    setOrderName, 
    setOrderPopulation,
    getAllContinents,
    getAllActivities,
    setActualPage,
    setFilters,
    resetName
} from '../redux/actions.js';

function FiltersAndOrderBar (){
    const dispatch = useDispatch()
    const {
        orderName, 
        orderPopulation, 
        continents, 
        errorHandler, 
        activities,
        filterByContinent,
        filterByActivity
    }=useSelector(state=>state)
    const [internalState, setInternalState]= useState({
        orderName:orderName,
        orderPopulation:orderPopulation,
        filterByContinent:filterByContinent,
        filterByActivity:filterByActivity
    });
    useEffect(()=>{
        dispatch(getAllContinents())
        dispatch(getAllActivities())
    },[dispatch]);

    function selectHandler(e){
        setInternalState({
            ...internalState,
            [e.target.name]:e.target.value
        })
        if(e.target.name==="orderName"){
            dispatch(setOrderName(e.target.value));
            dispatch(getAllCountries(e.target.value, internalState.orderPopulation, internalState.filterByContinent, internalState.filterByActivity));
            //dispatch(setFilters(internalState.filterByContinent, internalState.filterByActivity));
        } else if (e.target.name === "orderPopulation"){
            dispatch(setOrderPopulation(e.target.value));
            dispatch(getAllCountries(internalState.orderName, e.target.value, internalState.filterByContinent, internalState.filterByActivity));
            //dispatch(setFilters(internalState.filterByContinent, internalState.filterByActivity));
        } else if (e.target.name === "filterByContinent"){
           dispatch(resetName());
            dispatch(setFilters(e.target.value, internalState.filterByActivity))
            dispatch(setActualPage(1))
            //dispatch(setFilters(e.target.value, internalState.filterByActivity))
            dispatch(getAllCountries(internalState.orderName, internalState.orderPopulation, e.target.value, internalState.filterByActivity));
        } else if (e.target.name === "filterByActivity") {
            dispatch(resetName());
            dispatch(setFilters(internalState.filterByContinent, e.target.value))
            dispatch(setActualPage(1))
            //dispatch(setFilters(internalState.filterByContinent, e.target.value))
            dispatch(getAllCountries(internalState.orderName, internalState.orderPopulation, internalState.filterByContinent, e.target.value));
        }
    }
    return(
        <div>
            <div>
                <h4>Orders</h4>
                <span>By name</span>
                <select name="orderName" onChange={(e)=>selectHandler(e)}>
                    <option value="AZ">from A to Z</option>
                    <option value="ZA">from Z to A</option>
                </select>
                <span>By population</span>
                <select name="orderPopulation" onChange={(e) => selectHandler(e)}>
                    <option value="Not">No order</option>
                    <option value="Max">from Max to Min</option>
                    <option value="Min">from Min to Max</option>
                </select>
            </div>
            <div>
                <h4>Filters</h4>
                <span>By continent</span>
                <select defaultValue={filterByContinent} name="filterByContinent" onChange={(e) => selectHandler(e)}>
                    {!continents.length? 
                        errorHandler.length? 
                            <option>Failed</option> 
                        : <option>Cargando...</option>
                    :<> 
                        <option value='Not'>All</option>
                            {continents.map(continent=> 
                                <option 
                                    key={continent.id} 
                                    value={continent.name}>
                                        {continent.name}
                                </option> )
                            }
                    </>
                    }
                </select>
                <span>By activity</span>
                <select defaultValue={filterByActivity} name="filterByActivity" onChange={(e) => selectHandler(e)}>
                    {!activities.length ? errorHandler.length ?
                        <option>Failed</option>
                        : <option>Cargando...</option> :
                        <>
                            <option value='Not'>All</option>
                            {activities.map(activity =>
                                <option
                                    key={activity.id}
                                    value={activity.name}>
                                    {activity.name}
                                </option>)
                            }
                        </>
                    }
                </select>
            </div>
        </div>
    )
};

export default FiltersAndOrderBar;