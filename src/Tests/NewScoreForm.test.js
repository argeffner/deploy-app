import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import ScoreForm from "../NewScoreForm";


it("matches snapshot", function () {
  const { asFragment } = render(
        <ScoreForm />
  );
  expect(asFragment()).toMatchSnapshot();
});

describe('ScoreForm', () => {
  it('calls the onsubmit function', async () => {
    const mockSubmit = jest.fn()
    const {getByLabelText, getByRole} = render(<ScoreForm onSubmit={mockSubmit} />)
    await act(async () => {
      fireEvent.change(getByLabelText("Name: "), {target: {value: 'testName'}})
      expect(getByLabelText("Name: ").value).toBe('testName')
    })
    await act(async () => {
      fireEvent.click(getByRole("button"))
    })
    expect(mockSubmit).toHaveBeenCalled()
  })
})
