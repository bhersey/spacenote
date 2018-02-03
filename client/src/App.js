import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import './App.css';
import TrackView from "./views/TrackView";
import LandingView from "./views/LandingView";


class App extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        response: 'ack'
    };

    componentDidMount() {

    }

    render() {
        return (
            <Router>
                <div className="App">
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/music/">Tracks</Link></li>
                        </ul>
                    </nav>
                    <Route exact path="/" component={LandingView}/>
                    <Route exact path="/music/" component={TrackView}/>
                    {/*<Switch>*/}
                    {/*<Route path="/messages/create/" component={CreateView} />*/}
                    {/*<Route path="/messages/:id/" component={DetailView} />*/}
                    {/*</Switch>*/}
                </div>
            </Router>




        );
    }
}

export default App;
