import {useEffect, useReducer } from 'react'
import axios from 'axios';
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";


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