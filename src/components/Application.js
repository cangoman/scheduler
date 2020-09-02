import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index"
import { getAppointmentsForDay } from "helpers/selectors";



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState( prevState => ({...prevState, day}));
    
  useEffect( () => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments')])
      .then( all => setState( prevState => ({ ...prevState, days: all[0].data, appointments: all[1].data})
      ))
    })
    
    const appointments = getAppointmentsForDay(state, state.day);
    const apptComponents = appointments.map( appt => (<Appointment key={appt.id} {...appt} />) );


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {apptComponents}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
