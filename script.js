const selectBox = document.querySelector('.select-box');
const selectXBtn = selectBox.querySelector('.playerX');
const selectOBtn = selectBox.querySelector('.playerY');
const playBoard = document.querySelector('.play-board');
const allBox = document.querySelectorAll('section span');
const playerSelect = playBoard.querySelector('.players');

const tool = {
	playerX: '<i class="fa-solid fa-x"></i>',
	playerY: '<i class="fa-solid fa-o"></i>',
	playerSign: 'X',
};

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
		tool.playerSign = 'Y';
		element.setAttribute('id', tool.playerSign);
		element.innerHTML = tool.playerY;
		element.style.color = 'red';
		playerSelect.classList.remove('active');
		playerSelect.classList.remove('player');
	} else {
		element.innerHTML = tool.playerX;
		playerSelect.classList.add('active');
		playerSelect.classList.add('player');
		element.setAttribute('id', tool.playerSign);
	}
	element.style.pointerEvents = 'none';
	const randomDelayTime = (Math.random() * 1000 + 200).toFixed();
	setTimeout(() => {
		bot();
	}, randomDelayTime);
}

// bot click element

function bot() {
	const unselectedElement = [];
	for (let index = 0; index < allBox.length; index++) {
		if (allBox[index].childElementCount == 0) {
			unselectedElement.push(allBox[index]);
		}
	}
	const randomBoxSelected =
		unselectedElement[Math.floor(Math.random() * unselectedElement.length)];
	console.log(randomBoxSelected);
	if (unselectedElement.length > 0) {
		if (playerSelect.classList.contains('player')) {
			tool.playerSign = 'Y';
			randomBoxSelected.setAttribute('id', tool.playerSign);
			randomBoxSelected.innerHTML = tool.playerY;
			randomBoxSelected.style.color = 'red';
			playerSelect.classList.remove('active');
			playerSelect.classList.remove('player');
		} else {
			tool.playerSign = 'X';
			randomBoxSelected.setAttribute('id', tool.playerSign);
			randomBoxSelected.innerHTML = tool.playerX;
			playerSelect.classList.add('active');
			playerSelect.classList.add('player');
		}
	}
	randomBoxSelected.style.pointerEvents = 'none';
}
