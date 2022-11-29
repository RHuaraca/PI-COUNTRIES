import { Link } from 'react-router-dom';
import style from './nav-bar.module.css';
import { 
    useDispatch,
    useSelector, 
} from 'react-redux';
import { cleanCountries } from '../redux/actions';

function NavBar (){
    const dispatch=useDispatch();
    function deleteAllCountries(){
        dispatch(cleanCountries())
    }
    const {actualPage, 
    }=useSelector(state=>state);
    return(
        <div className={style.content}>
            <Link to={`/home/${actualPage}`}>
                <img src="../assets/image.jpg" alt="logo" className={style.logo}/>
            </Link>
            <ul className={style.list}>
                <Link to='/allActivities'><li className={style.item}>View all activities</li></Link>
                <Link to='/addActivity'><li className={style.item} onClick={()=>deleteAllCountries()}>Create new activity</li></Link>
                <Link to='/selectActivityToUpdate'><li className={style.item}>Update activity</li></Link>
                <Link to='/selectActivityToDelete'><li className={style.item}>Delete activity</li></Link>
            </ul>
        </div>
    )
};

export default NavBar;