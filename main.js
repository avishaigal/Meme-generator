'use strict'

var gElCanvas
var gCtx
var gMeme

// memeController

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
}

function renderMeme() {
    const elImg = document.querySelector('img')
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)


    // textbox
    const elTextInput = document.querySelector('.canvas-text')
    const text = elTextInput.value || 'Text Box'

    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, 150, 50)
    gCtx.strokeText(text, 150, 50)
}


// memeService

