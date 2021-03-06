export function getAppointmentsForDay(state, day) {
  
  const dayMatch = state.days.filter( x => x.name === day);
  return (dayMatch.length === 0) ? [] : dayMatch[0].appointments.map( x => state.appointments[x] )
}

export function getInterview(state, interview) {
  return (interview) 
  ? {
      student: interview.student,
      interviewer: {...state.interviewers[interview.interviewer]}
    } 
    : null;
}


export function getInterviewersForDay(state, day) {
  const dayMatch = state.days.filter( x => x.name === day);
  return (dayMatch.length === 0) ? [] : dayMatch[0].interviewers.map( x => state.interviewers[x] )
}


