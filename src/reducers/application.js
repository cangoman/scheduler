export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";


const reducers = {
  [SET_DAY](state, action){
    return {...state, day: action.day}
  },
  [SET_APPLICATION_DATA](state, action) {
    return {
      days: action.days, 
      appointments: action.appointments, 
      interviewers: action.interviewers, 
      day: state.day}
  },

  [SET_INTERVIEW](state, action) {
    const appointment = {
      ...state.appointments[action.id],
      interview: action.interview ? { ...action.interview } : null
    };

    const appointments = {
      ...state.appointments,
      [action.id]: appointment
    }
    
    const days = state.days.map( day => {
      const spots = (state.appointments[action.id].interview && action.interview) ? day.spots : ((action.interview) ? day.spots - 1 : day.spots + 1);
      return day.appointments.includes(action.id) ? {...day, spots} : day; 
    });

    return {
      ...state,
      appointments,
      days
    }
  }
}

 export default function reducer(state, action) {
  return reducers[action.type](state, action) || state;
}
