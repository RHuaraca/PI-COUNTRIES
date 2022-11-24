import style from './loader.module.css';

function Loader(){
    return(
        <div className={style.loadingContainer}>
            <div className={style.loading}></div>
            <div className={style.loadingText}>loading</div>
        </div>
    )
};

export default Loader;