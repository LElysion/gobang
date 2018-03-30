
export default {
  getVersion (state, date) {
    console.log(state.version)
    state.output = '当前版本为: ' + state.version
  },
  setPiece (state, data) {
    if (!state.isStart) { return false }
    // console.log(state, data)
    let nowStatus = state.pieces.slice()
    state.record.list.push(JSON.parse(JSON.stringify(nowStatus))) // 放入历史记录中
    var _pieces = state.pieces
    if (state.pieces[data.x][data.y] !== 0) {
      return false
    }

    if (state.now === 1) {
      state.now = 2
      _pieces[data.x][data.y] = 1
    } else {
      state.now = 1
      _pieces[data.x][data.y] = 2
    }
    state.pieces = _pieces
    nowStatus = state.pieces.slice()
    state.record.now_status = (JSON.parse(JSON.stringify(nowStatus))) // 放入历史记录中
    state.pieces.push([0])
    state.pieces.pop()
    let pieces = state.pieces
    let x = data.x
    let y = data.y
    let piecesArr = [
      [], [], [], []
    ]
    let isBreak = false

    function isEqual (d1, d2, d3, d4, d5) {
      let count = (d1 + d2 + d3 + d4 + d5) / 5
      if (d1 === 0 || d2 === 0 || d3 === 0 || d4 === 0 || d5 === 0) {
        return false
      }
      return count === d1 && count === d2 && count === d3 && count === d4 && count === d5
    }

    // 获取以落点为起点的四条数组
    for (let i = -4; i < 5; i++) {
      if (x + i < 15 && x + i > -1) {
        piecesArr[0].push(pieces[x + i][y])
      }
    }
    for (let i = -4; i < 5; i++) {
      if (x + i < 15 && x + i > -1) {
        piecesArr[1].push(pieces[x][y + i])
      }
    }
    for (let i = -4; i < 5; i++) {
      if (x + i < 15 && x + i > -1) {
        piecesArr[2].push(pieces[x + i][y + i])
      }
    }
    for (let i = -4; i < 5; i++) {
      if (x - i < 15 && x - i > -1 && y + i < 15 && y + i > -1) {
        piecesArr[3].push(pieces[x - i][y + i])
      }
    }
    for (let i = 0; i < piecesArr.length; i++) {
      let len = piecesArr[i].length
      let nowArr = piecesArr[i]
      for (let j = 0; j < len; j++) {
        if (isEqual(nowArr[j], nowArr[j + 1], nowArr[j + 2], nowArr[j + 3], nowArr[j + 4])) {
          isBreak = true
          break
        }
      }
      if (isBreak) {
        break
      }
    }

    if (isBreak) {
      state.output = state.now === 1 ? '黑方胜利' : '白方胜利'
      state.isStart = false
    }
  },
  backMove (state) {
    // 悔棋
    let len = state.record.list.length
    if (len > 0) {
      state.pieces = state.record.list[len - 1].slice()
      state.record.list.pop()
      state.record.now_status = state.pieces
      state.pieces.push([0])
      state.pieces.pop()
      if (state.now === 2) {
        state.now = 1
      } else {
        state.now = 2
      }
    }
  },
  start (state) {
    state.pieces = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    state.record.list = []
    state.now = 2
    state.isStart = !state.isStart
    state.output = '游戏开始'
  },
  reStart (state) {
    state.pieces = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    state.record.list = []
    state.now = 2
    console.log(state)
  },
  playAgain (state) {
    state.isStart = false
    let i = 0
    let record = state.record.list
    console.log(record)
    let len = record.length
    let timer = setInterval(function () {
      if (i < len) {
        state.output = '回放中, 当前第' + i + '步'
        state.pieces = record[i]
        i++
      } else {
        state.output = '回放结束, 当前第' + i + '步'
        state.pieces = state.record.now_status
        clearInterval(timer)
      }
    }, 1000)
  }
}
