import style from './country-card.module.css';
import {Link} from 'react-router-dom'

function CountryCard({id, name, flag, continent, population, message}){
    return(
        <>{message ? <div className={style.content}>
            <div className={style.contentText}>
                <div className={style.contentName}>
                    <h4 className={style.name}>{message}</h4>
                </div>
            </div>
        </div> :
        <div className={style.content}>
            <div className={style.contentImage}>
                <img src={flag} alt="flag" className={style.image}/>
            </div>
            <div className={style.contentText}>
                <div className={style.contentName}>
                    <h4 className={style.name}>{name.toUpperCase()}</h4>
                </div>
                    <p className={style.text}><strong>Continent:</strong> {continent}</p>
                    <p className={style.text}><strong>Population: </strong>  {population}</p>
                <Link to={`/detail/${id}`}>
                    <button className={style.button}>Details</button>
                </Link>
                
            </div>
            </div>}
        </>
    )
};

export default CountryCard;