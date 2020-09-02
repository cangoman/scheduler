import React from 'react';

import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"


import "components/Appointment/styles.scss"


export default function Appointment(props) {
  const { interview } = props;
  const isInterview = (props.interview) ? <Show student={interview.student} interviewer={interview.interviewer} /> : <Empty />;

  return(
    <article className="appointment">
      <Header time={props.time}/>
      {isInterview}
    </article>
  )
}