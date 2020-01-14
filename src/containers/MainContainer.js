import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state={
    stocks: [],
    foundStock: [],
    filteredStock: [],
    isFiltered: false,
    isAlphaSorted: false,
    isPriceSorted: false,
    alphaSorted: [],
    priceSorted: []
    
  }
  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(r => r.json())
    .then(stocksArr => {
      this.setState({
        stocks: stocksArr
      })
    })
  }


  handleClick = (id) => {
    
    let newStock = this.state.stocks.find(stock => stock.id === id)
    
        this.setState({
              foundStock: [...this.state.foundStock, newStock]
          })
  }
    

  handlePort = (id) => {
    let newArr=this.state.foundStock.filter((stock) => {
      return stock.id !== id
    })
    this.setState({
      foundStock: newArr
    })
  }
  
  handleFilter=(event) => {
    
    
    let newArr=this.state.stocks.filter((stock) => {
      return stock.type === event.target.value
    })
    
    this.setState({
      filteredStock: newArr,
      isFiltered: true,
      isAlphaSorted: false,
      isPriceSorted: false
    })
    
  }
 
  handleAlpha=() => {
    
    
    let newArr=[...this.state.stocks]
        newArr.sort((stock1, stock2) => {
          return stock1.ticker.localeCompare(stock2.ticker)
        })
        this.setState({
          alphaSorted: newArr,
          isAlphaSorted: true,
          isPriceSorted: false,
          isFiltered: false

        })
      
  }

  handlePrice=() => {
    
    
    let newArr=[...this.state.stocks]
        newArr.sort((stock1, stock2) => {
          return stock1.price - stock2.price
        })
        
        this.setState({
          priceSorted: newArr,
          isAlphaSorted: false,
          isPriceSorted: true,
          isFiltered: false


        })
      
  }


 

  render() {
    
     let stocks=[...this.state.stocks]
     
     
    
    if (this.state.isAlphaSorted) {stocks=this.state.alphaSorted}
    if (this.state.isPriceSorted) {stocks=this.state.priceSorted}
    if (this.state.isFiltered) {stocks=this.state.filteredStock}
    


    return (
      <div>
        <SearchBar handleFilter={this.handleFilter} handleAlphaChange={this.handleAlpha} alphaSorted={this.state.isAlphaSorted} priceSorted={this.state.isPriceSorted} handlePriceChange={this.handlePrice}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={stocks} handleClick={this.handleClick}/>

            </div>
            <div className="col-4">

              <PortfolioContainer handleClick={this.handlePort} stocks={this.state.foundStock} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
