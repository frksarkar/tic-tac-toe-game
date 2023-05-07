const selectBox = document.querySelector('.select-box');
const selectXBtn = selectBox.querySelector('.playerX');
const selectOBtn = selectBox.querySelector('.playerY');
const playBoard = document.querySelector('.play-board');
const allBox = document.querySelectorAll('section span');
const playerSelect = playBoard.querySelector('.players');
const score = document.querySelector('.result-box');
const player = score.querySelector('p');
const restart = score.querySelector('button');
const winTxt = document.querySelector('.won-text');

const tool = {
	playerX: '<i class="fa-solid fa-x"></i>',
	playerY: '<i class="fa-solid fa-o"></i>',
	playerSign: 'X',
	botRun: true,
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
	if (playerSelect.classList.contains('player')) {
		tool.playerSign = 'O';
		element.setAttribute('id', tool.playerSign);
		element.innerHTML = tool.playerY;
		element.style.color = 'red';
		playerSelect.classList.remove('active');
		playerSelect.classList.remove('player');
	} else {
		tool.playerSign = 'X';
		element.innerHTML = tool.playerX;
		playerSelect.classList.add('active');
		playerSelect.classList.add('player');
		element.setAttribute('id', tool.playerSign);
	}
	playBoard.style.pointerEvents = 'none';
	element.style.pointerEvents = 'none';
	selectWinner();
	const randomDelayTime = (Math.random() * 1000 + 200).toFixed();
	setTimeout(() => {
		bot();
	}, randomDelayTime);
}

// bot click element

function bot() {
	if (tool.botRun) {
		const unselectedElement = [];
		for (let index = 0; index < allBox.length; index++) {
			if (allBox[index].childElementCount == 0) {
				unselectedElement.push(allBox[index]);
			}
		}
		const randomBoxSelected =
			unselectedElement[
				Math.floor(Math.random() * unselectedElement.length)
			];
		if (unselectedElement.length > 0) {
			if (playerSelect.classList.contains('player')) {
				tool.playerSign = 'O';
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
		selectWinner();
		playBoard.style.pointerEvents = 'auto';
		randomBoxSelected.style.pointerEvents = 'none';
	}
}

// select winner

function getIdName(idName) {
	return playBoard.querySelector('.box' + idName).id;
}

function checkThreeBox(val1, val2, val3, sign) {
	if (
		getIdName(val1) == sign &&
		getIdName(val2) == sign &&
		getIdName(val3) == sign
	) {
		return true;
	}
}

function selectWinner() {
	if (
		checkThreeBox(1, 2, 3, tool.playerSign) ||
		checkThreeBox(4, 5, 6, tool.playerSign) ||
		checkThreeBox(7, 8, 9, tool.playerSign) ||
		checkThreeBox(1, 5, 9, tool.playerSign) ||
		checkThreeBox(3, 5, 7, tool.playerSign) ||
		checkThreeBox(1, 4, 7, tool.playerSign) ||
		checkThreeBox(2, 5, 8, tool.playerSign) ||
		checkThreeBox(3, 6, 9, tool.playerSign)
	) {
		tool.botRun = false;
		score.style.opacity = '1';
		score.style.pointerEvents = 'auto';
		player.innerHTML = tool.playerSign;
	}
	if (
		getIdName(1) != '' &&
		getIdName(2) != '' &&
		getIdName(3) != '' &&
		getIdName(4) != '' &&
		getIdName(5) != '' &&
		getIdName(6) != '' &&
		getIdName(7) != '' &&
		getIdName(8) != '' &&
		getIdName(9) != ''
	) {
		tool.botRun = false;
		score.style.opacity = 1;
		score.style.pointerEvents = 'auto';
		winTxt.innerHTML = 'Match has been drawn!';
	}
}

restart.addEventListener('click', () => {
	window.location.reload();
});
