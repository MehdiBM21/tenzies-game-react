export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(
        <button className="die" style={styles} onClick={() =>props.holdDice(props.id)}>
            <h2>{props.value}</h2>
        </button>
    );
}