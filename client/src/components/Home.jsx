import SearchBar from "./SearchBar";
import FiltersAndOrderBar from "./FiltersAndOrderBar";
import PagedBar from "./PagedBar";
import CountriesCards from "./CountriesCards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { getAllCountries, loaderOnOf } from "../redux/actions";

function Home(){
    const dispatch = useDispatch();
    const {orderName, orderPopulation,filterByContinent, filterByActivity} = useSelector(state=>state)
    useEffect(() => {
        dispatch(getAllCountries(orderName, orderPopulation, filterByContinent, filterByActivity))
        dispatch(loaderOnOf(true))
    }, []);
    return(
        <div>
            <SearchBar/>
            <FiltersAndOrderBar/>
            <PagedBar/>
            <CountriesCards/>
        </div>
    )
};

export default Home;