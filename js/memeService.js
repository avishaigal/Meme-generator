'use strict'

var gImgs = [
    { id: 1, url: 'img/5.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/15.jpg', keywords: ['funny', 'cat'] },
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function setLineTxt() {
    gMeme.txt = document.querySelector('.canvas-text').value
    return gMeme.txt
}

function setImg(imgIdx) {
    gMeme.selectedImgId = imgIdx - 1
}