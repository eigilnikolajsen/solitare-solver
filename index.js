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
    '- - - @ @ @ - - -',
    '- - - @ @ @ - - -',
    '- - - @ @ @ - - -',
    'O O O @ @ @ O O O',
    'O O O @ O @ O O O',
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

let gamesNumber = 10000
let gamesPlayed = 0

let possibleMoves = []
let path = []

let fewestPins = 100
let bestGame = []

let posStr = position.join(' ').split(' ').join('')
let winStr = winningPosition.join(' ').split(' ').join('')

let rows = position.length
let cols = posStr.length / rows


const fromPosArr = (arr) => {
    let pos = []
    for (let i = 0; i < arr.length; i++) {
        pos[i] = arr[i].join(' ')
    }
    return pos
}

const game = () => {

    posStr = position.join(' ').split(' ').join('')
    winStr = winningPosition.join(' ').split(' ').join('')


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

        // make the move
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
        //console.log(path + '')
    }
}

const findMoves = () => {

    // reset possible moves array
    possibleMoves = []

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            if (posStr[i * cols + j] == '-') continue

            // check for moves going right
            if (j < cols - 2) {
                if (posStr[i * cols + j] == '@' && posStr[i * cols + j + 1] == '@' && posStr[i * cols + j + 2] == 'O') {
                    possibleMoves.push(`r${i}${j}`)
                }
            }

            // check for moves going left
            if (j > 2) {
                if (posStr[i * cols + j] == '@' && posStr[i * cols + j - 1] == '@' && posStr[i * cols + j - 2] == 'O') {
                    possibleMoves.push(`l${i}${j}`)
                }
            }

            // check for moves going down
            if (i < rows - 2) {
                if (posStr[i * cols + j] == '@' && posStr[(i + 1) * cols + j] == '@' && posStr[(i + 2) * cols + j] == 'O') {
                    possibleMoves.push(`d${i}${j}`)
                }
            }

            // check for moves going up
            if (i > 2) {
                if (posStr[i * cols + j] == '@' && posStr[(i - 1) * cols + j] == '@' && posStr[(i - 2) * cols + j] == 'O') {
                    possibleMoves.push(`u${i}${j}`)
                }
            }
        }
    }
}

const makeMove = (str) => {

    // direction, x-value, y-value
    let d = str[0]
    let i = +str[1]
    let j = +str[2]

    let arr = posStr.split('')

    switch (d) {
        case 'r':
            arr[i * cols + j] = 'O'
            arr[i * cols + j + 1] = 'O'
            arr[i * cols + j + 2] = '@'
            break
        case 'l':
            arr[i * cols + j] = 'O'
            arr[i * cols + j - 1] = 'O'
            arr[i * cols + j - 2] = '@'
            break
        case 'd':
            arr[i * cols + j] = 'O'
            arr[(i + 1) * cols + j] = 'O'
            arr[(i + 2) * cols + j] = '@'
            break
        case 'u':
            arr[i * cols + j] = 'O'
            arr[(i - 1) * cols + j] = 'O'
            arr[(i - 2) * cols + j] = '@'
            break
    }

    posStr = arr.join('')
}

const checkForWin = () => {

    let pinsLeft = 0
    for (let i = 0; i < posStr.length; i++) {
        if (posStr[i] == '@') pinsLeft++
    }
    if (fewestPins > pinsLeft) {
        fewestPins = pinsLeft
        console.log(`Best game so far - ${fewestPins} pins left:\n\n${printMatrix()}`)
    }

    if (posStr == winStr) {
        console.log(printMatrix())
        console.log('YOU WIN!')
        console.log(`Game #${gamesPlayed + 1}`)
        gamesPlayed = gamesNumber
    } else {
        //console.log('another loss')
        console.log(path)
    }
}

const printMatrix = () => {
    let arr = posStr.split('')
    for (let i = 0; i < arr.length; i++) {
        if (i % (rows + 1) == rows - 1) arr.splice(i + 1, 0, '\n')
    }
    arr.unshift('')
    let str = arr.join(' ')
    return str
}

game()