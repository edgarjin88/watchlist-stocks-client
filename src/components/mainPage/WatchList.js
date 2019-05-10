import React, { Component }  from 'react';
import axios from "axios";
import './WatchList.css'

const SERVER_URL = "https://api.iextrading.com/1.0/stock/aapl/quote";

class WatchList extends Component {

  constructor() {
    super();
    this.state = {
      symbol: '',
      companyName: '',
      price: '',
      changePercent: 0
    };

    const fetchSymbol = () => {
      axios.get(SERVER_URL).then( (results) => {
        this.setState({ symbol: results.data.symbol });
      });
    };
    fetchSymbol();

    const fetchCompanyName = () => {
      axios.get(SERVER_URL).then( (results) => {
        this.setState({ companyName: results.data.companyName});
      });
    };
    fetchCompanyName();

    const fetchPrice = () => {
      axios.get(SERVER_URL).then( (results) => {
        if (results.data.calculationPrice === "close" ) {
          this.setState({ price: results.data.close})
        } else {
          this.setState({ price: results.data.calculationPrice})
        }
      });
    };
    fetchPrice();

    const fetchChangePercent = () => {
      axios.get(SERVER_URL).then( (results) => {
        this.setState({ changePercent: results.data.changePercent});
      });
    };
    fetchChangePercent();

  }

  // TODO:
  // Get and show the logo' company
  // Option to delete the stock on the watchlist of current_user
  // Link to go to details of each company

  render() {
    return(
      <div className="watch-list">

        <div className="symbol_name">
          <div className="symbol" >{ this.state.symbol }</div>
          <div className="name" >{ this.state.companyName }</div>
        </div>

        <div className="price_percent">
          <div className="price" >{ this.state.price }</div>
          <div className="percent" >{ this.state.changePercent.toFixed(2)  }</div>
        </div>

      </div>
    );
  }
}

export default WatchList;