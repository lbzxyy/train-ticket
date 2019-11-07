export const ACTION_SET_FROM = 'SET_FROM';
export const ACTION_SET_TO = 'SET_TO';
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE =
    'SET_IS_CITY_SELECTOR_VISIBLE';
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY =
    'SET_CURRENT_SELECTING_LEFT_CITY';
export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA';
export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA';
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE =
    'SET_IS_DATE_SELECTOR_VISIBLE';
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';
// 出发站
export function setFrom(from) {
  return {
    type: ACTION_SET_FROM,
    payload: from
  }
}
// 抵达站
export function setTo(to) {
  return {
    type: ACTION_SET_TO,
    payload: to
  }
}
// 节流 是否正在加载请求
export function setIsLoadingCityData(isLoadingCityData) {
  return {
      type: ACTION_SET_IS_LOADING_CITY_DATA,
      payload: isLoadingCityData,
  };
}
// 设置城市数据
export function setCityData(cityDate) {
  return {
      type: ACTION_SET_CITY_DATA,
      payload: cityDate,
  };
}
// 切换是否选择只查高铁
export function toggleHighSpeed() {
  return (dispatch, getState) => {
    const { highSpeed } = getState()
    dispatch({
      type: ACTION_SET_HIGH_SPEED,
      payload: !highSpeed
    })
  }
}
// 显示城市弹窗
export function showCitySelector(currentSelectingLeftCity) {
  console.log(currentSelectingLeftCity,'currentSelectingLeftCity8888')
  return (dispatch) => {
    dispatch({
      type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload: true
    })
    dispatch({
      type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
      payload: currentSelectingLeftCity
    })
  }
}
// 隐藏城市弹窗
export function hideCitySelector() {
  return{
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload: false
  }
}
// 回显选择哪个城市到那边
export function setSelectedCity(city) {
  return (dispatch, getState) => {
    const { currentSelectingLeftCity } = getState()
    console.log(currentSelectingLeftCity,'currentSelectingLeftCity')
    if(currentSelectingLeftCity) {
      dispatch(setFrom(city))
    }else{
      dispatch(setTo(city))
    }
    dispatch(hideCitySelector())
  }
}
// 显示日前组件
export function showDateSelector() {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: true
  }
}
// 隐藏日前组件
export function hideDateSelector() {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: false
  }
}
// 切换出发站和抵达站
export function exchangeFromTo() {
  return (dispatch, getState) => {
    const { from, to } = getState()
    dispatch(setFrom(to))
    dispatch(setTo(from))
  }
}
// 出发日前
export function setDepartDate(departDate) {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: departDate
  }
}
// 
export function fetchCityData() {
  return (dispatch, getState) => {
    const { isLoadingCityData } = getState()
    if(isLoadingCityData){
      return
    }
    const cache = JSON.parse(localStorage.getItem('city_data_cache') || '{}')
    if(Date.now() < cache.expires){
      dispatch(setCityData(cache.data))
      return;
    }
        
    dispatch(setIsLoadingCityData(true))
    fetch('/rest/cities?_' + Date.now())
      .then(res => 
        res.json()
      ).then(cityData=>{
        dispatch( setCityData( cityData) )
        localStorage.setItem('city_data_cache',JSON.stringify({
          expires: Date.now() + 60*1000,
          data: cityData
        }))
        dispatch(setIsLoadingCityData(false))
      }).catch(err=>{
        console.error(err);
        dispatch(setIsLoadingCityData(false))
      })
  }
}

