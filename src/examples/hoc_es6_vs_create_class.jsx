'use strict'

// Demonstrating that a HOC decorator can accept 
// either a React generated class 
// or a plain ES6 class

function assert(bool) {
    if (bool) {
        console.log('ok')
    } else {
        console.error('nok')
    }
}

const React = require( 'react' )
const ReactDOM = require( 'react-dom' )
const TestUtils = require( 'react-addons-test-utils' )
const copyProperties = require( '../lib/utils' ).copyProperties

function  Deco ( Component ) { // where Component can be either the result of React.createClass({}) or class MyClass {}

    const Extended = class extends Component {
        constructor() { // overriding constructor
            super(...arguments)
            // Component.call(this) //  only for IE <= 10 if not using babel plugin: transform-es2015-classes(loose:true)
            assert(arguments[0].initialPropType === 'initialPropType')
            assert(arguments[0].injectedPropType === 'injectedPropType')
            console.log('overriding constructor for ' + Component.displayName)
            this.state = Object.assign({}, this.state, { // overriding state
                injectedStateKey: 'injectedStateKey'
            })
            console.log(this.state)
        }

        static get propTypes () {
            return Object.assign({}, Component.propTypes, { // overriding propTypes
                injectedPropType: React.PropTypes.string
            })
        }

        static get defaultProps () {
            return Object.assign({}, Component.defaultProps, { // overriding defaultProps
                injectedPropType: 'injectedPropType'
            })
        }

        componentDidMount () { // overriding instance method 
            console.log('overriding componentDidMount for ' + Component.displayName)
            super.componentDidMount && super.componentDidMount()
        }
    }
    copyProperties(Component, Extended) // only for IE <= 10
    return Extended
}

let ReactClass = React.createClass({
    
    displayName: 'ReactClass',
    
    propTypes: {
        initialPropType: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            initialPropType: 'initialPropType'
        }
    },

    getInitialState: function () {
        return {
            initialStateKey: 'initialStateKey'
        }
    },

    componentDidMount: function () {
        console.log(this.constructor.displayName + '#componentDidMount')
    },
    
    render: function () {
        return <div>ReactClass</div>
    }
})
ReactClass = Deco(ReactClass)

let ES6Class = class extends React.Component  {
    
    constructor(...args) {
        super(...args)
        this.state = {
            initialStateKey: 'initialStateKey'
        }
        console.log('in ' + this.constructor.displayName + ' constructor')
    }
    
    static get displayName () {
        return 'ES6Class'
    }
    
    static get propTypes () {
        return {
            initialPropType: React.PropTypes.string
        }
    }

    static get defaultProps () {
        return {
            initialPropType: 'initialPropType'
        }
    }

    componentDidMount() {
        console.log(this.constructor.displayName + '#componentDidMount')
    }
    
    render () {
        return <div>ES6Class</div>
    }
}
ES6Class = Deco(ES6Class)

module.exports = function () {
    // check initial propType
    assert(ReactClass.propTypes.initialPropType === React.PropTypes.string)
    assert(ReactClass.propTypes.initialPropType === ES6Class.propTypes.initialPropType)
    // check injected propType
    assert(ReactClass.propTypes.injectedPropType === React.PropTypes.string)
    assert(ReactClass.propTypes.injectedPropType === ES6Class.propTypes.injectedPropType)
    // check initial default prop
    assert(ReactClass.defaultProps.initialPropType === 'initialPropType')
    assert(ReactClass.defaultProps.initialPropType === ES6Class.defaultProps.initialPropType)
    // check injected default prop
    assert(ReactClass.defaultProps.injectedPropType === 'injectedPropType')
    assert(ReactClass.defaultProps.injectedPropType === ES6Class.defaultProps.injectedPropType)
    
    let reactEl = TestUtils.renderIntoDocument(<ReactClass />);
    let es6El = TestUtils.renderIntoDocument(<ES6Class />);

    // check initial state key
    assert(reactEl.state.initialStateKey == 'initialStateKey')
    assert(reactEl.state.initialStateKey == es6El.state.initialStateKey)
    // check injected state key
    assert(reactEl.state.injectedStateKey === 'injectedStateKey')
    assert(reactEl.state.injectedStateKey === es6El.state.injectedStateKey)
    // check initial default instance prop
    assert(reactEl.props.initialPropType === 'initialPropType')
    assert(reactEl.props.initialPropType === es6El.props.initialPropType)
    // check injected default instance prop
    assert(reactEl.props.injectedPropType === 'injectedPropType')
    assert(reactEl.props.injectedPropType === es6El.props.injectedPropType)
    
    // console.log(reactEl.state)
    // console.log(es6El.state)
    
}