'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const EMPTY = ' '
const superFood='&#9752;'
var cherry='&#127826; &#x1F352;'


const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gcount
var emptys=[]
var intervalCherry
intervalCherry=setInterval(addCherry,15000)

function init() {
    console.log('hello')

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([]) // board[i] = []

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
            if(i===1&& j===1||i===1&&j===8||i===8&&j===1||i===8&&j===8){
                board[i][j]=superFood
            }
            // if( board[i][j]===EMPTY) { emptys.push(board[i][j])}
            // randCherry(emptys)

        }
    }
    return board
}

function updateScore(diff) {
    const elScore = document.querySelector('h2 span')

    // Model
    gGame.score += diff
    // DOM
    elScore.innerText = gGame.score
}
function countFood(){
var count=0
const size=10
    for (var i = 0; i < size; i++){
        for (var j= 0; j < size; j++){
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
               ( j === 3 && i > 4 && i < size - 2)){
                continue
               }
               else{ count++ }
        }
    }
    return count-1 //המינוס אחד זה הפקמן עצמו 
}
function gameOver() {
    console.log('Game Over')
    gGame.isOn = false


}
function restartGame1(){ 
    
    const elFinish=document.querySelector('.finish')
        elFinish.style.display='none'
        init()
    
}
function restartGame2(){
    const elwin=document.querySelector('.win')
            elwin.style.display='none'
            init()
}
function getEmptyPos() {
    var emptyPositions = []

    for(var i = 1; i < gBoard.length - 1; i++){
        for(var j = 1; j < gBoard[i].length - 1; j++){
            var currCell = gBoard[i][j]
            if(currCell===EMPTY) emptyPositions.push({ i, j })

        }
    }
    const idx = getRandomInt(0, emptyPositions.length)
    return emptyPositions[idx]
}
function addCherry(){
const pos=getEmptyPos()
if(!pos) return
gBoard[pos.i][pos.j]=cherry //model
renderCell(pos,cherry)
}
// function randCherry(arr){
//     for(var i=0; i<arr.length;i++){
//         intervalCherry=setInterval(arr[i]=cherry,15)
//     }
// }
