import CountryCard from "./CountryCard";
import Loader from "./Loader";
import ErrorHandler from "./ErrorHandler";
import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import { useEffect } from "react";
import { getAllCountries, loaderOnOf, setActualPage } from "../redux/actions";
import style from './countries-cards.module.css';
import {Route} from 'react-router-dom';

function CountriesCards(){
    const { 
        orderName, 
        orderPopulation, 
        errorHandler, 
        loader, 
        allCountries, 
        actualPage, 
        allPages 
    } = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        if(!allCountries.length) {
            dispatch(getAllCountries(orderName, orderPopulation))
            dispatch(loaderOnOf(true))
        }
        return ()=>dispatch(setActualPage(1))
    }, []);
    let countriesByPage=[];
    if (allCountries.length > 10 && !!allCountries[0]){
        if(actualPage===allPages){
            for (let i = actualPage * 10 - 10; i <= allCountries.length-1; i++) {
                countriesByPage.push(allCountries[i])
            }
        }else{
            for (let i = actualPage * 10 - 10; i <= actualPage * 10-1; i++) {
                countriesByPage.push(allCountries[i])
            }
        }
    } else if (allCountries.length >= 1 && !!allCountries[0]){
        countriesByPage=allCountries;
    }
    return(
        <Route path={`/home/${actualPage}`}>
            <div className={style.content}>
                {
                    loader ? <Loader /> : errorHandler.length ? errorHandler.map((error, i) => (<ErrorHandler error={error.error} key={i} />)) :
                        (!!countriesByPage[0]) ?
                            (!!countriesByPage[0].message) ? <h4>{countriesByPage[0].message}</h4> :
                                countriesByPage.map(country => <CountryCard
                                    key={country.id}
                                    name={country.name}
                                    flag={country.flag}
                                    continent={country.continent}
                                    population={country.population}
                                />) : null
                }
            </div>
        </Route>
    )
};

export default CountriesCards;