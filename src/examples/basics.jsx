'use strict'

const React = require( 'react' )
const ReactDOM = require( 'react-dom' )
const DropDownButton = require( '../components/drop_down_button/DropDownButton' )
const Service = require( '../services/service' )

class Example extends React.Component {
    
    constructor(...args) {
        super(...args)
        this.state = {
            actions: {},
            currentAction: 'action_one'
        }
        this._onButtonAction = this._onButtonAction.bind(this)
        this._onActionsReceived = this._onActionsReceived.bind(this)
        Service
        .getData('/data/buttonActions.json', 1000)
        .then((data) => {
            this._onActionsReceived (data)
        })
        .catch((url, status, err) => {
            console.log(err)
        })
    }
    
    _onButtonAction(action) {
        console.log(action)
        this.setState({
            currentAction: action
        })
    }
    
    _onActionsReceived (actions) {
        this.setState({
            actions: actions
        })
    }
    
    render () {
        return (
            <div>
                <DropDownButton 
                    actions={this.state.actions} 
                    selected={this.state.currentAction} 
                    onAction={this._onButtonAction} />
            </div>
        )
    }
}

module.exports = function () {
    ReactDOM.render( (
        <Example />
    ), document.getElementById( 'main' ) )
}