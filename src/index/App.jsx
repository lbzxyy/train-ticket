import React from 'react';
import { connect } from 'react-redux';
import './App.css';

import Header from '../common/Header.jsx';
import DepartDate from './DepartDate.jsx';
import HighSpeed from './HighSpeed.jsx';
import Journey from './Journey.jsx';
import Submit from './Submit.jsx';

function App() {
  return (
    <div className="App">
      <div className="header-wrapper">
              <Header title="火车票" />
      </div>
      <form action="./query.html" className="form">
          <Journey />
          <DepartDate />
          <HighSpeed  />
          <Submit />
      </form>
    </div>
  );
}
const mapStateToProps = (state) => ({

})
const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps,mapDispatchToProps)(App);
