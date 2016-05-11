
const React = require( 'react' )
const ReactDOM = require( 'react-dom' )

function MetaData(spec) {
    return  {
        propTypes: Object.assign({}, spec.types),
        getDefaultProps: function () {
            return Object.assign({}, spec.defaults)
        }
    }
}

let Hello = React.createClass({
    mixins: [MetaData({
        doc: 'the doc',
        types: {
            foo: React.PropTypes.string.isRequired
        },
        defaults: {
            foo: 'Foo Message'
        }
    })],

    render: function() {
        return <div>Hello {this.props.foo}</div>
    }
})

module.exports = function () {
    console.log(Object.keys(Hello.propTypes)) // ["foo"]
    ReactDOM.render( (
        <Hello />
    ), document.getElementById( 'main' ) ) // Hello Foo Message
}


