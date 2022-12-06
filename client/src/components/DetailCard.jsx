import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanCountryDetail, getCountryDetail, loaderOnOf } from "../redux/actions";
import ActivityCard from "./ActivityCard";
import style from './detail-card.module.css';

function DetailCard (){
    const param = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(loaderOnOf(true))
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
        <div className={style.contentMax}>
        <div className={style.content}>
            {!country.length?    
                <h2>Not Found</h2>
            :<><div className={style.titleContainer}>
                <div className={style.contentTitleImage}>
                    <button onClick={() => window.history.back()} className={style.buttonBack}>Go Back</button>
                    <h2>{name.toUpperCase()}</h2>
                </div>     
            </div>
            <div className={style.subContent}>
                <div className={style.imageContent}>
                    <p><strong>Code:</strong> {id}</p>
                    <img src={flag} alt={`flag ${name}`} />
                </div>
                <div className={style.textContent}>
                    <p><strong>Continent:</strong> {continent}</p>
                    <p><strong>Subregion:</strong> {subregion}</p>
                    <p><strong>Area:</strong> {area}Km2</p>
                    <p><strong>Capital:</strong> {capital}</p>
                    <p><strong>Population:</strong> {population}</p>
                </div>
            </div>
            <h4><strong>Activities:</strong></h4>
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
        </div>
    )
}

export default DetailCard;  