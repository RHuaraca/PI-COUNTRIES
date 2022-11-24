import { Link } from 'react-router-dom';
import style from './nav-bar.module.css';
import { 
    useSelector, 
//    useDispatch 
} from 'react-redux';
//import { useEffect } from 'react';
//import { getAllCountries, loaderOnOf } from "../redux/actions";

function NavBar (){
    const {actualPage, 
    //    allCountries, 
    //    orderName, 
    //    orderPopulation
    }=useSelector(state=>state);
    //const dispatch = useDispatch();
    /* useEffect(() => {
        if (!allCountries.length) {
            dispatch(getAllCountries(orderName, orderPopulation))
            dispatch(loaderOnOf(true))
        }
    }, []); */
    return(
        <div className={style.content}>
            <Link to={`/home/${actualPage}`}>
                <img src="../assets/image.jpg" alt="logo" className={style.logo}/>
            </Link>
            <ul className={style.list}>
                <Link to='/allActivities'><li className={style.item}>View all activities</li></Link>
                <Link to='/addActivity'><li className={style.item}>Create new activity</li></Link>
                <Link to='/selectActivityToUpdate'><li className={style.item}>Update activity</li></Link>
                <Link to='/selectActivityToDelete'><li className={style.item}>Delete activity</li></Link>
            </ul>
        </div>
    )
};

export default NavBar;