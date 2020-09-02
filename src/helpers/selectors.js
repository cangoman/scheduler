export function getAppointmentsForDay(state, day) {
  
  const dayMatch = state.days.filter( x => x.name === day);
  return (dayMatch.length === 0) ? [] : dayMatch[0].appointments.map( x => state.appointments[x] )
}



