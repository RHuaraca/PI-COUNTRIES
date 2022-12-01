import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanCountryDetail, getCountryDetail } from "../redux/actions";
import ActivityCard from "./ActivityCard";
import style from './detail-card.module.css';

function DetailCard (){
    const param = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCountryDetail(param.id))
        return(
            dispatch(cleanCountryDetail())
        )
    },[])
    const { country } = useSelector(state => state);
    console.log(country)
    let id 
    let name
    let flag
    let continent
    let capital
    let subregion
    let area
    let population
    let activities
    if (country.length){
        id = country[0].id;
        name = country[0].name;
        flag = country[0].flag;
        continent = country[0].continent;
        capital = country[0].capital;
        subregion = country[0].subregion;
        area = country[0].area;
        population = country[0].population;
        activities = country[0].activities;
    }
    return(
        <div className={style.content}>
            {!country.length?    
                <h2>Not Found</h2>
            :<><div>
                <div className={style.contentTitleImage}>
                    <button onClick={() => window.history.back()} className={style.buttonBack}>Go Back</button>
                    <h2>{name}</h2>
                </div>     
            </div>
            <div className={style.subContent}>
                <div className={style.textContent}>
                    <p>continent: {continent}</p>
                    <p>subregion: {subregion}</p>
                    <p>area: {area}Km2</p>
                    <p>capital: {capital}</p>
                    <p>population: {population}</p>
                </div>
                <div className={style.imageContent}>
                    <p>CODE: {id}</p>
                    <img src={flag} alt={`flag ${name}`}/>
                </div>
            </div>
            <div className={style.activitiesContent}>
                { !activities.length?
                    <h6>no registered activities</h6>
                : activities.map((activity, i)=><ActivityCard
                                            key={i}
                                            name={activity.name}
                                            difficulty={activity.difficulty}
                                            duration={activity.duration}
                                            season={activity.season}/>)}
            </div></>
            }
        </div>
    )
}

export default DetailCard;  