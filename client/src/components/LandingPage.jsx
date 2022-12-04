import style from './landing-page.module.css';
import { activeNavBar } from '../redux/actions';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import activity1 from '../assets/activity1.jpg';
import activity2 from '../assets/activity2.jpg';
import activity3 from '../assets/activity3.jpg';
import activity4 from '../assets/activity4.jpg';
import activity5 from '../assets/activity5.jpg';
import activity6 from '../assets/activity6.jpg';
import activity7 from '../assets/activity7.jpg';
import activity8 from '../assets/activity8.jpg';
import activity9 from '../assets/activity9.jpg';
import activity10 from '../assets/activity10.jpg';
import activity11 from '../assets/activity11.jpg';
import activity12 from '../assets/activity12.jpg';
import activity13 from '../assets/activity13.jpg';
import activity14 from '../assets/activity14.jpg';

export default function LandingPage(){
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(activeNavBar(false))
        return ()=>{
            dispatch(activeNavBar(true))
        }
    },[dispatch])
    return (
        <div className={style.fondo}>
            <div className={style.title}>
                <h1>HENRY COUNTRIES</h1>
            </div>
            <div>
                <h3>Travel the world and do its fantastic tourist activities!</h3>
            </div>
            <div className={style.images}>
                <div className={style.thirdLayer}>
                    <img src={activity11} alt="" />
                    <img src={activity12} alt="" />
                </div>
                <div className={style.secondLayer}>
                    <img src={activity1} alt="" />
                    <img src={activity2} alt="" />
                    <img src={activity7} alt="" />
                </div>
                <div className={style.imagesLaterals}>
                    <img src={activity5} alt="paseo en bote" className={style.imageActivity}/>
                    <img src={activity6} alt="ciclismo" className={style.imageActivity} />
                </div>
                <img src="./assets/image.jpg" alt="mundo de banderas" className={style.imageWolrdSphere} />
                <div className={style.imagesLaterals}>
                    <img src={activity10} alt="escalar" className={style.imageActivity} />
                    <img src={activity4} alt="caminata" className={style.imageActivity} />
                </div>
                <div className={style.secondLayer}>
                    <img src={activity3} alt="" />
                    <img src={activity9} alt="" />
                    <img src={activity8} alt="" />
                </div>
                <div className={style.thirdLayer}>
                    <img src={activity13} alt="" />
                    <img src={activity14} alt="" />
                </div>
            </div>
            <div className={style.link}>
                <Link to='/home/1'>
                    <button className={style.link}>
                        Let's go
                    </button>
                </Link>
            </div>
        </div>
    )
};
