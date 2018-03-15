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
    createActions,
    handleActions,
    handleAction,
    combineActions
} from 'redux-actions';

const { dispatch, getState } = createStore(reducer, applyMiddleware(promiseMiddleware));
const state = getState();
const {a,b} = createActions({
    a:e=>'a',
    b:[e=>'payload',e=>'meta'],
    c:{
        d:d=>'d'
    }
}, 'ACTION_THREE');
var c = handleAction(combineActions(a,b),(s,aa)=>s,0)
console.log(c(0,a()))


const r = handleActions({
        jia(s){
            return s+1 
        },
        jian(s){
            return s-1
        }
},{wa:0})