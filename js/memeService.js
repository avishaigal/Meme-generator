'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'cat'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'cat'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny', 'cat'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'cat'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'cat'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny', 'cat'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'cat'] },
]

var gMeme = {
    selectedImgId: 1,
    lines: [
        {
            id: 1,
            txt: 'Enter Text 1',
            size: 20,
            color: 'black',
            offsetx: 100,
            offsety: 50,
        },
    ]
}

var gSelectedLine = 0
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

const gLinePadding = 5
var gTextOffset = 20
var gTextInput = gMeme.lines[0].txt

function getMeme() {
    return gMeme
}


function setLineTxt() {
    var elInput = document.querySelector('.canvas-text')
    if (gMeme.lines.length === 0) elInput.value = ''
    else {
        // gTextInput = gMeme.lines[gSelectedLine].txt
        gMeme.lines[gSelectedLine].txt = elInput.value
    }
}


function setImg(imgIdx) {
    gMeme.selectedImgId = imgIdx - 1
}


function setColor(color) {
    gMeme.lines[gSelectedLine].color = color
    renderText(gMeme.lines[gSelectedLine])
}


function changeTextSize(sign) {
    var textSize = gMeme.lines[gSelectedLine].size

    sign === '+' ? textSize++ : textSize--
    gMeme.lines[gSelectedLine].size = textSize
}


function addLine() {
    const lineId = gMeme.lines.length + 1
    const textOffset = gTextOffset

    const newLine = {
        id: lineId,
        txt: `Enter Text ${lineId}`,
        size: 20,
        color: 'black',
        offsetx: 100,
        offsety: (50 + textOffset),
    }
    if (gMeme.lines.length === 0) newLine.offsety = 50

    gMeme.lines.push(newLine)
    gTextOffset = gTextOffset + 15
}


function switchLine() {
    const elInput = document.querySelector('.canvas-text')

    if (gSelectedLine >= gMeme.lines.length - 1) gSelectedLine = 0
    else gSelectedLine++

    elInput.value = gMeme.lines[gSelectedLine].txt
}


function getLineSize(lineObj) {
    let currLine = lineObj
    let { offsetx, offsety } = currLine

    let textBox = gCtx.measureText(currLine.txt)
    let { width, fontBoundingBoxDescent } = textBox

    const padding = gLinePadding

    currLine.rectXStart = offsetx - padding
    currLine.rectYStart = offsety - padding
    currLine.rectXEnd = width + padding * 2
    currLine.rectYEnd = fontBoundingBoxDescent + padding * 2
}


function deleteLine() {
    var elInput = document.querySelector('.canvas-text')
    if (gMeme.lines.length === 0) {
        gTextOffset = 0
        return
    }
    gMeme.lines.splice(gSelectedLine, 1)
    
    if (gSelectedLine > 0) {
        elInput.value = gMeme.lines[(gSelectedLine -1)].txt
        gSelectedLine--
    } else {
        gSelectedLine = 0
        gTextInput = ''
    }
}
