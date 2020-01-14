import React, { Component } from 'react';
import Stock from '../components/Stock'


class PortfolioContainer extends Component {

  renderStock = () => {
    
    return this.props.stocks.map((stock, index) => {
      return <Stock stock={stock} key={index} handleClick={this.props.handleClick}/>
    })
  }
  
  
  render() {
   
    return (
      <div>
        <h2>My Portfolio</h2>
        {this.renderStock()}
      </div>
    );
  }

}

export default PortfolioContainer;
