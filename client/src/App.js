import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import './App.css';
import TrackView from "./views/TrackView";
import LandingView from "./views/LandingView";
import WorkView from "./views/WorkView";
import StudioView from "./views/StudioView";
import ContactView from "./views/ContactView";


class App extends Component {

    componentDidMount() {
        // console.log("APP.js props", this.props)
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/music/">Tracks</Link></li>
                            <li><Link to="/work/">Work</Link></li>
                            <li><Link to="/studio/">Studio</Link></li>
                            <li><Link to="/contact/">Contact</Link></li>
                        </ul>
                    </nav>
                    <Route exact path="/" component={LandingView}/>
                    <Route exact path="/music/" component={TrackView}/>
                    <Route exact path="/work/" component={WorkView}/>
                    <Route exact path="/studio/" component={StudioView}/>
                    <Route exact path="/contact/" component={ContactView}/>
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
