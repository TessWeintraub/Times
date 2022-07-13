import React, {useState} from 'react';
import classes from "./SelectSort.module.css";
import {selectArrow, selectArrowActive} from "../../../assets/icons";


const SelectSort = ({state,setState, placeholder, label}) => {
  const [isActive, setIsActive] = useState(false)
  const handleClickSelect = () => {
    isActive ? setIsActive(false) : setIsActive(true)
  }

  const handleClickOption = (data) => {
    setIsActive(false)
    setState(data)
  }

  const listSorting = [
    {name: 'По дате', key: 'date'},
    {name: 'По популярности', key: 'views_count'}
  ]

  return (
    <div className={classes.container}>
      {label && <p className={classes.container_label}>{label}</p>}
      <div
        className={classes.container_select}
        onClick={()=> handleClickSelect()}
        style={{borderColor: isActive ? 'black' : '#E6E8EA'}}
      >
        <>
          {state
            ?
            <span className={classes.container_select_active}>{state.name}</span>
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
        {listSorting.map( warehouse =>
          <div
            className={classes.container_option}
            onClick={()=> handleClickOption(warehouse)}
            key={warehouse.key}
          >
            <span>{warehouse.name}</span>
          </div>
        )}
      </div>
      }
    </div>
  )
};
export default SelectSort;