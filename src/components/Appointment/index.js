import React, { useEffect } from 'react';

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss"

const EMPTY         = "EMPTY";
const SHOW          = "SHOW";
const CREATE        = "CREATE";
const EDIT          = "EDIT";
const SAVING        = "SAVING";
const DELETING      = "DELETING";
const CONFIRM       = "CONFIRM";
const ERROR_SAVE    = "ERROR_SAVE";
const ERROR_DELETE  = "ERROR_DELETE ";



export default function Appointment(props) {
  const { interview } = props;
  const {mode, transition, back } = useVisualMode( interview ? SHOW : EMPTY );

  const save = (name, interviewer) => {
    const interview = {
      student: name, 
      interviewer
    }
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then( () => transition(SHOW))
      .catch( () => transition(ERROR_SAVE, true));
  }

  const deleteAppointment = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then( () => transition(EMPTY))
      .catch( () => transition(ERROR_DELETE, true))
  }

  useEffect( () => {
    
    if (interview && mode === EMPTY) {
      transition(SHOW)
    }

    if ( (!interview) && mode === SHOW) {
      transition(EMPTY)
    }
  }, [interview, transition, mode]);

  
  return(
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && interview &&
        (<Show 
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={ () => transition(CONFIRM) }
          onEdit={() => transition(EDIT)}
        />
        )
      }
      {mode === CREATE && 
        (<Form 
          interviewers={props.interviewers} 
          onCancel={back}
          onSave={save}
        />
        )
      }
      {mode === EDIT && 
        (<Form 
          interviewers={props.interviewers}
          name={interview.student}
          interviewer={interview.interviewer.id} 
          onCancel={back}
          onSave={save}
        />
        )
      }
        
      {mode === SAVING && 
        (<Status 
          message="Saving" 
        />
        )
      }
      {mode === DELETING && 
        (
        <Status 
          message="Deleting" 
        />
        )
      }
      {mode === CONFIRM && 
        (
        <Confirm 
          message="Are you sure you would like to delete?" 
          onConfirm={deleteAppointment}
          onCancel={back}
        />
        )
      }
      {mode === ERROR_DELETE &&
        (<Error 
          message="Could not cancel appointment" 
          onClose={back} 
        />)
      }
      {mode === ERROR_SAVE &&
        (<Error 
          message="Could not save appointment" 
          onClose={back} 
        />)
      }


    </article>
  )
}