'use strict'



const React = require( 'react' )
const ReactDOM = require( 'react-dom' )

class Parent extends React.Component {

    constructor(props, ...args) {
        super(props, ...args);
    }

    // onChildClick(child, origCallback){
    //     // origCallback && origCallback();
    //     console.log(origCallback);
    //     console.log(child.props.someProp);
    // }

    render () {
        const children = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
                parent: this
            });
        });

        return (
            <ul>
                {children}
            </ul>
        )
    }
}

class Child extends React.Component {
    constructor(props, ...args) {
        super(props, ...args);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
    }

    onClick() {
        this.props.onClick(this);
    }

    render () {
        return (
            <li onClick={this.onClick} style={{cursor: 'pointer'}}>
                {this.props.parent.props.propParent}
                {this.props.children}
            </li>
        )
    }
}


module.exports = function () {
    ReactDOM.render( (
        <Parent propParent="test">
            <Child onClick={()=>{console.log('child:', 1)}} someProp={1}>c1</Child>
            <Child someProp={2}>c2</Child>
            <Child someProp={3}>c3</Child>
            <Child someProp={4}>c4</Child>
        </Parent>
    ), document.getElementById( 'main' ) )
}