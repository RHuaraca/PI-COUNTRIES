import style from './error-handler.module.css';
import imageError from '../assets/error.jpg';

function ErrorHandler({error}){
    return(
        <div className={style.content}>
            <h5>An error occurred: {error}</h5>
            <img src={imageError} alt="error" className={style.image}/>
        </div>
    )
};

export default ErrorHandler;