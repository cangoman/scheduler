import React from 'react';

import "components/DayListItem.scss";
const classNames = require('classnames');

const formatSpots = (spots) => {
  return (spots === 0) ? "no spots" : ((spots === 1) ? "1 spot" : `${spots} spots`)
}

export default function DayListItem(props) {
  
  const dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected" : props.selected,
    "day-list__item--full": (props.spots === 0)
    }
  );
  return (
  <li className={dayListItemClass} onClick={() => props.setDay(props.name)} data-testid="day">
    <h2 className="text--regular">{props.name}</h2>
    <h3 className="text--light"> {formatSpots(props.spots)} remaining</h3>
  </li>
  );
}