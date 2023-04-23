import Card from './Card';
import FormButton from './FormButton';
import classes from './ErrorModal.module.css';

const ErrorModal = (props) => {
    return (
        <div>
            <div className={classes.backdrop} onClick={props.handleError}/>
            <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={classes.content}>
                <p>{props.message}</p>
            </div>
            <footer className={classes.actions}>
                <FormButton onClick={props.handleError}>Ok</FormButton>
            </footer>
            </Card>
        </div>
    );
};
  
  export default ErrorModal;