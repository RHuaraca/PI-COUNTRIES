import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "../redux/actions";
import style from './create-activity.module.css';

function CreateActivity (){
    const dispatch = useDispatch()
    const { allCountries } = useSelector(state => state);
    const seasons = ['summer', 'autumn', 'winter', 'spring'];
    const [errors, setErrors] = useState({
        name:'obligatory',
        duration:'obligatory',
        season:'obligatory',
        countries:'Select at least one'
    });
    const [state, setState] = useState({
        countriesList: [],
        difficulty:3,
        countries:[]
    });
    useEffect(()=>{
        if (!allCountries.length){
            dispatch(getAllCountries('AZ', 'Not', 'Not', 'Not'))
        }
        if(allCountries.length){
            setState({
                ...state,
                countriesList: allCountries
            })
        }
    },[allCountries])
    function validators(state){
        let errors={}
        if(!state.name) errors.name='obligatory';
        else if (/^\s+\w+/.test(state.name)) errors.name = 'must not have spaces at the beginning';
        else if (/\w+\s+$/.test(state.name)) errors.name = 'should not have spaces at the end';
        else if (/[^a-zA-Z'\sñáéíóúÁÉÍÓÚÄËÏÖÜäëïöü]/.test(state.name)) errors.name = 'must not contain special characters or numbers';
        else if (!/^[a-zA-Z']{1,46}(( ?[a-zA-Z']+)*?[a-zA-Z']{1,46})?$/.test(state.name)) errors.name ="the name must have the following form 'word ... word'";
        else if (state.name.length > 50) errors.name = 'must not exceed fifty characters';

        if (!state.durationDay && !state.durationHours) errors.duration = 'time obligatory';
        else if (!state.durationDay && state.durationHours === "") errors.duration = 'time obligatory';
        else if (!state.durationDay && state.durationHours === "00:00") errors.duration = 'time obligatory';
        else if (state.durationDay === "" && !state.durationHours) errors.duration = 'time obligatory';
        else if (state.durationDay === "" && state.durationHours === "") errors.duration = 'time obligatory';
        else if (state.durationDay === "" && state.durationHours === "00:00") errors.duration = 'time obligatory';
        else if (state.durationDay === "0" && !state.durationHours) errors.duration = 'time obligatory';
        else if (state.durationDay === "0" && state.durationHours === "") errors.duration = 'time obligatory';
        else if (state.durationDay === "0" && state.durationHours === "00:00") errors.duration = 'time obligatory';
        else if (state.durationDay > 90) errors.duration = 'exceeds the time of a season';
        else if (state.durationDay < 0) errors.duration = 'time cannot be less than zero';

        if (!state.season) errors.season = 'obligatory';

        if (!state.countries.length) errors.countries = 'Select at least one';

        return errors;
    }
    function updateList(e){
        console.log(e.target.value)
        if (e.target.value!=='all'){
            setState({
                ...state,
                countriesList: allCountries.filter(country => {
                    searchingCountry = state.countries.map(countryInSelect => {
                        if (countryInSelect.id === country.id) return true;
                    })
                    return !searchingCountry.includes(true);
                })
            })
        }
    }
    let searchingCountry;
    function handleInputChange(e){
        console.log(e)
        if (e.target.name==='countries'){
            setState({
                ...state,
                countries: state.countries.concat(allCountries.filter(country => country.id === e.target.value))
            })
            setErrors(validators({
                ...state,
                [e.target.name]: state.countries.concat(allCountries.filter(country => country.id === e.target.value))
            }))
        } else {
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
            setErrors(validators({
                ...state,
                [e.target.name]: e.target.value
            }))
        }
        console.log(e.target.name)
        console.log(e.target.value)
    }
    function handleOnSubmit(e) {
        console.log(e.target.value)
    }
    
    function deleteOfSelectedList(e){
        console.log(e)
        e.preventDefault();
        setState({
            ...state,
            countries:state.countries.filter(country=>!(country.id===e.target.value)),
            countriesList: allCountries.filter(country => {
                searchingCountry = state.countries.map(countryInSelect => {
                    if (countryInSelect.id === country.id) return true;
                })
                return !searchingCountry.includes(true);
            })
        })
    }
    let hours
    if(state.durationHours){
        hours = state.durationHours.split(':');
        console.log(hours[1])
    }
    return(
        <div className={style.container}>
            <h2>CREATE NEW ACTIVITY</h2>
            <form onSubmit={(e) => handleOnSubmit(e)} className={style.formContainer}>
                <label >Name:</label>
                <div className={style.orderInLine}>
                    <input onChange={(e) => handleInputChange(e)} type="text" name="name" />
                    {!errors.name ? <span style={{ color: 'green' }}>✔</span> : <span style={{ color: "red" }}>✘</span>}
                </div>
                {errors.name ? <span style={{ color: "red" }}> {errors.name}</span> : <span style={{ color: "transparent" }}>.</span>}

                <br />
                <label >difficulty:</label>
                <div className={style.orderInLine}>
                    <input onChange={(e) => handleInputChange(e)} type="range" min="1" max="5" name="difficulty" defaultValue='3' />
                    <span>{state.difficulty}</span>
                </div>
                <br />

                <label>duration:</label>
                <div className={style.orderInLine}>
                    <input onChange={(e) => handleInputChange(e)} type="number" name="durationDay" min="0" max='90' placeholder="days" style={{ width:"2.7rem" }}/>
                    <input onChange={(e) => handleInputChange(e)} type="time" name="durationHours" />
                    {errors.duration ? <span style={{ color: "red" }}>✘</span> :<span style={{ color: 'green' }}>✔</span> }
                </div>
                {errors.duration ? 
                    <span style={{ color: "red" }}> {errors.duration}</span>
                        : <span style={{ color: 'green' }}>
                            {state.durationDay ? state.durationDay !== '0'? <span>{state.durationDay}</span> :null :null} 
                            {state.durationDay? state.durationDay !== '0'? state.durationDay > 1 ? <span> days </span>:<span> day </span>:null:null} 
                            {state.durationDay? state.durationDay !== '0'? state.durationHours ? state.durationHours !== '00:00'? <span> and </span>:null:null:null:null}
                            {state.durationHours? hours[0] !== '00' ? <span>{hours[0]}</span>:null:null}
                            {state.durationHours ? hours[0] !== '00' && hours[0] !== '01'? <span> hours </span>:null:null }
                            {state.durationHours ? hours[0] !== '00' && hours[0] === '01' ? <span> hour </span> : null :null}
                            {state.durationHours ? hours[0] !== '00'? hours[1] !== '00' ? <span> and </span> : null :null:null}
                            {state.durationHours ? hours[1] !== '00' ? <span> {hours[1]} </span> : null : null}
                            {state.durationHours ? hours[1] !== '00' && hours[1] !== '01' ? <span> minutes </span> : null : null}
                            {state.durationHours ? hours[1] !== '00' && hours[1] === '01' ? <span> minute </span> : null : null}
                           </span>}
                <br />
                
                <div className={style.orderInLine}>
                    <label>select season</label>
                    {errors.season ? <span style={{ color: "red" }}>✘</span> : <span style={{ color: 'green' }}>✔</span>}
                </div>
                {seasons.map((season, i) => (
                    <div key={i}>
                        <input onChange={(e) => handleInputChange(e)} type="radio" name="season" value={season} />
                        <label> {season}</label>
                        <br />
                    </div>))}
                {errors.season ? <span style={{ color: "red" }}> {errors.season}</span> : <span style={{ color: "transparent" }}>.</span>}
                <br />
                
                <div>
                    <label>select countries</label>
                    {errors.countries ? <span style={{ color: "red" }}>✘</span> : <span style={{ color: 'green' }}>✔</span>}
                </div>
                {!state.countriesList.length ? <p>Loading...</p> :
                    <select name="countries" onChange={(e) => handleInputChange(e)} onClick={(e)=>updateList(e)}>
                        <option value="all">All Countries</option>
                        {state.countriesList.map(country => (
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>))
                        }
                    </select>
                }
                <div className={style.countriesContainer}>
                    {!state.countries.length ?
                        <span style={{ color: "red" }}>{errors.countries}</span>
                    :state.countries.map(country=>
                        <div key={country.id}>
                            <span>{country.name}</span>
                            <button onClick={(e) => deleteOfSelectedList(e)} value={country.id}>X</button>
                        </div>
                        )}
                </div>
            </form>
        </div>
    )
}
export default CreateActivity;