import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllActivities } from "../redux/actions";
import ActivityCard from "./ActivityCard";
import style from './all-activities.module.css';

function AllActivities(){
    const {activities} =  useSelector(state=>state);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!activities.length) {
            dispatch(getAllActivities())
        };
    }, []);
    
    return(
        <div>
            <h2>ALL ACTIVITIES</h2>
            <div className={style.activitiesContainer}>
                {!activities.length ?
                    <h5>Not Found</h5>
                    : activities.map(activity => <ActivityCard
                        key={activity.id}
                        name={activity.name}
                        difficulty={activity.difficulty}
                        duration={activity.duration}
                        season={activity.season}
                        countries={activity.countries} />)}
            </div>
        </div>
    )
}

export default AllActivities