import style from './activity-card.module.css';

function ActivityCard ({name, difficulty, duration, season, countries}){
    return(
        <div className={style.content}>
            <div className={style.contentText}>
                <h5>{name}</h5>
                <p>difficulty: {difficulty}</p>
                <p>season: {season}</p>
                <div>
                    <p>duration: {duration >= 24 ?
                        <> <span>{Math.floor(duration / 24) > 1 ? `${Math.floor(duration / 24)} days ` : `${Math.floor(duration / 24)} day `}</span>
                            <span>{duration - (Math.floor(duration / 24) * 24) > 0 ? Math.floor(duration - (Math.floor(duration / 24) * 24)) > 1 ? `${Math.floor(duration - (Math.floor(duration / 24) * 24))} hours ` : `${Math.floor(duration - (Math.floor(duration / 24) * 24))} hour ` : null}</span>
                            <span>{duration - (Math.floor(duration / 24) * 24) > 0 ? Math.floor((duration - (Math.floor(duration / 24) * 24) - Math.floor(duration - (Math.floor(duration / 24) * 24))) * 60) > 1 ? `${Math.floor((duration - (Math.floor(duration / 24) * 24) - Math.floor(duration - (Math.floor(duration / 24) * 24))) * 60)} minutes` : `${Math.floor((duration - (Math.floor(duration / 24) * 24) - Math.floor(duration - (Math.floor(duration / 24) * 24))) * 60)} minutes` : null}</span>
                        </> : null}
                        {duration < 24 && duration >= 1 ?
                            <>  <span>{Math.floor(duration) > 0 ? Math.floor(duration) > 1 ? `${Math.floor(duration)} hours ` : `${Math.floor(duration)} hour ` : null}</span>
                                <span>{duration - Math.floor(duration) > 0 ? Math.floor((duration - Math.floor(duration)) * 60) > 1 ? `${Math.floor((duration - Math.floor(duration)) * 60)} minutes ` : `${Math.floor((duration - Math.floor(duration)) * 60)} minute ` : null}</span>
                            </> : null}
                        {duration < 1 ?
                            <>
                                <span>{Math.floor(duration * 60) > 0 ? Math.floor(duration * 60) > 1 ? `${Math.floor(duration * 60)} minutes ` : `${Math.floor(duration * 60)} minute ` : null}</span>
                            </> : null}
                    </p>
                </div>
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