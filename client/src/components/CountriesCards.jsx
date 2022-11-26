import CountryCard from "./CountryCard";
import Loader from "./Loader";
import ErrorHandler from "./ErrorHandler";
import {
    useSelector 
} from "react-redux";
import style from './countries-cards.module.css';
import {Route} from 'react-router-dom';

function CountriesCards(){
    const {
        errorHandler, 
        loader, 
        actualPage,
        allPages,
        allCountries,
    } = useSelector(state => state)

    //logica para paginado
    const filtered = allCountries; 
    let countriesByPage=[];
   if (filtered.length > 10 && !!filtered[0]){
        if(actualPage===allPages){
           for (let i = actualPage * 10 - 10; i <= filtered.length-1; i++) {
                countriesByPage.push(filtered[i])
            }
        }else{
            for (let i = actualPage * 10 - 10; i <= actualPage * 10-1; i++) {
               countriesByPage.push(filtered[i])
            }
        }
   } else if (filtered.length >= 1 && !!filtered[0]){
      countriesByPage = filtered;
    }
    return(
        <Route path={`/home/${actualPage}`}>
            <div className={style.content}>
                {
                  loader ? 
                     <Loader /> 
                  : errorHandler.length ? 
                     errorHandler.map((error, i) => (<ErrorHandler error={error.error} key={i} />)) 
                  :(!!countriesByPage[0]) ?
                     (!!countriesByPage[0].error ) ? 
                        countriesByPage.map((error,i)=> <ErrorHandler error={error.error} key={i}/>)
                     :countriesByPage.map(country => <CountryCard
                        id={country.id}
                        key={country.id}
                        name={country.name}
                        flag={country.flag}
                        continent={country.continent}
                        population={country.population}
                        message={country.message?country.message:null}/>) 
                  : null
                }
            </div>
        </Route>
    )
};

export default CountriesCards;