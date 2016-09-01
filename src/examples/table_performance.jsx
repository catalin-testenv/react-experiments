'use strict';

const React = require( 'react' );
const ReactDOM = require( 'react-dom' );

let c = 0;
function generateTableData(rowsNum, colsNum) {
    const tableData = [];
    for (let row = 0; row < rowsNum; row++) {
        let map = {};
        for (let col = 0; col < colsNum; col++) {
            map[`col-${row}-${col}-${c}`] = `val-${row}-${col}-${c}`;
        }
        tableData.push(map);
        c++;
    }
    return tableData;
}

class App extends React.Component {

    constructor(props, ...args) {
        super(props, ...args);
        this.regenerate = this.regenerate.bind(this);
        this.state = {
            tableData: generateTableData(props.rowsNum, props.colsNum)
        }
    }

    static get propTypes() {
        return {
            rowsNum: React.PropTypes.number.isRequired,
            colsNum: React.PropTypes.number.isRequired
        }
    }

    getChildContext() {
        return {
            _table: {
                onClick: this.handleOnClick,
            }
        };
    }

    handleOnClick(cellIdx, rowIdx) {
        console.log('handleOnClick', cellIdx + '/' + rowIdx);
    }

    regenerate() {
        let start = new Date();
        this.setState({
            tableData: generateTableData(this.props.rowsNum, this.props.colsNum)
        }, () => {
            let end = new Date();
            console.log('re-rendered in:', end - start);
        });
    }

    render() {
        console.log('App render');
        let rows = this.state.tableData.map((row, i) => <Row key={i} idx={i} rowData={row} /> );
        return (
            <div>
                <button onClick={this.regenerate}>re-generate {this.props.rowsNum} * {this.props.colsNum} </button>
                <Table>{rows}</Table>
            </div>
        );
    }
}

App.childContextTypes = Object.assign({}, {
    _table: React.PropTypes.object,
});

class Table extends React.Component {
    
    constructor(props, ...args) {
        super(props, ...args);
    }

    render() {
        return (
            <table  style={{tableLayout: 'fixed', width: '100%'}}>
                <tbody>{this.props.children}</tbody>
            </table>
        );
    }
}

class Row extends React.Component {

    constructor(props, ...args) {
        super(props, ...args);
    }

    static get propTypes() {
        return {
            rowData: React.PropTypes.object.isRequired,
            idx: React.PropTypes.number.isRequired
        }
    }

    render() {
        let rowData = this.props.rowData || [];
        let cells = Object.keys(rowData).map((key, i) => <Cell key={i} idx={i} rowIdx={this.props.idx} textData={rowData[key]}> {i}/{this.props.idx} </Cell> );
        return (
            <tr>{cells}</tr>
        );
    }
}

class Cell extends React.Component {

    constructor(props, ...args) {
        super(props, ...args);
        this.onClick = this.onClick.bind(this);
    }

    static get propTypes() {
        return {
            textData: React.PropTypes.string.isRequired,
            rowIdx: React.PropTypes.number.isRequired,
            idx: React.PropTypes.number.isRequired
        }
    }

    onClick() {
        this.context._table.onClick(this.props.idx, this.props.rowIdx);
    }

    render() {
        return (
            <td onClick={this.onClick} style={{border: '1px solid gray', padding: '5px'}}>
                {this.props.textData}
                {this.props.children}
            </td>
        );
    }
}

Cell.contextTypes = Object.assign({}, {
    _table: React.PropTypes.object,
});



module.exports = function() {
    ReactDOM.render((
        <App rowsNum={400} colsNum={10} />
    ), document.getElementById('main'));
};