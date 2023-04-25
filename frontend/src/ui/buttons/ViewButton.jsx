import BaseButton from './BaseButton';
import classes from './ViewButton.module.css';

const ViewButton = (props) => {
    return (
        <BaseButton className={classes.button} {...props}>
            {props.children}
        </BaseButton>
    );
};

export default ViewButton;