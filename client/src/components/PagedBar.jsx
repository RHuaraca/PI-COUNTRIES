import style from './paged-bar.module.css';
import { useSelector, useDispatch } from "react-redux";
import {
    incrementActualPage, 
    decrementActualPage, 
    setActualPage
} from '../redux/actions.js'
import {Link} from 'react-router-dom'

function PagedBar(){
    
    const {allPages, actualPage,} = useSelector(state=>state)
    const dispatch = useDispatch()

    const incrementPage = ()=>{
        dispatch(incrementActualPage())
    };
    const decrementPage = ()=>{
        dispatch(decrementActualPage())
    }
    const setPage = (e)=>{
        const set = Number(e.target.value)
        dispatch(setActualPage(set))
    }
    let auxiliarArray = []
    if(allPages){
        for(let i=1; i<=allPages; i++){
            auxiliarArray.push(i)
        }
    }
    return(
        <div className={style.content}>
            {
                auxiliarArray.length ? (
                <>
                        <Link to={`/home/${actualPage - 1}`} className={style.link}>
                        <button 
                            onClick={() => decrementPage()} 
                            disabled={actualPage === 1 ? true : false} 
                            className={actualPage === 1 ? style.disable : style.all}>
                                {'<'}
                        </button>
                    </Link>
                    {auxiliarArray.map(el => 
                        <Link to={`/home/${el}`} key={el} className={style.link}>
                            <button 
                                key={el} 
                                value={el}
                                onClick={(e) => setPage(e) } 
                                className={el === actualPage ? style.marker : style.all}>
                                    {el}
                                    
                            </button>
                        </Link>)
                    } 
                        <Link to={`/home/${actualPage + 1}`} className={style.link}>
                        <button 
                            onClick={() => incrementPage()} 
                            disabled={(actualPage === allPages) ? true : false} 
                                className={actualPage === allPages ? style.disable : style.all}>
                                {'>'}
                        </button>
                    </Link>
                </>)
                : <span>paging bar</span>
            }
        </div>
    )
};

export default PagedBar;