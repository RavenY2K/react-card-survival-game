export let knightPosition = [0, 0]
let observer = null

function emitChange() {
  observer(knightPosition)
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.')
  }

  observer = o
  emitChange()
}

export function canMoveKnight(toX, toY) {
  const [x, y] = knightPosition;
  const dx = Math.abs(toX - x);
  const dy = Math.abs(toY - y);
  return (dy === 1 && dx === 2) || (dy === 2 && dx === 1);
}


export function moveKnight(toX, toY) {
  console.log('drop');
  knightPosition = [toX, toY]
  emitChange()
}

const randPos = () => Math.floor(Math.random() * 8)

// setInterval(() => {
//     moveKnight(randPos(),randPos())
// }, 500);