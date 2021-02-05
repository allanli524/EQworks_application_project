import react from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingPage = () => {

    const history = useHistory();

    return (
        <div style={{marginTop: "10%"}}>
            <h1>Choose Your Report of Interest ...</h1>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-evenly", width: "50%", height: "80%", margin: "auto"}}>
                <Button style={{margin: "5%"}} variant="primary" size="lg" onClick={() => {history.push("/statsDaily")}}>Daily Statistics</Button>
                <Button style={{margin: "5%"}} variant="primary" size="lg" onClick={() => {history.push("/statsHourly")}}>Hourly Statistics</Button>
                <Button style={{margin: "5%"}} variant="primary" size="lg" onClick={() => {history.push("/eventsDaily")}}>Daily Events</Button>
                <Button style={{margin: "5%"}} variant="primary" size="lg" onClick={() => {history.push("/eventsHourly")}}>Hourly Events</Button>
            </div>
        </div>
    )
}
export default LandingPage;