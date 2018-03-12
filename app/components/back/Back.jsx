import React, { Component } from 'react';
class Back extends Component {
    fuck=()=>{
        console.log('fuck!')
    }
    render() {
        this.fuck()
        return (<div id='Back'>dfdf!!!!</div>)
    }
}
export default Back;