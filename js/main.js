import { confetti } from "./confetti.js";

const createGameMenu = () => {
  const title = document.createElement('h2');
  const input = document.createElement('input');
  const gameSection = document.querySelector('.game-section__container');

  title.textContent = 'Введите четное количество карточек по горизонтали/вертикали от 2 до 10';
  title.classList.add('game-menu__title');
  input.classList.add('game-menu__input')
  gameSection.innerHTML = '';
  document.querySelector('.confetti').innerHTML = '';

  const choiceDifficult = (numberOfCards) => {
    const button = document.createElement('button');

    button.classList.add('game-menu__difficult-btn');
    button.textContent = 'Начать игру'

    button.addEventListener('click', () => {
      const numberOfCards = Number(input.value);
      startGame(numberOfCards);
    })

    return button
  }

  gameSection.append(title, input, choiceDifficult())
}
const cardsApp = () => {
  createGameMenu();
}

cardsApp();

const duplicateArray = (array) => array.reduce((res, current) => res.concat([current, current]), []);

const createArray = (initialCount) => {
  const table = document.getElementById('container');
  const cardsIcons = [
    'gift',
    'car',
    'code',
    'tree',
    'percent',
    'bomb',
    'cloud',
    'desktop',
    'camera',
    'rocket',
    'coffee',
    'book',
    'bath',
    'diamond',
    'cube',
    'download',
    'child',
    'gavel',
    'film',
    'flask',
    'flag',
    'hotel',
    'laptop',
    'lock',
    'map',
    'globe',
    'paw',
    'star',
    'trash',
    'trophy',
    'umbrella',
    'wifi',
    'dashboard',
    'dollar',
    'font',
    'scissors',
    'warning',
    'music',
    'tag',
    'print',
    'university',
    'history',
    'wrench',
    'rss',
    'magic',
    'server',
    'tint',
    'battery',
    'arrows',
    'anchor'
  ];

  switch (initialCount) {
    case 2:
      table.classList.add('table-2');
      table.classList.remove('table-4', 'table-6', 'table-8', 'table-10')
      return cardsIcons.slice(0, 2);
    case 4:
      table.classList.add('table-4');
      table.classList.remove('table-2', 'table-6', 'table-8', 'table-10')
      return cardsIcons.slice(0, 8);
    case 6:
      table.classList.add('table-6');
      table.classList.remove('table-2', 'table-4', 'table-8', 'table-10')
      return cardsIcons.slice(0, 18);
    case 8:
      table.classList.add('table-8');
      table.classList.remove('table-2', 'table-4', 'table-6', 'table-10')
      return cardsIcons.slice(0, 32);
    case 10:
      table.classList.add('table-10');
      table.classList.remove('table-2', 'table-4', 'table-6', 'table-8')
      return cardsIcons;
    default:
      table.classList.add('table-4');
      table.classList.remove('table-2', 'table-6', 'table-8', 'table-10')
      return cardsIcons.slice(0, 8);
  };


}

const startGame = (difficult) => {
  let firstCard = null;
  let secondCard = null;
  let clickable = true;


  const gameSection = document.querySelector('.game-section__container')
  const gameTable = document.createElement('div');
  const restartBtn = document.createElement('button')
  const cardsIcons = createArray(difficult);
  const duplicatedCardsIcons = duplicateArray(cardsIcons);


  gameSection.innerHTML = '';
  restartBtn.textContent = 'Рестарт';
  gameTable.classList.add('game-table');
  restartBtn.classList.add('restart-btn');

  shuffle(duplicatedCardsIcons);

  duplicatedCardsIcons.forEach(icon => gameTable.append(createGameCard('question-circle', icon)));

  gameSection.append(gameTable, restartBtn);

  restartBtn.addEventListener('click', createGameMenu);

  const cards = document.querySelectorAll('.game-card');

  cards.forEach((card, index) => card.addEventListener('click', () => {
    if (clickable == true && !card.classList.contains('successfully')) {
      card.classList.add('flip');

      if (firstCard == null) {
        firstCard = index;
      } else {
        if (index != firstCard) {
          secondCard = index;
          clickable = false;
        }
      }

      if (firstCard != null && secondCard != null && firstCard != secondCard) {
        if (cards[firstCard].firstElementChild.className === cards[secondCard].firstElementChild.className) {
          setTimeout(() => {
            cards[firstCard].classList.add('successfully');
            cards[secondCard].classList.add('successfully');

            firstCard = null;
            secondCard = null;
            clickable = true;
          }, 500);
        } else {
          setTimeout(() => {
            cards[firstCard].classList.remove('flip');
            cards[secondCard].classList.remove('flip');

            firstCard = null;
            secondCard = null;
            clickable = true;
          }, 500)
        }
      }

      if (Array.from(cards).every(card => card.className.includes('flip'))) {
        document.querySelector('.confetti').innerHTML = confetti;
      }
    }
  }));
}

const createGameCard = (defaultIcon, flippedIcon) => {
  const card = document.createElement('div');
  card.classList.add('game-card');

  const notflippedCard = document.createElement('i');
  const flippedCard = document.createElement('i');

  notflippedCard.classList.add('fa', `fa-${defaultIcon}`);
  flippedCard.classList.add('fa', `fa-${flippedIcon}`);

  card.append(flippedCard, notflippedCard);

  return card;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}
