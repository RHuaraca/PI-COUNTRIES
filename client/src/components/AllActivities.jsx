import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllActivities } from "../redux/actions";
import ActivityCard from "./ActivityCard";
import style from './all-activities.module.css';
import { Link } from "react-router-dom";
import ErrorHandler from "./ErrorHandler";

function AllActivities({delet}){
    const {activities} =  useSelector(state=>state);
    const [state, setState] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        if (!activities.length) {
            dispatch(getAllActivities())
        };
    }, []);

    function deletActivity(id){
        fetch(`http://localhost:3001/activities?id=${id}` , {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(res => setState({
                ...state,
                response: res
            }))
            .catch(res => setState({
                ...state,
                response: res
            }))
    }
    
    return(
        <div>
            {delet? <h2>SELECT AND DELETE ACTIVITIES </h2> : <h2>ALL ACTIVITIES</h2>}
            <div className={style.activitiesContainer}>
                {!activities.length ?
                    <h5>Not Found</h5>
                    : activities.map(activity =>
                        <div className={style.activityAndButton} key={activity.id}>
                            <ActivityCard
                            id={activity.id}
                            key={activity.id}
                            name={activity.name}
                            difficulty={activity.difficulty}
                            duration={activity.duration}
                            season={activity.season}
                            countries={activity.countries} 
                            delet={delet?true:false} />
                            {delet ? <button onClick={() => deletActivity(activity.id)} >delete</button> : null}
                        </div>
                        )}
            </div>
            <div className={!state.response || state.response === null ? style.responseInvisible : style.responseVisible}>
                {state.response ?
                    state.response[0].error ?
                        <>
                            {state.response.map((error, i) =>
                                <ErrorHandler key={i} error={error.error} />)}
                            <button onClick={() => window.location.reload()}>Try again</button>
                            <Link to='/home/1'>
                                <button >Go to Home</button>
                            </Link>
                        </>
                        : <>
                            <h4>Success</h4>
                            <div className={style.messageContainer}>{state.response[0].message}</div>
                            <button onClick={() => window.location.reload()}>keep deleting
                            </button>
                            <Link to='/home/1'>
                                <button >Go to Home</button>
                            </Link>
                        </>
                    : null
                }
            </div>
        </div>
    )
}

export default AllActivities