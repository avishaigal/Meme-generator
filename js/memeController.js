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
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        renderText()
        drawTextBoxRect()
    }
    onShowMeme()
}


function renderText() {
    setLineTxt()

    gMeme.lines.forEach(idx => {
        const { txt, size, color, stroke, offsetx, offsety, font } = idx

        gCtx.lineWidth = 1
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = color
        gCtx.strokeStyle = stroke
        !font ? gCtx.font = `${size}px arial` : gCtx.font = `${size}px ${font}`
        gCtx.textBaseline = 'top'
        gCtx.fillText(txt, offsetx, offsety)
        gCtx.strokeText(txt, offsetx, offsety)
        getLineSize(idx)
    })
}


function onShowGallery() {
    document.querySelector('.editor').classList.add('hide')
    document.querySelector('.gallery-container').classList.remove('hide')
}


function onShowMeme() {
    document.querySelector('.editor').classList.remove('hide')
    document.querySelector('.gallery-container').classList.add('hide')
}


function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}


function onSetColor(color) {
    setColor(color)
    renderMeme()
}


function onSetStroke(color) {
    setStroke(color)
    renderMeme()
}


function onChangeTextSize(sign) {
    changeTextSize(sign)
    renderMeme()
}


function onAddLine() {
    addLine()
    switchLine()
    renderMeme()
}


function onSwitchLine() {
    switchLine()
    renderMeme()
}


function drawTextBoxRect() {
    if (gMeme.lines.length === 0) return
    const currLine = gMeme.lines[gSelectedLine]
    const { rectXStart, rectYStart, rectXEnd, rectYEnd } = currLine

    gCtx.strokeRect(rectXStart, rectYStart, rectXEnd, rectYEnd)
}


function onDeleteLine() {
    deleteLine()
    renderMeme()
}


function onChangeFont(value) {
    const currLine = gMeme.lines[gSelectedLine]
    currLine.font = value
    renderMeme()
}


function onClickElement(ev) {
    const elInput = document.querySelector('.canvas-text')
    const { offsetX, offsetY } = ev

    gMeme.lines.find(idx => {

        if (offsetX >= idx.offsetx - gLinePadding && offsetX <= idx.offsetx + idx.rectXEnd
            && offsetY >= idx.offsety - gLinePadding && offsetY <= idx.offsety + idx.rectYEnd - gLinePadding) {

            gSelectedLine = gMeme.lines.indexOf(idx)
            elInput.value = gMeme.lines[gSelectedLine].txt
            renderMeme()
        }
    })
}


function onMoveElement(direction) {
    moveElement(direction)
    renderMeme()
}