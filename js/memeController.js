'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
}


function renderMeme() {
    const elMeme = getMeme()
    const { selectedImgId, selectedLineIdx, lines } = elMeme

    var elImg = new Image()
    elImg.src = gImgs[selectedImgId].url

    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        renderText(lines[selectedLineIdx])
    }
}


function renderText({ color, size, txt }, lineIdx) {
    const text = setLineTxt()

    gCtx.lineWidth = 1
    gCtx.strokeStyle = color
    gCtx.fillStyle = color
    gCtx.font = size
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, 150, 50)
    gCtx.strokeText(text, 150, 50)
}


function onShowGallery() {
     document.querySelector('.gallery').classList.remove('hide')
    document.querySelector('.canvas-container').classList.add('hide')
}