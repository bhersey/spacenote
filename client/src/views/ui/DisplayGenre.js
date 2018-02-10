import React from 'react';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";

const DisplayGenre = ({data : {loading, error, genre}}) => {

    console.log(loading, error, genre);

    if (loading || error) return <div>LOADING</div>;

    return (
        <div>Current Genre: {genre}</div>
    )
};

let ApolloDisplayGenre = graphql(gql`query genre{genre}`, {
    options: { fetchPolicy: 'cache-only' },
})(DisplayGenre);
export default ApolloDisplayGenre;