import BaseButton from './BaseButton';
import classes from './FormButton.module.css';

const FormButton = (props) => {
    return (
        <BaseButton className={classes.button} {...props}>
            {props.children}
        </BaseButton>
    );
};

export default FormButton;