export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getQuickSortAnimations(array) {
  const animations = [];
  let start = 0;
  let end = array.length - 1;
  quickSortFirst(array, start, end, animations);
  return animations;
}

function quickSortFirst(array, start, end, animations) {
  if (start >= end) {
    return;
  }
  let pivotIdx = partition(array, start, end, animations);
  quickSortFirst(array, start, pivotIdx - 1, animations);
  quickSortFirst(array, pivotIdx + 1, end, animations);
}

function partition(array, start, end, animations) {
  let pivotValue = array[start];
  let lower = start + 1;
  let run = true;
  while (run) {
    while (array[lower] <= pivotValue && lower <= end) {
      animations.push([start, lower]);
      animations.push([start, lower]);
      animations.push([0, array[0]]);
      animations.push([0, array[0]]);
      lower += 1;
    }
    while (array[end] >= pivotValue && lower <= end) {
      animations.push([start, end]);
      animations.push([start, end]);
      animations.push([0, array[0]]);
      animations.push([0, array[0]]);
      end -= 1;
    }
    if (end < lower) {
      run = false;
    } else {
      animations.push([lower, end]);
      animations.push([lower, end]);
      animations.push([lower, array[end]]);
      animations.push([end, array[lower]]);
      let temp = array[lower];
      array[lower] = array[end];
      array[end] = temp;
    }
  }
  animations.push([start, end]);
  animations.push([start, end]);
  animations.push([start, array[end]]);
  animations.push([end, pivotValue]);
  let temp = array[end];
  array[end] = pivotValue;
  array[start] = temp;
  return end;
}

export function getBubbleSortAnimations(array) {
  const animations = [];
  bubbleSort(array, animations);
  return animations;
}

function bubbleSort(array, animations) {
  let end = array.length - 1;
  while (end >= 1) {
    for (let j = 0; j < end; j++) {
      if (array[j] > array[j + 1]) {
        animations.push([j, j + 1]);
        animations.push([j, j + 1]);
        animations.push([j, array[j + 1]]);
        animations.push([j + 1, array[j]]);
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
    end--;
  }
}
