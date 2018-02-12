import React, {Component} from 'react';
import {graphql} from 'react-apollo'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import './App.css';
import MusicView from "./views/MusicView";
import LandingView from "./views/LandingView";
import WorkView from "./views/WorkView";
import StudioView from "./views/StudioView";
import ContactView from "./views/ContactView";
import {INIT_GENRE} from "./graphql/queries";

class App extends Component {
// const App = ({data: {loading, error, genre}}) => {

    state = {
        genre: ''
    };

    // componentWillMount() {
    //     console.log("MOUNT", this.props.data.variables.genre)
    //     this.setState({genre: this.props.data.variables.genre})
    // }
    //
    // componentDidUpdate(nextProps) {
    //     console.log("NEXT", nextProps.data.genre)
    //     this.setState({genre: nextProps.data.genre})
    // }

    render() {
        if (this.props.data.error || this.props.data.loading) return <div>LOADING</div>;
        return (

            <Router>
                <div className="App">
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/work/">Work</Link></li>
                            <li><Link to="/music/">Tracks</Link></li>
                            <li><Link to="/studio/">Studio</Link></li>
                            <li><Link to="/contact/">Contact</Link></li>
                        </ul>

                    </nav>
                    <div>{this.props.data.genre || this.props.data.variables.genre}</div>
                    <Route exact path="/" component={LandingView}/>
                    <Route exact path="/work/" component={WorkView}/>
                    <Route exact path="/music/" component={MusicView}/>
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

const AppWithGraphQL = graphql(INIT_GENRE, {
    options: {
        variables: {"genre": 'Default'},
        fetchPolicy: 'cache-only',
        errorPolicy: 'all'
    }
})(App);
export default AppWithGraphQL;
//
// options: (props) => ({
//     variables: {input: props.id, isPlaying: props.isPlaying, toggleAudio: props.toggleAudio},
//     errorPolicy: 'all'
// })