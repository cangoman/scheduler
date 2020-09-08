import React from "react";

import { render, cleanup, waitForElement, getByAltText, getByText, getAllByTestId, getByPlaceholderText, prettyDOM, act, queryByText } from "@testing-library/react";

import Application from "components/Application";
import { fireEvent } from "@testing-library/react/dist";


afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);
  
  await waitForElement(() => getByText("Monday"));
  fireEvent.click(getByText("Tuesday"));
  expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });


  it ("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

    const { container, debug } = render(<Application />);
    
    await waitForElement( () => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, 'Add'))
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.change(getByAltText(appointment, "Sylvia Palmer"));
    
    act(()=> {
      fireEvent.click(getByText(appointment, "Save"))
    })
  
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    
    const monday = getAllByTestId(container, 'day').find( day => queryByText(day, /monday/i));
    
  // ASK A MENTOR ABOUT THIS COUPLE OF LINES

    //expect(queryByText(monday, /no spots remaining/i)).toBeInTheDocument();
    //expect(queryByText(monday, / spot remaining/i)).toBeInTheDocument();

  })

})

