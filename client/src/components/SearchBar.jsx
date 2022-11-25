import style from './search-bar.module.css';
import { getAllCountries } from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import searchImage from '../assets/searchImage.jpg'

function SearchBar(){
    const {orderName, orderPopulation, filterByContinent, filterByActivity} = useSelector(state=>state)
    const dispatch = useDispatch();
    function onChangeHandler(e){
        dispatch(getAllCountries(orderName, orderPopulation, filterByContinent, filterByActivity, e.target.value))
    }

    return(
        <div className={style.content}>
            <img src={searchImage} alt="search" className={style.image} />
            <input type="text" className={style.search} onChange={(e)=>onChangeHandler(e)}/>
        </div>
    )
};

export default SearchBar;