import { initialize, getIdName, checkThreeBox } from '../src/main'; // Adjust the import path

describe('Tic-Tac-Toe Tests', () => {
	beforeEach(() => {
		// Mock the DOM structure
		document.body.innerHTML = `
      <div class="select-box">
        <button class="playerX">Player X</button>
        <button class="playerY">Player Y</button>
      </div>
      <div class="play-board">
        <section>
          <span class="box1"></span>
          <span class="box2"></span>
          <span class="box3"></span>
          <span class="box4"></span>
          <span class="box5"></span>
          <span class="box6"></span>
          <span class="box7"></span>
          <span class="box8"></span>
          <span class="box9"></span>
        </section>
        <div class="players"></div>
      </div>
      <div class="result-box">
        <p></p>
        <button>Restart</button>
        <div class="won-text"></div>
      </div>
    `;

		// Initialize DOM-dependent variables
		initialize();
	});

	test('getIdName should return the correct ID for a valid box', () => {
		const box1 = document.querySelector('.box1');
		box1?.setAttribute('id', 'X');
		expect(getIdName(1)).toBe('X'); // box1 has id="X"
	});

	test('checkThreeBox should return true when all three boxes match the sign', () => {
		const box1 = document.querySelector('.box1');
		const box2 = document.querySelector('.box2');
		const box3 = document.querySelector('.box3');
		box1?.setAttribute('id', 'X');
		box2?.setAttribute('id', 'X');
		box3?.setAttribute('id', 'X');

		expect(checkThreeBox(1, 2, 3, 'X')).toBe(true); // All boxes have id="X"
	});

	test('checkThreeBox should return false when not all boxes match the sign', () => {
		const box1 = document.querySelector('.box1');
		const box2 = document.querySelector('.box2');
		const box3 = document.querySelector('.box3');
		box1?.setAttribute('id', 'X');
		box2?.setAttribute('id', 'X');
		box3?.setAttribute('id', 'O');

		expect(checkThreeBox(1, 2, 3, 'X')).toBe(false); // Not all match
	});
});
