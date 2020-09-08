import {useEffect, useReducer } from 'react'
import axios from 'axios';


const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";


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

function reducer(state, action) {
  return reducers[action.type](state, action) || state;
}

const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);


export default function useApplicationData() {
  
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
    }
  );


  const setDay = day => dispatch({type: SET_DAY, day})

  useEffect( () => {
    
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')])
      .then( all => {
        dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})
      })
    }, []);


  useEffect( () => {
    webSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      dispatch({...message})
    }
  }, [])


  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, {interview})
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}