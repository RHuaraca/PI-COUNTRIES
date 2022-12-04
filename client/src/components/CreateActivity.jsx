import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllActivities, getAllCountries, loaderOnOf, errorHandlerAdd } from "../redux/actions";
import ActivityCard from "./ActivityCard";
import style from './create-activity.module.css';
import ErrorHandler from "./ErrorHandler";
import { Link } from "react-router-dom";
import activityImage1 from '../assets/activity1.jpg';
import activityImage2 from '../assets/activity2.jpg';
import activityImage3 from '../assets/activity3.jpg';

function CreateActivity (){
    const dispatch = useDispatch()
    const { allCountries, activities, errorHandler } = useSelector(state => state);
    const seasons = ['Summer', 'Autumn', 'Winter', 'Spring'];
    let searchingCountry;
    let hours;
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
        if(!activities.length){
            dispatch(getAllActivities())
        }
        if (!allCountries.length){
            dispatch(getAllCountries('AZ', 'Not', 'Not', 'Not'))
        }
        if(allCountries.length){
            setState({
                ...state,
                countriesList: !state.countries?allCountries:allCountries.filter(country => {
                    searchingCountry = state.countries.map(countryInSelect => {
                        if (countryInSelect.id === country.id) return true;
                    })
                    return !searchingCountry.includes(true);
                })
            })
        }
    },[allCountries, state.countries])

    function validators(state){
        let errors={}
        if(!state.name) errors.name='obligatory';
        else if (/^\s+\w+/.test(state.name)) errors.name = 'must not have spaces at the beginning';
        else if (/\w+\s+$/.test(state.name)) errors.name = 'should not have spaces at the end';
        else if (/[^a-zA-Z'\sñáéíóúÁÉÍÓÚÄËÏÖÜäëïöü]/.test(state.name)) errors.name = 'must not contain special characters or numbers';
        else if (!/^[a-zA-Z']{1,46}(( ?[a-zA-Z']+)*?[a-zA-Z']{0,46})?$/.test(state.name)) errors.name ="the name must have the following form 'word ... word'";
        else if (state.name.length > 50) errors.name = 'must not exceed fifty characters';
        else if (state.name){
            let match = activities.filter(activity=> activities.map(activitySearch=>{
                if(activitySearch.name===state.name)return true
            }).includes(true))
            if (match.length){
                errors.name = 'this activity already exists';
            } 
        }

        if (!state.durationDay && !state.durationHours) errors.duration = 'time obligatory';
        else if (!state.durationDay && state.durationHours === "") errors.duration = 'time obligatory';
        else if (!state.durationDay && state.durationHours === "00:00") errors.duration = 'time obligatory';
        else if (state.durationDay === "" && !state.durationHours) errors.duration = 'time obligatory';
        else if (state.durationDay === "" && state.durationHours === "") errors.duration = 'time obligatory';
        else if (state.durationDay === "" && state.durationHours === "00:00") errors.duration = 'time obligatory';
        else if (state.durationDay === "0" && !state.durationHours) errors.duration = 'time obligatory';
        else if (state.durationDay === "0" && state.durationHours === "") errors.duration = 'time obligatory';
        else if (state.durationDay === "0" && state.durationHours === "00:00") errors.duration = 'time obligatory';
        else if (state.durationDay && state.durationDay%1 !== 0) errors.duration = 'the days must be integers';
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

    async function handleOnSubmit(e) {
        e.preventDefault();
        let duration=0;
        if(state.durationDay){
            duration = state.durationDay*24;
        }
        if(state.durationHours){
            if(Number(hours[0])!==0){
                duration = duration + Number(hours[0]);
            }
            if(Number(hours[1])!==0){
                duration = duration + Math.round((Number(hours[1])/60)*100)/100;
            }
        }
        let toSend = {
            name:state.name,
            difficulty:state.difficulty,
            season:state.season,
            countries: state.countries.map(country=>country.id),
            duration:duration
        }
        console.log(toSend);
        fetch('http://localhost:3001/activities', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toSend)
        })
            .then(res => res.json())
            .then(res => setState({
                ...state,
                response:res
            }))
            .catch(error =>
                setState({
                    ...state,
                    response:{error:error.message}
                })
            )
    }
    
    function deleteOfSelectedList(e){
        console.log(e)
        e.preventDefault();
        setState({
            ...state,
            countries:state.countries.filter(country=>!(country.id===e.target.value))
        })
        setErrors(validators({
            ...state,
            countries: state.countries.filter(country => !(country.id === e.target.value))
        }))
    }

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
                    <input onChange={(e) => handleInputChange(e)} type="text" name="name" className={style.widthOfInput}/>
                    {!errors.name ? <span style={{ color: 'green' }}>✔</span> : <span style={{ color: "red" }}>✘</span>}
                    <input type="submit" value='Ready to Submit' className={(Object.keys(errors).length)?style.sendInvisible:style.sendVisible}/>
                </div>
                {errors.name ? <span style={{ color: "red" }}> {errors.name}</span> : <span style={{ color: "transparent" }}>.</span>}
                
                <br />
        <div className={style.containerOfTextAndImages}>
            <div className={style.containerOfDifficultyDurationSeason}>    
                <label >Difficulty:</label>
                <div className={style.orderInLine}>
                    <input onChange={(e) => handleInputChange(e)} type="range" min="1" max="5" name="difficulty" defaultValue='3' />
                    <span>{state.difficulty}</span>
                </div>
                <br />

                <label>Duration:</label>
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
                    <label>Select season</label>
                    {errors.season ? <span style={{ color: "red" }}>✘</span> : <span style={{ color: 'green' }}>✔</span>}
                </div>
                {seasons.map((season, i) => (
                    <div key={i}>
                        <input onChange={(e) => handleInputChange(e)} type="radio" name="season" value={season} />
                        <label> {season}</label>
                        <br />
                    </div>))}
                {errors.season ? <span style={{ color: "red" }}> {errors.season}</span> : <span style={{ color: "transparent" }}>.</span>}
                
            </div>
                    <div className={style.imagesContainer1}> 
                        <img src={activityImage2} alt="example1" />
                    </div>
                    <div className={style.imagesContainer2}>
                        <img src={activityImage1} alt="example2" />
                        <img src={activityImage3} alt="example3" />
                    </div>   
        </div>
                <br />
                <label>Select countries</label>
                <div className={style.orderInLine}>
                {errorHandler.length? errorHandler.map(error=><ErrorHandler error={error.error}/>)
                :!state.countriesList.length ? <p>Loading...</p> :
                    <select name="countries" onChange={(e) => handleInputChange(e)} onClick={(e)=>updateList(e)} className={style.widthOfInput}>
                        <option value="all">All countries</option>
                        {state.countriesList.map(country => (
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>))
                        }
                    </select>
                    
                }
                {errors.countries ? <span style={{ color: "red" }}>✘</span> : <span style={{ color: 'green' }}>✔</span>}
                </div>
                <div className={style.countriesContainer}>
                    {!state.countries.length ?
                        <span style={{ color: "red", width:"100%"}}>{errors.countries}</span>
                    :state.countries.map(country=>
                        <div key={country.id} className={style.cuntryContainer}>
                            <span>{country.name}</span>
                            <button onClick={(e) => deleteOfSelectedList(e)} value={country.id}>X</button>
                        </div>
                        )}
                </div>
            </form>
            <div className={!state.response? style.responseInvisible : style.responseVisible }>
                {   state.response ?
                    state.response.error?
                        <>
                        <h4>Error</h4>
                        <ErrorHandler key={1} error={state.response.error}/>
                        <button onClick={() => window.location.reload()}>Try again</button>
                        <Link to='/home/1'>
                            <button >Go to home</button>
                        </Link>
                        </>
                    :<>
                            <h4>Success</h4>
                            <div className={style.activityCardContainer}>
                            <ActivityCard
                            name={state.response[0].name}
                            difficulty={state.response[0].difficulty}
                            duration={state.response[0].duration}
                            season={state.response[0].season}
                            countries={state.response[0].countries} />
                            </div>
                            <button onClick={()=>window.location.reload()}>Create new</button>
                            <Link to='/home/1'>
                                <button >Go to home</button>
                            </Link>
                        </>
                    : null
                }
            </div>
        </div>
    )
}
export default CreateActivity;