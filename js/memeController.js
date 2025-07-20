'use strict'

var gElCanvas
var gCtx
var gPrevPos

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    document.querySelector('.canvas-text').value = gMeme.lines[0].txt
    onShowGallery()
    renderMeme()
}


function renderMeme() {
    const elMeme = getMeme()
    const { selectedImgId } = elMeme

    var elImg = new Image()
    elImg.src = gImgs[selectedImgId].url

    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    
    renderText()
    drawTextBoxRect()
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


function onSetFontSize(sign) {
    setFontSize(sign)
    renderMeme()
}


function onSetFontFamily(font) {
    setFontFamily(font)
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


function onClickElement(ev) {
    const elInput = document.querySelector('.canvas-text')
    const { offsetX, offsetY } = ev

    gMeme.lines.find(idx => {

        if (offsetX >= idx.offsetx - gLinePadding && offsetX <= idx.offsetx + idx.rectXEnd
            && offsetY >= idx.offsety - gLinePadding && offsetY <= idx.offsety + idx.rectYEnd - gLinePadding) {

            gSelectedLine = gMeme.lines.indexOf(idx)
            elInput.value = gMeme.lines[gSelectedLine].txt
        }
    })
    return gMeme.lines[gSelectedLine]
}


function onMoveElement(direction) {
    moveElementUpDown(direction)
    renderMeme()
}


function onDown(ev) {
    const pos = getEvPos(ev)

    if (!onClickElement(ev)) return
    setElementDrag(true)

    gPrevPos = pos
    document.body.style.cursor = 'grabbing'
}


function onMove(ev) {
    const { isDrag } = onClickElement(ev)
    if (!isDrag) return
    

    const pos = getEvPos(ev)

    const dx = pos.x - gPrevPos.x
    const dy = pos.y - gPrevPos.y
    moveElement(dx, dy)

    gPrevPos = pos
    renderMeme()
}


function onUp() {
    setElementDrag(false)
    document.body.style.cursor = 'grab'
}


function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()

        ev = ev.changedTouches[0]

        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}