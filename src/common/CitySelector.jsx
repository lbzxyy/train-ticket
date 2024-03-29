import React, { useState, useMemo, useEffect, memo } from 'react'
import './CitySelector.css'
import classnames from 'classnames'
import PropTypes from 'prop-types'


// 城市每一项
const CityItem = memo(function CityItem(props) {
  const {
    name,
    onSelect
  } = props

  return (
    <li className="city-li" onClick={()=>onSelect(name)} >
      { name }
    </li>
  )
})
CityItem.propTypes = {
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
// 城市集合
const CitySection = memo(function CitySection(props) {
  const {
    title,
    onSelect,
    cites = []
  } = props

  return(
    <ul className="city-ul">
      <li className="city-li" key="title">{title}</li>
      {
        cites.map( city => {
          return <CityItem 
            key={city.name}
            name={city.name}
            onSelect={onSelect}
          />
        })
      }
    </ul>
  )
})
CitySection.propTypes = {
  title: PropTypes.string.isRequired,
  cities: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
};
// 城市列表
const CityList = memo(function CityList(props) {
  const {
    sections,
    onSelect
  } = props
  return (
    <div className="city-list">
      <div className="city-cate">
        {
          sections.map( section => {
            return <CitySection
              key={section.title}
              title={section.title}
              cites={section.citys}
              onSelect={onSelect}
            />
          })
        }
      </div>
    </div>
  )
})
CityList.propTypes = {
  sections: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  // toAlpha: PropTypes.func.isRequired,
};



 const CitySelector = memo(function CitySelector(props) {
  const {
    show,
    cityData,
    isLoading,
    onBack,
    fetchCityData,
    onSelect,
} = props;

const [searchKey, setSearchKey] = useState('')
const key =  useMemo(()=>{
  return searchKey.trim()},[searchKey])

  useEffect(()=>{
    if(!show ||isLoading || cityData) {
      return;
    }
    fetchCityData()
  },[show,isLoading,cityData,fetchCityData])

const outputCitySections = () => {
  if(isLoading) {
    return(
      <div>Loading</div>
    )
  }
  if(cityData) {
    return (
      <CityList
        sections={cityData.cityList}
        onSelect={onSelect}
      />
    )
  }
  return <div>error</div>
}

  return (
    <div className={classnames(
      'city-selector',
      {
        hidden: !show
      }
    )}>
      <div className="city-search">
                <div className="search-back" onClick={() => onBack()}>
                    <svg width="42" height="42">
                        <polyline
                            points="25,13 16,21 25,29"
                            stroke="#fff"
                            strokeWidth="2"
                            fill="none"
                        />
                    </svg>
                </div>
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        value={searchKey}
                        className="search-input"
                        placeholder="城市、车站的中文或拼音"
                        onChange={e => setSearchKey(e.target.value)}
                    />
                </div>
                <i
                    onClick={() => setSearchKey('')}
                    className={classnames('search-clean', {
                        hidden: key.length === 0,
                    })}
                >
                    &#xf063;
                </i>
            </div>
            {outputCitySections()}
    </div>
  )
})

CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  cityData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  fetchCityData: PropTypes.func.isRequired,
  // onSelect: PropTypes.func.isRequired,
};

export default CitySelector