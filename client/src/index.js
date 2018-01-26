import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import express from 'express';
// import graphQLHTTP from 'express-graphql';
// import schema from './schema'


//
// const app = express();
// app.use(graphQLHTTP({
//     schema,
//     graphql: true
// }))


//
// app.listen(5000);

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
