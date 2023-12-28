'use strict'

const PACMAN = '🙃'
var gPacman

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: { i: 3, j: 5 },
        isSuper: false,
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return

    // TODO: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL) return
    //TODO: if superFood Same color for ghosts 
    if (nextCell === superFood) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true

        setTimeout(() => {
            gPacman.isSuper = false
            for (var i = 0; i < dieghostes.length; i++) {
                gGhosts.push(dieghostes[i])
            }
            console.log(gGhosts)
            console.log(dieghostes)
        }, 5000)
    }

    // TODO: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            for (var i = 0; i < gGhosts.length; i++) {
                // if(cuurGhost.location===nextLocation){
                  console.log  (gGhosts[i])
                if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
                    dieghostes.push(gGhosts[i])
                    gGhosts.splice(i, 1)
                    console.log(gGhosts)
                    console.log(dieghostes)
                }
            }
        }
        else {
            gameOver()
            const elFinish = document.querySelector('.finish')
            elFinish.style.display = 'block'
            return
        }
    }
    // TODO: hitting food? call updateScore
    if (nextCell === FOOD) {
        updateScore(1)
        gcount = gGame.score
        if (gcount === countFood()) {
            const elwin = document.querySelector('.win')
            elwin.style.display = 'block'
        }
    }
    if (nextCell === cherry) {
        updateScore(10)
    }


    // TODO: moving from current location:
    // TODO: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // TODO: update the DOM
    renderCell(gPacman.location, EMPTY)

    // TODO: Move the pacman to new location:
    // TODO: update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // TODO: update the DOM
    renderCell(nextLocation, PACMAN)
}

function getNextLocation(eventKeyboard) {
    const nextLocation = { i: gPacman.location.i, j: gPacman.location.j }
    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            const elpacman1=document.querySelector(`.cell-${nextLocation.i}-${nextLocation.j}`)
            elpacman1.style.rotate='0deg'
            console.log(elpacman1);
            break;

        case 'ArrowDown':
            nextLocation.i++
            const elpacman2=document.querySelector(`.cell-${nextLocation.i}-${nextLocation.j}`)
            elpacman2.style.rotate='180deg'
            break;

        case 'ArrowLeft':
            nextLocation.j--
            const elpacman3=document.querySelector(`.cell-${nextLocation.i}-${nextLocation.j}`)
            elpacman3.style.rotate='270deg'
            break;

        case 'ArrowRight':
            nextLocation.j++
            const elpacman4=document.querySelector(`.cell-${nextLocation.i}-${nextLocation.j}`)
            elpacman4.style.rotate='90deg'
            break;

        default: return null
    }
    return nextLocation
}