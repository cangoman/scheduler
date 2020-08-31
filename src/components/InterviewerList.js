import React from 'react';

import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";


export default function InterviewerList (props) {
  
  const interviewerList = props.interviewers.map( (interviewer, index) => {
    return (
      <InterviewerListItem 
        key={index}
        name={interviewer.name} 
        avatar={interviewer.avatar}
        selected={index === props.interviewer}
        setInterviewer={props.setInterviewer}  
      />
    )}
  )
  
  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewerList}</ul>
  </section>
  )
}