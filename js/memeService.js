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
            txt: 'Enter Text 1',
            size: 20,
            color: 'black',
            offsetx: 150,
            offsety: 50,
            isActive: true,
        },
        {
            txt: 'Enter Text 2',
            size: 20,
            color: 'black',
            offsetx: 150,
            offsety: 250,
            isActive: false,
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
    return gMeme
}


function setLineTxt() {
    const editText = document.querySelector('.canvas-text').value
    console.log(editText);

    return editText
}
// function setLineTxt({txt}) {
//     document.querySelector('.canvas-text').value
//     console.log(txt);
//     // gMeme.lines[lineIdx].txt = document.querySelector('.canvas-text').value
//     // console.log(gMeme.lines[lineIdx].txt);
//     // console.log(gMeme);

    // return txt
// }


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


function createLines() {
    gMeme.push
}