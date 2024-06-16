import ReactDOM from "react-dom";
import Spinner from "../spinner/Spinner";
import classes from './Backdrop.module.css';

interface BackdropProps {
    show: boolean;
}

const Backdrop: React.FC<BackdropProps> = ({show}) => {
    return show ? ReactDOM.createPortal(
        <div className={classes.backdrop}>
            <Spinner />
        </div>,
        document.getElementById('backdrop-root') as HTMLElement
    ) : null;
}

export default Backdrop;