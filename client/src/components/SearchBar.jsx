import style from './search-bar.module.css';
import { getAllCountries, loaderOnOf, setActualPage, setFilters, setName, setOrderName, setOrderPopulation } from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import searchImage from '../assets/searchImage.jpg';

function SearchBar(){
    const {
        orderName, 
        orderPopulation, 
        filterByContinent, 
        filterByActivity,
        actualName
    } = useSelector(state=>state)
    const dispatch = useDispatch();

    function onChangeHandler(e){
        dispatch(setActualPage(1))
        dispatch(getAllCountries(orderName, orderPopulation, filterByContinent, filterByActivity, e.target.value))
        dispatch(setName(e.target.value))
    }

    return(
        <div className={style.searchBarContainer}>
            <div className={style.resetButton}>
                <button onClick={()=>window.location.reload()}>reset</button>
            </div>
            <div className={style.content}>
                <img src={searchImage} alt="search" className={style.image} />
                <input placeholder='Search' value={actualName} type="text" className={style.search} onChange={(e) => onChangeHandler(e)} />
            </div>
        </div>
    )
};

export default SearchBar;