const selectBox = document.querySelector('.select-box');
const selectXBtn = selectBox.querySelector('.playerX');
const selectOBtn = selectBox.querySelector('.playerY');
const playBoard = document.querySelector('.play-board');
const allBox = document.querySelectorAll('section span');
const playerSelect = playBoard.querySelector('.players');
const playerO = '<i class="fa-solid fa-o"></i>';
const playerX = '<i class="fa-solid fa-x"></i>';

window.onload = () => {
	allBox.forEach((element) => {
		element.setAttribute('onclick', 'clickedBox(this)');
	});
	selectBox.addEventListener('click', (e) => {
		if (e.target.classList.contains('playerX')) {
			selectBox.classList.add('hide');
			playBoard.classList.add('show');
		} else if (e.target.classList.contains('playerY')) {
			selectBox.classList.add('hide');
			playBoard.classList.add('show');
			playerSelect.setAttribute('class', 'players active player');
		}
	});
};

function clickedBox(element) {
	console.log(element);
	if (playerSelect.classList.contains('player')) {
		element.innerHTML = playerO;
		element.style.color = 'red';
		playerSelect.classList.remove('active');
		playerSelect.classList.remove('player');
	} else {
		element.innerHTML = playerX;
		playerSelect.classList.add('active');
		playerSelect.classList.add('player');
	}
	element.style.pointerEvents = 'none';
}
