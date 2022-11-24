import style from './search-bar.module.css';
import { switchModalActive, getAllCountries } from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import searchImage from '../assets/searchImage.jpg'

function SearchBar(){
    const {orderName, orderPopulation} = useSelector(state=>state)
    const dispatch = useDispatch();
    function onChangeHandler(e){
        console.log(e.target.value);
        dispatch(getAllCountries(orderName, orderPopulation, e.target.value))
        dispatch(switchModalActive(true))
    }

    return(
        <div className={style.content}>
            <img src={searchImage} alt="search" className={style.image} />
            <input type="text" className={style.search} onChange={(e)=>onChangeHandler(e)}/>
        </div>
    )
};

export default SearchBar;