module.exports = function solveSudoku(matrix) {

  function isAppropriative(matrix, i, j, num) {

    function checkRow(matrix, i, num) {
      return matrix[i].indexOf(num) === -1
    }

    function checkColumn(matrix, j, num) {
      for (let i = 0; i < 9; i += 1) {
        if (matrix[i][j] === num) {
          return false;
        }
      }
      return true;
    }

    function checkBox(matrix, startI, startJ, num) {
      startI = Math.floor(startI / 3) * 3;
      startJ = Math.floor(startJ / 3) * 3;

      for (let i = 0; i < 3; i += 1) {
        for (let j = 0; j < 3; j += 1) {
          if (matrix[startI + i][startJ + j] === num) {
            return false;
          }
        }
      }
      return true;
    }

    return checkRow(matrix, i, num) && checkColumn(matrix, j, num) && checkBox(matrix, i, j, num);
  }

  function solve(matrix, zeroPos) {

    if (zeroPos.length === 0) {
      return matrix
    }

    const i = zeroPos[0][0];
    const j = zeroPos[0][1];

    for (let num = 1; num < 10; num += 1) {
      if (isAppropriative(matrix, i, j, num)) {
        let newMatrix = matrix.map(el => [...el]);
        newMatrix[i][j] = num;

        let result = solve(newMatrix, zeroPos.slice(1));
        if (result !== false) {
          return result
        }
      }
    }

    return false;
  }

  const zeroPos = [];
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      if (matrix[i][j] === 0) {
        zeroPos.push([i, j])
      }
    }
  }

  return solve(matrix, zeroPos);
}