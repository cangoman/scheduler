import React from 'react';
import "components/InterviewerListItem.scss";

const classNames = require('classnames');

export default function InterviewerListItem(props) {

  const InterviewerListItemClass = classNames(
    'interviewers__item', {
    'interviewers__item--selected': props.selected
    }
  );

  return(
    <li className={InterviewerListItemClass} 
    onClick={() => props.setInterviewer(props.name)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      {props.selected && props.name}
  </li>
  );
}