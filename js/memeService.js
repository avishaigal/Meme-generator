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
            id: 1,
            txt: 'Enter Text 1',
            size: 20,
            color: 'black',
            offsetx: 150,
            offsety: 50,
        },
        {
            id: 2,
            txt: 'Enter Text 2',
            size: 20,
            color: 'black',
            offsetx: 150,
            offsety: 250,
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gTextOffset = 20
var gTextInput = gMeme.lines[0].txt


function getMeme() {
    return gMeme
}


function setLineTxt() {
    var elInput = document.querySelector('.canvas-text')

    gMeme.lines[gMeme.selectedLineIdx].txt = elInput.value
    gTextInput = gMeme.lines[gMeme.selectedLineIdx].txt
}


function setImg(imgIdx) {
    gMeme.selectedImgId = imgIdx - 1
}


function setColor(color) {
    gMeme.lines[0].color = color
    renderText(gMeme.lines[0])
}


function changeTextSize(sign) {
    var textSize = gMeme.lines[0].size

    sign === '+' ? textSize++ : textSize--
    gMeme.lines[0].size = textSize
    renderText(gMeme.lines[0])
    return textSize
}


function addLine() {
    const linesCount = gMeme.lines.length + 1
    const linesId = gMeme.lines.length + 1

    var textOffset = gTextOffset

    const newLine = {
        id: linesId,
        txt: `Enter Text ${linesCount}`,
        size: 20,
        color: 'black',
        offsetx: (130 + textOffset),
        offsety: (130 + textOffset),
    }
    gMeme.lines.push(newLine)
    console.log(gMeme.lines);
    gTextOffset = gTextOffset + 15
}


function switchLine() {
    var elInput = document.querySelector('.canvas-text')

    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++

    elInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
}


function renderTextBoxRect() {
    let textBox = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt);
    let { width, fontBoundingBoxAscent } = textBox

    let currLine = gMeme.lines[gMeme.selectedLineIdx]
    let { offsetx, offsety } = currLine

    var padding = 10
    var rectXStart = offsetx - width / 1.7
    // var rectXStart = offsetx - width
    var rectYStart = offsety - (fontBoundingBoxAscent * 1.5)
    var rectXEnd = width + (padding * 2)
    var rectYEnd = fontBoundingBoxAscent + (padding * 2.5)

    console.log('x start end ', rectXStart, rectXEnd);
    console.log('y start end ', rectYStart, rectYEnd);
    gCtx.strokeRect(rectXStart, rectYStart, rectXEnd, rectYEnd)
}