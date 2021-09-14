import React from "react";
import { render, screen, within} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home";
import api from '../Api';
import {mount} from 'enzyme';
import { SnakeBoard } from '../board/SnakeBoard';
import "jest-dom/extend-expect";

jest.mock("../Api");
jest.mock("../board/SnakeBoard");

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
          <Home />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should show valid path to snakegame', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/snake' ]}>
      <Home/>
    </MemoryRouter>
  );
  expect(wrapper.find(SnakeBoard)).toHaveLength(1);
})

it("shows titles player and highscore", async function() {
  const { getByTestId } = render(<Home />);
  const playerscore = getByTestId('score-name')
  const player = within(playerscore).getByTestId('player')
  const highest = within(playerscore).getByTestId('highest')
  expect(player.length).toBe(1);
  expect(highest.length).toBe(1);
  expect(screen.getByText('Player Name:')).toBeInTheDocument();
  expect(screen.getByText('Highscore:')).toBeInTheDocument();
})
// current highest score is 7 playrtname wilburt
test('will show name and highscore', async () => {
  const data = [{ name: "fake", score: '100' }];
  api.getSnake.mockResolvedValueOnce(data);
  await data.forEach((item) =>
    expect(screen.getByText(item.name)).toBeInTheDocument());
  await data.forEach((item) =>
    expect(screen.getByText(item.score)).toBeInTheDocument());
})

