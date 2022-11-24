import style from './modal-component.module.css';
import {useSelector} from 'react-redux';

function ModalComponent () {
    const {modalActive} = useSelector(state=>state)
    return(
        <div className={modalActive?style.visible:style.noVisible}>
            Hola
        </div>
    )
};

export default ModalComponent;