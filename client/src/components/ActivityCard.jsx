import style from './activity-card.module.css';

function ActivityCard ({name, difficulty, duration, season, countries}){
    return(
        <div className={style.content}>
            <div className={style.contentTex}>
                <h5>{name}</h5>
                <hr />
                <p>difficulty: {difficulty}</p>
                <p>duration: {duration}</p>
                <p>season: {season}</p>
            </div>
            <div className={style.contentCountries}>
                {countries ?
                    countries.length ?
                        <ul className={style.countriesList}>
                            {
                                countries.map((country, i) =>
                                    <li key={i} className={style.countryLi}>
                                        {`-> ${country.name}`}
                                    </li>)
                            }
                        </ul>
                        : <h6>There are no countries</h6>
                    : null}
            </div>
        </div>
    )
}

export default ActivityCard;