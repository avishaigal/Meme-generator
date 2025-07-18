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
    gMeme.lines[gMeme.selectedLineIdx].color = color
    renderText(gMeme.lines[gMeme.selectedLineIdx])
}


function changeTextSize(sign) {
    var textSize = gMeme.lines[gMeme.selectedLineIdx].size

    sign === '+' ? textSize++ : textSize--
    gMeme.lines[gMeme.selectedLineIdx].size = textSize
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
    gTextOffset = gTextOffset + 15
}


function switchLine() {
    var elInput = document.querySelector('.canvas-text')

    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++

    
    elInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
}


function setLineSize() {

    gMeme.lines.forEach(idx => {
        let textBox = gCtx.measureText(idx);
        let { width, fontBoundingBoxAscent } = textBox

        let currLine = gMeme.lines[gMeme.selectedLineIdx]
        let { offsetx, offsety } = currLine

        var padding = 5
        // idx.size = {
        //     rectXStart: (offsetx - (width / 2) - padding),
        //     rectYStart: offsety - fontBoundingBoxAscent * 1.5,
        //     rectXEnd: width + padding,
        //     rectYEnd: fontBoundingBoxAscent + (padding * 5),
        // }
        
        
        idx.rectXStart = (offsetx - (width / 2) - padding)
        idx.rectYStart = offsety - fontBoundingBoxAscent * 1.5
        idx.rectXEnd = width + padding
        idx.rectYEnd = fontBoundingBoxAscent + (padding * 5)
    })
    renderTextBoxRect()
    // console.log(gMeme);
}


