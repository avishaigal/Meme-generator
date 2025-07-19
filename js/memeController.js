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
        const { txt, size, color, offsetx, offsety, font } = idx

        gCtx.lineWidth = 1
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = color
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
    console.log(rectXStart, rectYStart, rectXEnd, rectYEnd);

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


function onChangeFontDirection(value) {
    // const currLine = gMeme.lines[gSelectedLine]

    // if (value === 'center') {
    //     currLine.textDir = 'center'
    // } else if (value === 'right') {
    //     currLine.textDir = 'right'
    // } else {
    //     currLine.textDir = 'left'
    // }
    // renderMeme()
}