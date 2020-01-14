import React, { Component } from 'react';
import Stock from '../components/Stock'
import uuid from 'uuid'

class StockContainer extends Component {

  perStock=() => {
    return this.props.stocks.map((stock, index) => {
     return <Stock key={uuid()} stock={stock} handleClick={this.props.handleClick} />
    })
  }
  
  render() {
    
    return (
      <div>
        <h2>Stocks</h2>
        {this.perStock()}
      </div>
    );
  }

}

export default StockContainer;
