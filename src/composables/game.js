/*eslint-disable*/
import { ref, reactive, computed } from 'vue';
import _ from "lodash";
import { popMethods } from '../store/popup';
import { mainState } from '../store/data';

export const wWidth = ref(window.innerWidth);

const onWidthChange = () => wWidth.value = window.innerWidth;
window.addEventListener('resize', onWidthChange);
// window.removeEventListener('resize', onWidthChange);

export const mq = computed(() => {
  if (wWidth.value < 701) return 'md';
  if (wWidth.value <= 1024) return 'iPad';
  return 'lg';
});

const width = computed(() => wWidth.value);

export const gameStatus = ref(false);
export const mobActive = ref(false);
export const count = ref(0);

let interval;
let callbackMethod;

export const time = reactive({
  minutes: 0,
  seconds: 0,
});
export const resetTime = () => {
  time.minutes = mainState.state.timeMinutes.value;
  time.seconds = mainState.state.timeSeconds.value;
};
export const pauseTimer = () => {
  clearInterval(interval);
  interval = undefined;
};

export function startTimer(callback) {
  if (!callbackMethod) {
    // кэшируем коллбэк для использования при его отсутствии в аргументе
    callbackMethod = callback || (() => console.log('null callback'));
  }

  interval = setInterval(() => {
    if (!time.minutes && !time.seconds) {
      clearInterval(interval);

      if (!count.value) {
        popMethods.setPopupName('OopsPopup');
      } else if (callback && typeof callback === 'function') {
        callback();
      } else {
        callbackMethod();
      }
    } else if (time.minutes && !time.seconds) {
      time.minutes -= 1;
      time.seconds = 59;
    } else {
      time.seconds -= 1;
    }
  }, 1000);
}
export const scrollLock = () => {
  document.body.style.position = 'fixed';
  document.body.style.overflow = 'hidden';
  document.body.style.touchAction = 'none';
  document.body.style.msTouchAction = 'none';
};
export const scrollUnlock = () => {
  document.body.style.position = 'relative';
  document.body.style.overflow = 'initial';
  document.body.style.touchAction = 'initial';
  document.body.style.msTouchAction = 'initial';
};

export function gameInit() {
  let game = null;
  const size = 4;
  let nextId = 1;

  function initGame() {
    game = Array(size*size).fill(null); // 4 x 4 grid, represented as an array
  }

  function updateDOM(before, after) {
    const newElements = getNewElementsDOM(before, after);
    const existingElements = getExistingElementsDOM(before, after);
    const mergedTiles = getMergedTiles(after);
    removeElements(mergedTiles);
    drawGame(newElements, true);
    drawGame(existingElements);
  }

  function removeElements(mergedTiles) {
    for (let tile of mergedTiles) {
      for (let id of tile.mergedIds) {
        const currentElm = document.getElementById(id);
        positionTile(tile, currentElm);
        currentElm.classList.add('tile--shrink');
        setTimeout(() => {
          currentElm.remove();
        }, 100);
      }
    }
  }

  function getMergedTiles(after) {
    return after.filter((tile) => tile && tile.mergedIds);
  }

  function getNewElementsDOM(before, after) {
    const beforeIds = before.filter((tile) => tile).map((tile) => tile.id);
    const newElements = after.filter((tile) => {
      return tile && beforeIds.indexOf(tile.id) === -1;
    });
    return newElements;
  }

  function getExistingElementsDOM(before, after) {
    const beforeIds = before.filter((tile) => tile).map((tile) => tile.id);
    const existingElements = after.filter((tile) => {
      return tile && beforeIds.indexOf(tile.id) !== -1;
    });
    return existingElements;
  }

  function drawBackground() {
    const tileContainer = document.getElementById('tile-container');
    tileContainer.innerHTML = '';
    for (let i = 0; i < game.length; i++) {
      const tile = game[i];
      const tileDiv = document.createElement('div');
      const x = i % size;
      const y = Math.floor(i / size);
      tileDiv.style.top = `${y*(mq.value === 'md' ? 75 : 100)}px`;
      tileDiv.style.left = `${x*(mq.value === 'md' ? 75 : 100)}px`;

      tileDiv.classList.add("background");
      tileContainer.appendChild(tileDiv);
    }
  }

  function positionTile(tile, elm) {
    const x = tile.index % size;
    const y = Math.floor(tile.index / size);
    elm.style.top = `${y*(mq.value === 'md' ? 75 : 100)}px`;
    elm.style.left = `${x*(mq.value === 'md' ? 75 : 100)}px`;
  }

  function drawGame(tiles, isNew) {
    const tileContainer = document.getElementById('tile-container');
    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];
      if (tile) {
        if (isNew) {
          const tileDiv = document.createElement('div');
          positionTile(tile, tileDiv);
          tileDiv.classList.add('tile', `tile--${tile.value}`);
          tileDiv.id = tile.id;
          setTimeout(() => {
            tileDiv.classList.add("tile--pop");
          }, tile.mergedIds ? 1 : (mq.value === 'md' ? 75 : 150));
          tileContainer.appendChild(tileDiv);

          if (tile.value == 64) {
            document.removeEventListener("keydown", handleKeypress);
            document.removeEventListener("touchstart", handleTouchStart);
            document.removeEventListener("touchmove", handleTouchMove);
            pauseTimer();
            setTimeout(() => {
              popMethods.setPopupName('EmailPopup');
              gameStatus.value = true;
            }, 2500);
          }
        } else {
          const currentElement = document.getElementById(tile.id);
          positionTile(tile, currentElement);
        }
      }
    }
  }

  function gameOver() {
    if (game.filter((number)=>number===null).length === 0) {
      const sameNeighbors = game.find((tile, i)=>{
        const isRightSame = game[i+1] && (i+1)%4 !== 0 ? tile.value === game[i+1].value : false;
        const isDownSame = game[i+4] ? tile.value === game[i+4].value : false;
        if (isRightSame || isDownSame) {
          return true;
        }
        return false;
      });
      return !sameNeighbors;
    }
  }

  function generateNewNumber() {
    // 0.9 probability of 2, 0.1 probability of 4
    const p = Math.random() * 100;
    return (p <= 90) ? 2 : 4;
  }

  function addRandomNumber() {
    // Adds either a 2 or a 4 to an empty position in the game array
    const emptyCells = game.map((_, index) => index)
      .filter((index) => game[index] === null);
    if (emptyCells.length === 0) { return; }
    const newPos = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newObj = {
      id: nextId++,
      index: newPos,
      value: generateNewNumber()
    };
    game.splice(newPos, 1, newObj);
  }

  function getIndexForPoint(x, y) {
    return y*size + x;
  }

  function reflectGrid(grid) {
    let reflectedGame = Array(size*size).fill(0);
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const index1 = getIndexForPoint(col, row);
        const index2 = getIndexForPoint(size-col-1, row);
        reflectedGame[index1] = grid[index2];
      }
    }
    return reflectedGame;
  }

  function rotateLeft90Deg(grid) {
    let rotatedGame = Array(size*size).fill(0);
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const index1 = getIndexForPoint(col, row);
        const index2 = getIndexForPoint(size-1-row, col);
        rotatedGame[index1] = grid[index2];
      }
    }
    return rotatedGame;
  }

  function rotateRight90Deg(grid) {
    let rotatedGame = Array(size*size).fill(0);
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const index1 = getIndexForPoint(col, row);
        const index2 = getIndexForPoint(row,size-1-col);
        rotatedGame[index1] = grid[index2];
      }
    }
    return rotatedGame;
  }

  /*
  For any cell whose neighbor to the right is empty, move that cell
  to the right. For any cell whose neighbor to the right is equal
  to the same value, combine the values together (e.g. 2+2 = 4)
  */
  function shiftGameRight(gameGrid) {
    // reflect game grid
    let reflectedGame = reflectGrid(gameGrid);
    // shift left
    reflectedGame = shiftGameLeft(reflectedGame);
    // reflect back
    return reflectGrid(reflectedGame);
  }

  function shiftGameLeft(gameGrid) {
    let newGameState = [];
    let totalAdd = 0;
    // for rows
    for (let i = 0; i < size; i++) {
      // for columns
      const firstPos = 4*i;
      const lastPos = (size)+4*i;
      const currentRow = gameGrid.slice(firstPos,lastPos);
      const filteredRow = currentRow.filter((row)=>row);
      for (let row of filteredRow) {
        delete row.mergedIds;
      }

      for (let j = 0; j < filteredRow.length - 1; j++) {
        if (filteredRow[j].value === filteredRow[j+1].value) {
          const sum = filteredRow[j].value * 2;
          filteredRow[j] = {
            id: nextId++,
            mergedIds: [filteredRow[j].id, filteredRow[j+1].id],
            value: sum
          };
          filteredRow.splice(j+1,1);
          totalAdd += sum;
        }
      }
      while(filteredRow.length < size) {
        filteredRow.push(null);
      }
      newGameState = [...newGameState, ...filteredRow];
    }
    return newGameState;
  }

  function shiftGameUp(gameGrid) {
    let rotatedGame = rotateLeft90Deg(gameGrid);
    rotatedGame = shiftGameLeft(rotatedGame);
    return rotateRight90Deg(rotatedGame);
  }

  function shiftGameDown(gameGrid) {
    let rotatedGame = rotateRight90Deg(gameGrid);
    rotatedGame = shiftGameLeft(rotatedGame);
    return rotateLeft90Deg(rotatedGame);
  }

  const buttons = document.querySelectorAll(".js-restart-btn");
  const length = buttons.length;
  for (let i = 0; i < length; i++) {
    if (document.addEventListener) {
      buttons[i].addEventListener("click", function() {
        newGameStart();
      });
    } else {
      buttons[i].attachEvent("onclick", function() {
        newGameStart();
      });
    };
  };

  function handleKeypress(event) {
    count.value += 1;
    const modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
    const whichKey= event.which;

    const prevGame = [...game];

    if (!modifiers) {
      event.preventDefault();
      event.stopPropagation();
      switch (whichKey) {
        case 37:
          game = shiftGameLeft(game);
          break;
        case 38:
          game = shiftGameUp(game);
          break;
        case 39:
          game = shiftGameRight(game);
          break;
        case 40:
          game = shiftGameDown(game);
          break;
      }

      game = game.map((tile, index) => {
        if (tile) {
          return {
            ...tile,
            index
          };
        } else {
          return null;
        }
      });
      if (_.isEqual(prevGame, game)) return event;
      addRandomNumber();
      updateDOM(prevGame, game);
    }
  }

  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
  };

  function handleTouchMove(evt) {
    evt.preventDefault();
    const prevGame = [...game];
    if ( !xDown || !yDown ) {
      return;
    }
    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if ( Math.abs(xDiff) > Math.abs(yDiff) ) {
      if ( xDiff > 0 ) {
        game = shiftGameLeft(game);
      } else {
        game = shiftGameRight(game);
      }
    } else {
      if ( yDiff > 0 ) {
        game = shiftGameUp(game);
      } else {
        game = shiftGameDown(game);
      }
    }
    game = game.map((tile, index) => {
      if (tile) {
        return {
          ...tile,
          index
        };
      } else {
        return null;
      }
    });
    if (_.isEqual(prevGame, game)) return;
    addRandomNumber();
    updateDOM(prevGame, game);
    xDown = null;
    yDown = null;
  }

  window.keypress = handleKeypress;
  window.touchStart = handleTouchStart;
  window.touchMove = handleTouchMove;

  // document.addEventListener("keydown", handleKeypress);
  // document.addEventListener('touchstart', handleTouchStart, false);
  // document.addEventListener('touchmove', handleTouchMove, false);

  let xDown = null;
  let yDown = null;

  function newGameStart() {
    document.getElementById('tile-container').innerHTML = '';
    initGame();
    drawBackground();
    const previousGame = [...game];
    addRandomNumber();
    addRandomNumber();
    updateDOM(previousGame, game);
  }

  newGameStart();
}

export const addListeners = () => {
  document.addEventListener("keydown", window.keypress);
  document.addEventListener('touchstart', window.touchStart, false);
  document.addEventListener('touchmove', window.touchMove, false);
}

export const removeListeners = () => {
  document.removeEventListener("keydown", window.keypress);
  document.removeEventListener('touchstart', window.touchStart, false);
  document.removeEventListener('touchmove', window.touchMove, false);
}
