import style from './landing-page.module.css';
 import { activeNavBar } from '../redux/actions';
import { Link } from 'react-router-dom';
 import { useEffect } from 'react';
 import { useDispatch } from 'react-redux';

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
                <h1>Henry Countries</h1>
            </div>
            <div>
                <h3>Travel the world and do its fantastic tourist activities!</h3>
            </div>
            <div className={style.images}>
                <div className={style.imagesLaterals}>
                    <img src="./assets/activity1.jpg" alt="paseo en bote" className={style.imageActivity}/>
                    <img src="./assets/activity2.jpg" alt="ciclismo" className={style.imageActivity} />
                </div>
                <img src="./assets/image.jpg" alt="mundo de banderas" className={style.imageWolrdSphere} />
                <div className={style.imagesLaterals}>
                    <img src="./assets/activity3.jpg" alt="escalar" className={style.imageActivity} />
                    <img src="./assets/activity4.jpg" alt="caminata" className={style.imageActivity} />
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
