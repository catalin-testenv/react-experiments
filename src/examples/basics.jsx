'use strict'

const React = require( 'react' )
const ReactDOM = require( 'react-dom' )
const DropDownButton = require( '../components/drop_down_button/DropDownButton' )

class Example extends React.Component {
    
    constructor(...args) {
        super(...args)
        this.state = {
            currentAction: 'action_one'
        }
        this._onButtonAction = this._onButtonAction.bind(this)
    }
    
    _onButtonAction(action) {
        this.setState({
            currentAction: action
        })
    }
    
    render () {
        return (
            <div>
                <DropDownButton 
                    actions={{action_one: 'Action One', action_two: 'Action Two'}} 
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