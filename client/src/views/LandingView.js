import React from 'react';
import {graphql} from 'react-apollo'
import * as queries from '../graphql/queries'
import LogoAnimation from "./logo/LogoAnimation";

const MyComponentWithData = graphql(queries.HELLO)(props => <div>{props.data.hello}</div>);

const LandingView = (props) => {

    return (
        <div>
            <LogoAnimation/>
            <MyComponentWithData/>
        </div>
    )
};

export default LandingView;