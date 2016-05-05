'use strict'

// NOTE:
// This demo uses standard JavaScript (precisely: EcmaScript_2015/ES6)
// After transpiling back to ES5 (using Babel), this demo is still compatible with IE9

const React = require( 'react' )
const ReactDOM = require( 'react-dom' )
const copyProperties = require( '../lib/utils' ).copyProperties

// custom validator
function allowOnlyChildrenOfType (...allowedTypes) {
    return function allowOnlyChildrenOfType (props, propName, componentName) {
        let possibleError = null;
        
        React.Children.toArray(props[ propName ]).forEach((child) => {
            if ( allowedTypes.indexOf( child.type ) === -1 ) {
                possibleError = new Error( `${componentName} should have children of the following types: ${allowedTypes.join(', ')}. Offending child: ${child.type}` )
            }
        })
        
        return possibleError
    }
}

// decorator (HOC)
// receives a Class and returns another Class inheriting from the received one + adding some overrides
function MetaDeco ( Component ) {
    
    // purpose: do extra stuff on componentDidMount
    const Extended =  class extends Component {
        constructor(...args) {
            super(...args)
        }

        componentDidMount () {
            console.log('Running MetaDeco specific task on componentDidMount')
            // let original Component do its job if any
            super.componentDidMount && super.componentDidMount()
        }
    }

    // purpose: relocate/define propTypes
    if ( !((Component.ixMeta || {}).validations || {}).propTypes ) {
        console.warn('ixMeta.validations.propTypes is required')
    } else {
        // pass over propTypes - without touching original
        Extended.propTypes = Component.ixMeta.validations.propTypes
    }
    
    // for IE < 11 (this is not transpiler fault !!!)
    // makes possible the inheritance of static Function/Class properties 
    // because IE < 11 is not aware of `Object.setPrototypeOf()` or `obj.__proto__` 
    // which are in charge of static properties inheritance during transpiling
    // We care of this because we have statics like: displayName, defaultProps ...
    // ... inspired from Radium module
    copyProperties(Component, Extended) 
    
    return Extended
}

// React Component (ES6 style) https://facebook.github.io/react/docs/reusable-components.html#es6-classes
// Native decorators (like @MetaDeco below), a relatively new proposal for standardization
// previously supported in Babel 5, 
// can be enabled in Babel 6 via https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy
// @MetaDeco // ... example of native decorator usage
class Example extends React.Component {

    static get displayName() {
        return 'Awesome_ES6_Component';
    }

    static get defaultProps () {
        // Using `super` her just as a good practice.
        // It has nothing to do with the decoration process.
        // We use it just in case we decide that this Component should inherit from another custom Component.
        return Object.assign({}, super.defaultProps, {
            message: 'Default message'
        })
    }
    
    static get ixMeta () {
        return {
            doc: 'Documentation stuff',
            validations: {
                propTypes: {
                    message: React.PropTypes.string.isRequired,
                    children: allowOnlyChildrenOfType('p', 'div')
                }
            }
        }
    }

    componentDidMount () {
        console.log('Running Component specific task on componentDidMount')
    }
    
    render () {
        return (
            <div>
                <h4>{this.props.message}</h4>
                <div>{this.props.children}</div>
            </div>
        )
    }
}

// applying decoration on component
// as @MetaDeco - syntactic sugar - is not standard yet in JS, 
// we apply the decoration by explicitly wrapping the Component
Example = MetaDeco(Example)

module.exports = function () {
    ReactDOM.render( (
        <Example>
            <p>child paragraph</p>
            <span>child div</span>
        </Example>
    ), document.getElementById( 'main' ) )
}