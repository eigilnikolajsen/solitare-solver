let position = [
    '- - - @ @ @ - - -',
    '- - - @ @ @ - - -',
    '- - - @ @ @ - - -',
    '@ @ @ @ @ @ @ @ @',
    '@ @ @ @ O @ @ @ @',
    '@ @ @ @ @ @ @ @ @',
    '- - - @ @ @ - - -',
    '- - - @ @ @ - - -',
    '- - - @ @ @ - - -',
]

position = [
    '- - - O O O - - -',
    '- - - O O O - - -',
    '- - - @ @ O - - -',
    'O O O @ @ O O O O',
    'O O O @ O O O O O',
    'O O O O O O O O O',
    '- - - O O O - - -',
    '- - - O O O - - -',
    '- - - O O O - - -',
]

let winningPosition = [
    '- - - O O O - - -',
    '- - - O O O - - -',
    '- - - O O O - - -',
    'O O O O O O O O O',
    'O O O O @ O O O O',
    'O O O O O O O O O',
    '- - - O O O - - -',
    '- - - O O O - - -',
    '- - - O O O - - -',
]

let gamesNumber = 1000
let gamesPlayed = 0
let possibleMoves = []
let posArr = []
let fewestPins = 100
let bestGame = []
let path = []

const toPosArr = (pos) => {
    for (let i = 0; i < pos.length; i++) {
        posArr[i] = pos[i].split(' ')
    }
}
const fromPosArr = (arr) => {
    let pos = []
    for (let i = 0; i < arr.length; i++) {
        pos[i] = arr[i].join(' ')
    }
    return pos
}

const findMoves = () => {

    // reset possible moves array
    possibleMoves = []

    for (let i = 0; i < posArr.length; i++) {
        for (let j = 0; j < posArr[i].length; j++) {

            if (posArr[i][j] == '-') continue

            // check for moves going right
            if (j < posArr[i].length - 2) {
                if (posArr[i][j] == '@' && posArr[i][j + 1] == '@' && posArr[i][j + 2] == 'O') {
                    possibleMoves.push(['r', i, j])
                }
            }

            // check for moves going left
            if (j > 2) {
                if (posArr[i][j] == '@' && posArr[i][j - 1] == '@' && posArr[i][j - 2] == 'O') {
                    possibleMoves.push(['l', i, j])
                }
            }

            // check for moves going down
            if (i < posArr.length - 2) {
                if (posArr[i][j] == '@' && posArr[i + 1][j] == '@' && posArr[i + 2][j] == 'O') {
                    possibleMoves.push(['d', i, j])
                }
            }

            // check for moves going up
            if (i > 2) {
                if (posArr[i][j] == '@' && posArr[i - 1][j] == '@' && posArr[i - 2][j] == 'O') {
                    possibleMoves.push(['u', i, j])
                }
            }
        }
    }
}

const makeMove = (arr) => {

    // direction, x-value, y-value
    let d = arr[0]
    let x = arr[1]
    let y = arr[2]

    switch (d) {
        case 'r':
            posArr[x][y] = 'O'
            posArr[x][y + 1] = 'O'
            posArr[x][y + 2] = '@'
            break
        case 'l':
            posArr[x][y] = 'O'
            posArr[x][y - 1] = 'O'
            posArr[x][y - 2] = '@'
            break
        case 'd':
            posArr[x][y] = 'O'
            posArr[x + 1][y] = 'O'
            posArr[x + 2][y] = '@'
            break
        case 'u':
            posArr[x][y] = 'O'
            posArr[x - 1][y] = 'O'
            posArr[x - 2][y] = '@'
            break
    }
}

const game = () => {

    toPosArr(position)
    findMoves()

    for (let i = 0; i < path.length; i++) {

        // find the possible moves
        findMoves()

        // make the move
        makeMove(possibleMoves[path[i]])
    }

    // while there are possible moves
    while (possibleMoves.length > 0) {

        // find the possible moves
        findMoves()

        // if none, break while loop
        if (possibleMoves.length == 0) break


        path.push(possibleMoves.length - 1)
        makeMove(possibleMoves[possibleMoves.length - 1])

    }

    // try a new combination
    while (path[path.length - 1] == 0) path.pop()
    path[path.length - 1] -= 1

    // when no more moves, check if you won
    checkForWin()

    gamesPlayed++

    // keep playing games until you reach the desired number of games (gamesNumber)
    if (gamesPlayed < gamesNumber) {
        setTimeout(game, 1)
    } else {
        console.log(path + '')
    }
}

const checkForWin = () => {

    let posStr = posArr.join(',').split(',').join('')
    let winStr = winningPosition.join(' ').split(' ').join('')
    let posStrLeft = posArr.join(',').split(',')
    let pinsLeft = 0
    for (let i = 0; i < posStrLeft.length; i++) {
        if (posStrLeft[i] == '@') pinsLeft++
    }
    if (fewestPins > pinsLeft) {
        fewestPins = pinsLeft
        bestGame = fromPosArr(posArr)
        console.log(printMatrix())
    }

    //console.log(printMatrix())
    //console.log(`Game #${gamesPlayed + 1}`)

    if (posStr == winStr) {
        gamesPlayed = gamesNumber
        console.log(printMatrix())
        console.log('YOU WIN!')
        console.log('Path: ' + path)
        console.log(`Game #${gamesPlayed + 1}`)
    } else {
        console.log('another loss')
            //console.log(path + '')
            //console.log(printMatrix())
    }
}

const printMatrix = () => {
    let str = ''
    for (let i = 0; i < posArr.length; i++) {
        str += posArr[i].join(' ')
        str += '\n'
    }
    return str
}

game()