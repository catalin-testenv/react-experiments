'use strict'

const React = require( 'react' )
const ReactDOM = require( 'react-dom' )

const shallowEqual = require('../lib/shallowEqual');

class A extends React.Component {
    constructor(...args) {
        super(...args);
        console.log('A constructor');
    }

    componentWillReceiveProps(nextProps) {
        console.log('A componentWillReceiveProps');
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const res =  !shallowEqual(this.props, nextProps, null, true) ||
            !shallowEqual(this.state, nextState, null, true) ||
            !shallowEqual(this.context, nextContext, null, true);
        console.log('A shouldComponentUpdate', res);
        return res;
    }

    render () {
        console.log('A render');
        return (
            <div>{this.props.children}</div>
        );
    }
}

class B extends React.Component {
    constructor(...args) {
        super(...args);
        console.log('B constructor');
    }

    componentWillReceiveProps(nextProps) {
        console.log('B componentWillReceiveProps');
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const res =  !shallowEqual(this.props, nextProps, null, true) ||
            !shallowEqual(this.state, nextState, null, true) ||
            !shallowEqual(this.context, nextContext, null, true);
        console.log('B shouldComponentUpdate', res);
        return res;
    }

    render () {
        console.log('B render');
        return (
            <A>{this.props.children}</A>
        );
    }
}

class C extends React.Component {
    constructor(...args) {
        super(...args);
        console.log('C constructor');
    }

    componentWillReceiveProps(nextProps) {
        console.log('C componentWillReceiveProps');
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const res =  !shallowEqual(this.props, nextProps, null, true) ||
            !shallowEqual(this.state, nextState, null, true) ||
            !shallowEqual(this.context, nextContext, null, true);
        console.log('C shouldComponentUpdate', res);
        return res;
    }

    render () {
        console.log('C render');
        return (
            <B>{this.props.children}</B>
        );
    }
}

class Example extends React.Component {

    constructor(...args) {
        super(...args);
        console.log('Example constructor');
        this.state = {
            fake: false
        };
        this.onClick = this.onClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('Example componentWillReceiveProps');
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const res =  !shallowEqual(this.props, nextProps, null, true) ||
            !shallowEqual(this.state, nextState, null, true) ||
            !shallowEqual(this.context, nextContext, null, true);
        console.log('Example shouldComponentUpdate', res);
        return res;
    }

    onClick(e) {
        this.setState({
            fake: !this.state.fake
        });
    }

    render () {
        console.log('Example render');
        return (
            <div>
                <button onClick={this.onClick}>update Example state {this.state.fake ? '1' : '0'}</button>
                <C><span>child of C defined in Example</span></C>
            </div>

        );
    }
}

module.exports = function () {
    ReactDOM.render( (
        <Example />
    ), document.getElementById( 'main' ) )
}