import reducer from "./application"

describe("reducer", () => {

  it("throws and error with an unsupported time", () => {
    expect(() => reducer({}, {type: null})).toThrowError(
      /is not a function/i
    );
  })
})