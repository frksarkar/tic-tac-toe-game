// Global variables
let selectBox: HTMLDivElement | null = null;
let selectXBtn: HTMLButtonElement | null = null;
let selectOBtn: HTMLButtonElement | null = null;
let playBoard: HTMLDivElement | null = null;
let playerSelect: HTMLDivElement | null = null;
let allBox: NodeListOf<HTMLElement> | null = null;
let score: HTMLDivElement | null = null;
let player: HTMLParagraphElement | null = null;
let restart: HTMLButtonElement | null = null;
let winTxt: HTMLDivElement | null = null;

// Initialize DOM elements
function initializeDOM() {
	selectBox = query<HTMLDivElement>('.select-box');
	if (!selectBox) throw new Error('selectBox not found');

	selectXBtn = query<HTMLButtonElement>('.playerX', selectBox);
	selectOBtn = query<HTMLButtonElement>('.playerY', selectBox);

	playBoard = query<HTMLDivElement>('.play-board');
	if (!playBoard) throw new Error('playBoard not found');

	playerSelect = query<HTMLDivElement>('.players', playBoard);
	allBox = queryAll<HTMLElement>('section span');
	score = query<HTMLDivElement>('.result-box');
	if (!score) throw new Error('score not found');

	player = query<HTMLParagraphElement>('p', score);
	restart = query<HTMLButtonElement>('button', score);
	winTxt = query<HTMLDivElement>('.won-text');
}
// Query utility functions
function query<T extends HTMLElement>(
	selector: string,
	parent?: HTMLElement
): T | null {
	const root = parent || document;
	return root.querySelector(selector) as T;
}

function queryAll<T extends HTMLElement>(
	selector: string
): NodeListOf<T> | null {
	return document.querySelectorAll(selector);
}

// Rest of the code remains unchanged...

interface Tool {
	playerX: string;
	playerY: string;
	playerSign: string;
	botRun: boolean;
}

const tool: Tool = {
	playerX: '<i class="fa-solid fa-x"></i>',
	playerY: '<i class="fa-solid fa-o"></i>',
	playerSign: 'X',
	botRun: true,
};

function validateElement(element: any, message: string) {
	if (!element) throw new Error(message);
}

function validateElements() {
	validateElement(selectBox, 'selectBox not found');
	validateElement(selectXBtn, 'selectXBtn not found');
	validateElement(selectOBtn, 'selectOBtn not found');
	validateElement(playBoard, 'playBoard not found');
	validateElement(playerSelect, 'playerSelect not found');
	validateElement(allBox, 'allBox not found');
	validateElement(score, 'score not found');
	validateElement(player, 'player not found');
	validateElement(restart, 'restart not found');
	validateElement(winTxt, 'winTxt not found');
}

function bindClickHandler() {
	allBox?.forEach((element) => {
		element.addEventListener('click', (e) => {
			clickedBox(e.target as HTMLElement);
		});
	});
}

function setupEventListeners() {
	selectBox?.addEventListener('click', handleSelectedBoxClick);
}

function handleSelectedBoxClick(e: Event) {
	const target = e.target as HTMLElement;
	if (target.classList.contains('playerX')) {
		selectBox?.classList.add('hide');
		playBoard?.classList.add('show');
	} else if (target.classList.contains('playerY')) {
		selectBox?.classList.add('hide');
		playBoard?.classList.add('show');
		playerSelect?.setAttribute('class', 'players active player');
	}
}

function randomDelayTime(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateBox(
	element: HTMLElement,
	playerSign: string,
	playerContain: string,
	className: string,
	color: string
) {
	element.innerHTML = playerContain;
	element.setAttribute('id', playerSign);
	element.classList.add(className);
	element.style.color = color;
}

function clickedBox(element: HTMLElement) {
	const selectPlayer = playerSelect?.classList;
	if (!selectPlayer) throw new Error('selectPlayer not found');

	if (selectPlayer.contains('player')) {
		tool.playerSign = 'O';
		updateBox(element, tool.playerSign, tool.playerY, 'text-red', 'red');
		selectPlayer.remove('active');
		selectPlayer.remove('player');
	} else {
		tool.playerSign = 'X';
		updateBox(element, tool.playerSign, tool.playerX, 'text-blue', 'blue');
		selectPlayer.add('active');
		selectPlayer.add('player');
	}

	if (!playBoard) throw new Error('playBoard not found');
	playBoard.style.pointerEvents = 'none';
	element.style.pointerEvents = 'none';
	selectWinner();
	setTimeout(bot, randomDelayTime(200, 1000));
}

// bot click element

function bot() {
	if (tool.botRun) {
		const unselectedElement = [];
		if (!allBox) throw new Error('allBox not found');

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
			const selectPlayer = playerSelect?.classList;
			if (!selectPlayer) throw new Error('selectPlayer not found');
			if (selectPlayer.contains('player')) {
				tool.playerSign = 'O';
				randomBoxSelected.setAttribute('id', tool.playerSign);
				randomBoxSelected.innerHTML = tool.playerY;
				randomBoxSelected.style.color = 'red';
				selectPlayer.remove('active');
				selectPlayer.remove('player');
			} else {
				tool.playerSign = 'X';
				randomBoxSelected.setAttribute('id', tool.playerSign);
				randomBoxSelected.innerHTML = tool.playerX;
				playerSelect?.classList.add('active');
				playerSelect?.classList.add('player');
			}
		}
		selectWinner();
		if (!playBoard) throw new Error('playBoard not found');
		playBoard.style.pointerEvents = 'auto';
		randomBoxSelected.style.pointerEvents = 'none';
	}
}

// select winner

function getIdName(idName: number) {
	return playBoard?.querySelector('.box' + idName)?.id;
}

// check three box type

function checkThreeBox(
	box1: number,
	box2: number,
	box3: number,
	sign: string
): boolean {
	if (
		getIdName(box1) == sign &&
		getIdName(box2) == sign &&
		getIdName(box3) == sign
	) {
		return true;
	}
	return false;
}

const winnerCombination = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7],
];

function selectWinner() {
	if (
		winnerCombination.some(([a, b, c]) =>
			checkThreeBox(a, b, c, tool.playerSign)
		)
	) {
		tool.botRun = false;
		score!.style.opacity = '1';
		score!.style.pointerEvents = 'auto';
		player!.innerHTML = tool.playerSign;
	} else if (
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
		score!.style.opacity = '1';
		score!.style.pointerEvents = 'auto';
		winTxt!.innerHTML = 'Match has been drawn!';
	}
}

function restartGame() {
	restart?.addEventListener('click', () => {
		window.location.reload();
	});
}

function initialize() {
	initializeDOM();
	validateElements();
	bindClickHandler();
	setupEventListeners();
	restartGame();
}

export { clickedBox, checkThreeBox, getIdName, initialize };
