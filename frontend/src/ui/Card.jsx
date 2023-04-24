import './Card.css'

// Wrapper UI component
const Card = (props) => {
    // Anything we receive from className from outside it added to the string
    const classes = 'card ' + props.className;

    return <div className={classes}>{props.children}</div>
}

export default Card;