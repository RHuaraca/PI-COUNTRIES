import style from './country-card.module.css';

function CountryCard({id, name, flag, continent, population}){
    return(
        <div className={style.content}>
            <div className={style.contentImage}>
                <img src={flag} alt="bandera" className={style.image}/>
            </div>
            <div className={style.contentText}>
                <div className={style.contentName}>
                    <h4 className={style.name}>{name}</h4>
                </div>
                <p className={style.text}>continent: {continent}</p>
                <p className={style.text}>population: {population}</p>
                <button>Details</button>
            </div>
        </div>
    )
};

export default CountryCard;