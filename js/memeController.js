'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    document.querySelector('.canvas-text').value = gMeme.lines[0].txt
    renderMeme()
}


function renderMeme() {
    const elMeme = getMeme()
    const { selectedImgId } = elMeme

    var elImg = new Image()
    elImg.src = gImgs[selectedImgId].url

    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        renderText()
    }
}


function renderText() {
    setLineTxt()


    gMeme.lines.forEach(idx => {
        const { id, txt, size, color, offsetx, offsety } = idx

        gCtx.lineWidth = 1
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = color
        gCtx.font = size + 'px fantasy'
        gCtx.textAlign = 'center'
        gCtx.textBaseline = 'middle'
        gCtx.fillText(txt, offsetx, offsety)
        gCtx.strokeText(txt, offsetx, offsety)

        if (id === gMeme.selectedLine) gCtx.strokeRect(offsetx - padding, offsety - padding, 120, 120)

    })
}


function onShowGallery() {
    document.querySelector('.gallery').classList.remove('hide')
    document.querySelector('.canvas-container').classList.add('hide')
}


function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}


function onSetColor(color) {
    setColor(color)
    renderMeme()
}


function onChangeTextSize(sign) {
    gCtx.font = changeTextSize(sign)
    renderMeme()
}


function onAddLine() {
    addLine()
    renderMeme()
}


function onSwitchLine() {
    switchLine()
    renderMeme()
}