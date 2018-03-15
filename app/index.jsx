import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Some from './components/some/Some';
const App = () => <div><Some /></div>


ReactDOM.render(<App />, document.getElementById('root'));

import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducer from './store/reducers/reducer.js';
import {
    createAction,
    handleAction
} from 'redux-actions';

const { dispatch, getState } = createStore(reducer, applyMiddleware(promiseMiddleware));
dispatch(Promise.resolve({
    type: 'ADD',
    count: 12
}))
    .then(e => dispatch(e))
const state = getState();
const increment = createAction('INCREMENT');
console.log(increment('hao'));