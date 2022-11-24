import style from './error-handler.module.css'

function ErrorHandler({error}){
    return(
        <div className={style.content}>
            <h5>An error occurred: {error}</h5>
            <img src="./assets/error.jpg" alt="error" className={style.image}/>
        </div>
    )
};

export default ErrorHandler;