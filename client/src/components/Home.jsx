import SearchBar from "./SearchBar";
import FiltersAndOrderBar from "./FiltersAndOrderBar";
import PagedBar from "./PagedBar";
import CountriesCards from "./CountriesCards";

function Home(){
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