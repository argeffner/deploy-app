import React from "react";
import { render, screen, within, fireEvent} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import api from '../Api';
import { shallow } from 'enzyme';
import { SnakeBoard } from '../board/SnakeBoard';
import "jest-dom/extend-expect";

/* 
Three key async tests include:
- checking that data has been moved from database to front end
- making sure that the snake hits boundary in order to end game
- time out between each key press for directional testing
 */

jest.mock("../Api");

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <SnakeBoard />
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });


// Checks if snake game starts and the process from start to finish 
// without applying movement to the snake
describe('test start game to game over', () => {

  it('shows the start game with button', () => {
    const { getByTestId } = render(<SnakeBoard />);
    const startButton = getByTestId("start");
    const newGame = getByTestId('new-game');
    const highScore = within(newGame).getByTestId('highscore-start')
    
    expect(newGame.length).toBe(1);
    expect(highScore.length).toBe(1);
    expect(screen.getByText('Highscore:')).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();
  });

  it('should start the game', ()=> {
    const { getByTestId } = render(<SnakeBoard />);
    const startButton = getByTestId("start");
    const newGame = getByTestId('new-game');

    // starts the game
    fireEvent.click(startButton);

    expect(newGame).not.toBeInTheDocument();
    expect(startButton).not.toBeInTheDocument();
  });

  // set Timeout within the test 
  it('should show game over', async () => {
    const { getByTestId } = render(<SnakeBoard />);
    const startButton = getByTestId("start");
    const endGame = getByTestId('game-over');
    const highScore = within(endGame).getByTestId('highscore-end')

    // starts the game
    fireEvent.click(startButton);
    await new Promise((r) => setTimeout(r, 6000));

    expect(endGame).toBeInTheDocument();
    expect(highScore).toBeInTheDocument();
    expect(screen.getByText('Highscore:')).toBeInTheDocument();
  }, 10000);
});



// Checks all the async score data for the snake game
describe('Get HighScore', () => {

  // set Timeout inside specific test 
  test('will show highscore at end game', async () => {
    const data = [{ name: "fake", score: '100' }];
    api.getSnake.mockResolvedValueOnce(data);
    const { getByTestId } = render(<SnakeBoard />);
    const startButton = getByTestId("start");
    const endGame = getByTestId('game-over');
  
      // starts the game
    fireEvent.click(startButton);
    await new Promise((r) => setTimeout(r, 6000));
  
    expect(endGame).toBeInTheDocument();
    await data.forEach((item) =>
      expect(screen.getByText(item.score)).toBeInTheDocument());
  }, 10000);

  // set Timeout inside specific test 
  it('will show Highscore after clicking start', async () => {
    const data = [{ name: "fake", score: '100' }];
    api.getSnake.mockResolvedValueOnce(data);
    const { getByTestId } = render(<SnakeBoard />);
    const startButton = getByTestId("start");
    const endGame = getByTestId('game-over');
    const newGame = getByTestId('new-game');

    // starts game 
    fireEvent.click(startButton);
    await new Promise((r) => setTimeout(r, 6000));
    
    expect(endGame).toBeInTheDocument();
    await data.forEach((item) =>
      expect(screen.getByText(item.score)).toBeInTheDocument());

    // start game again
    fireEvent.click(startButton);
    // will show highscore again and newgame
    expect(newGame).toBeInTheDocument();
    await data.forEach((item) =>
      expect(screen.getByText(item.score)).toBeInTheDocument());
  }, 10000)
})



describe('test direction by pressing keys', () => {

  it('presses left key / moves left', () => {
    const { getByTestId } = render(<SnakeBoard />);
    const startButton = getByTestId("start");
    const wrapper = shallow(<SnakeBoard />);
    const input = wrapper.find('input');
    // start snake game
    fireEvent.click(startButton);
    input.simulate('keydown', { keyCode: 37 });
  });

  // need set timeout to give time between each keypress
  it('presses up key / moves up', async () => {
    const { getByTestId } = render(<SnakeBoard />);
    const startButton = getByTestId("start");
    const wrapper = shallow(<SnakeBoard />);
    const input = wrapper.find('input');
    // start snake game
    fireEvent.click(startButton);
    // already starting upwards so first move right or left
    // otherwise keypress is irrelevent 
    input.simulate('keydown', { keyCode: 37 });
    await new Promise((r) => setTimeout(r, 1000));
    input.simulate('keydown', { keyCode: 38 });
  }, 2000);

  it('presses right key / moves right', () => {
    const { getByTestId } = render(<SnakeBoard />);
    const startButton = getByTestId("start");
    const wrapper = shallow(<SnakeBoard />);
    const input = wrapper.find('input');
    // start snake game
    fireEvent.click(startButton);
    input.simulate('keydown', { keyCode: 39 });
  });

  it('presses down key / moves down', async () => {
    const { getByTestId } = render(<SnakeBoard />);
    const startButton = getByTestId("start");
    const wrapper = shallow(<SnakeBoard />);
    const input = wrapper.find('input');
    // start snake game
    fireEvent.click(startButton);
    // code designed to prevent movement in opposite direction
    // since it is already moving upwards, first need to move right or left before moving down 
    // otherwise keypress is irrelevent 
    input.simulate('keydown', { keyCode: 37 });
    await new Promise((r) => setTimeout(r, 1000));
    input.simulate('keydown', { keyCode: 40 });
  }, 2000);
});




















// describe('test for causing gameover', () => { 
// // snake leaves bounds and snake eats self
  
//   it('is out of bounds from canvas', () => {
//     const wrapper = shallow(<SnakeBoard />);
//     const snakeOutX = [
//         [-1, 10],
//         [0, 10],
//         [0, 11]
//       ];
//     wrapper.instance().setSnake = jest.fn(); // mock `setPage` method
//     wrapper.instance().pageChanged(page);

//       expect(wrapper.instance().setPage).toHaveBeenCalledWith(page, false);
//   })
// })