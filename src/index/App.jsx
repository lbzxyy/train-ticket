import React, {useCallback, useMemo} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';

import Header from '../common/Header.jsx';
import DepartDate from './DepartDate.jsx';
import HighSpeed from './HighSpeed.jsx';
import Journey from './Journey.jsx';
import Submit from './Submit.jsx';

import CitySelector from '../common/CitySelector.jsx';


import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
  setDepartDate,
  toggleHighSpeed,
} from './actions';

function App(props) {
  const {
    from,
    to,
    dispatch,
    isCitySelectorVisible,
    isLoadingCityData,
    cityData,
  } = props
  const onBack = useCallback(() => {
    window.history.back()
  },[])
  const cbs = useMemo(()=>{
    return bindActionCreators({
      exchangeFromTo,
      showCitySelector
    },dispatch)
  },[dispatch])
  const citySelectorCbs = useMemo(()=>{
    return bindActionCreators({
      onBack: hideCitySelector,
    },dispatch)
  },[])

    
  return (
    <div className="App">
      <div className="header-wrapper">
              <Header title="火车票" onClick={onBack}/>
      </div>
      <form action="./query.html" className="form">
          <Journey 
            from={from}
            to={to}
            {...cbs}
           />
          <DepartDate />
          <HighSpeed  />
          <Submit />
      </form>
      <CitySelector
         show = {isCitySelectorVisible}
         isLoading={isLoadingCityData}
         cityData={cityData}
         {...citySelectorCbs}
      />
    </div>
  );
}
const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = (dispatch) => {
  return { dispatch }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
