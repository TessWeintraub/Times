import React, {useState} from 'react';
import classes from "./SelectFilter.module.css";
import {selectArrow, selectArrowActive} from "../../../assets/icons";


const SelectFilter = ({data, setState,state, placeholder, label}) => {
  const [isActive, setIsActive] = useState(false)
  const handleClickSelect = () => {
    isActive ? setIsActive(false) : setIsActive(true)
  }

  const handleClickOption = (option) => {
    if (!state.length) return setState([option])
      const newActiveOptions = JSON.parse(JSON.stringify(state))
      const isExistedElement = newActiveOptions.includes(option)
      isExistedElement ? newActiveOptions.splice(newActiveOptions.indexOf(option), 1) : newActiveOptions.push(option)
    setState(newActiveOptions)
  }

  return (
    <div className={classes.container}>
      {label && <p className={classes.container_label}>{label}</p>}
      <div
        className={classes.container_select}
        onClick={()=> handleClickSelect()}
        style={{borderColor: isActive ? 'black' : '#E6E8EA'}}
      >
        <>
          {state.length
            ?
            <span className={classes.container_select_active}>{state.length > 1 ? state.map(option => `${option}, `) : state[0]}</span>
            :
            <span className={classes.container_select_placeholder}>{placeholder}</span>
          }
          {isActive
            ?
            selectArrowActive
            :
            selectArrow
          }
        </>
      </div>
      {isActive && <div className={classes.container_options}>
        {data.length && data.map( warehouse =>
          <div
            className={classes.container_option}
            onClick={()=> handleClickOption(warehouse)}
            key={warehouse}
          >
            <span>{warehouse}</span>
          </div>
        )}
      </div>
      }
    </div>
  )
};
export default SelectFilter;