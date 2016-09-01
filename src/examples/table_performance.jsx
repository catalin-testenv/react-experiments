'use strict';

const React = require( 'react' );
const ReactDOM = require( 'react-dom' );


class Parent extends React.Component {
    
    constructor(props, ...args) {
        super(props, ...args);
        this.registeredChildren = [];
        this.selectedChild = null;
        this.handleOnChildClick = this.handleOnChildClick.bind(this);
    }
    
    registerChild(child) {
        this.registeredChildren.push(child);
        console.log('registeredChildren', this.registeredChildren.length);
    }

    handleOnChildClick(child) {
        this.selectedChild = child;
        console.log('handleOnChildClick: found child at index', this.registeredChildren.indexOf(child), child);
        this.forceUpdate();
    }
    
    render() {
        const children = React.Children.map(this.props.children, (child) => {
            console.log('render: found child at index', this.registeredChildren.indexOf(child), child.props.someProp, child);
            return React.cloneElement(child, {
                parent: this, // let the child know who's the parent
                onClick: this.handleOnChildClick,
                // style: Object.assign({}, child.props.style, this.selectedChild && {backgroundColor: child.props.idx === this.selectedChild.props.idx ? '#fff' : '#ccc'})
                style: Object.assign({}, child.props.style, {backgroundColor: 'red'})

            });
        });
        
        return (
            <ul>
                {children}
            </ul>
        );
    }
}

class Child extends React.Component {

    constructor(props, ...args) {
        super(props, ...args);
        this.onClick = this.onClick.bind(this);
    }
    
    componentDidMount() {
        this.props.parent.registerChild(this);
    }
    
    onClick(e){
        this.props.onClick(this)
    }

    render() {
        return (
            <li onClick={this.onClick} style={{cursor: 'pointer'}}>
                {this.props.children}
            </li>
        );
    }
}

module.exports = function() {
    ReactDOM.render((
        <Parent>
            <Child idx={1}>child 1</Child>
            <Child idx={2}>child 2</Child>
            <Child idx={3}>child 3</Child>
            <Child idx={4}>child 4</Child>
        </Parent>
    ), document.getElementById('main'));
};