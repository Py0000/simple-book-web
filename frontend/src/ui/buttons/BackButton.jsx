import BaseButton from './BaseButton';
import classes from './BackButton.module.css';

const BackButton = (props) => {
    return (
        <BaseButton className={classes.button} {...props}>
            {props.children}
        </BaseButton>
    );
};

export default BackButton;