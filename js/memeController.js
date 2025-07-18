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
    }
    onShowMeme()
}


function renderText() {

    gMeme.lines.forEach(idx => {
        const { id, txt, size, color, offsetx, offsety } = idx

        gCtx.lineWidth = 1
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = color
        gCtx.font = size + 'px arial'
        gCtx.textAlign = 'center'
        gCtx.textBaseline = 'middle'
        gCtx.fillText(txt, offsetx, offsety)
        gCtx.strokeText(txt, offsetx, offsety)

        setLineTxt()
        setLineSize()
        // renderTextBoxRect()
    })

}


function onShowGallery() {
    // document.querySelector('.gallery-container').classList.remove('hide')
    // document.querySelector('.gallery').classList.remove('hide')
    // document.querySelector('.gallery-img').classList.remove('hide')
    document.querySelector('.editor').classList.add('hide')
    // document.querySelector('.edit-lines').classList.add('hide')
}

function onShowMeme() {
    document.querySelector('.editor').classList.remove('hide')
    // document.querySelector('.edit-lines').classList.remove('hide')
    // document.querySelector('.gallery-container').classList.add('hide')
    // document.querySelector('.gallery').classList.add('hide')
    // document.querySelector('.gallery-img').classList.add('hide')

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
    renderMeme()
}


function onSwitchLine() {
    switchLine()
    renderMeme()
}


function renderTextBoxRect() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    const { rectXStart, rectYStart, rectXEnd, rectYEnd } = currLine
    gCtx.strokeRect(rectXStart, rectYStart, rectXEnd, rectYEnd)
}


function isLineSelected(ev) {

    const currLoc = gMeme.lines.find(idx => {
        console.log('click x', ev.offsetX);
        console.log('click y', ev.offsetY);
        // console.log(idx);
        // console.log(gMeme.lines[gMeme.selectedLineIdx]);

        // console.log('lineX start end ',idx.rectXStart,idx.rectXEnd);
        // console.log('lineY start end ',idx.rectYStart,idx.rectYEnd);
        console.log('lineX start end ', idx.rectXStart, idx.rectXEnd);
        console.log('lineY start end ', idx.rectYStart, idx.rectYEnd);

        // if (ev.offsetX >= idx.lineXStart && ev.offsetX <= idx.lineXEnd
        //     && ev.offsetY <= idx.lineYStart && ev.offsetY >= idx.lineYEnd) {

        if (ev.clientX >= idx.rectXStart && ev.clientX <= idx.rectXEnd
            && ev.clientY <= idx.rectYStart && ev.clientY >= idx.rectYEnd
        ) {

            console.log('hi', idx);
            gMeme.selectedLineIdx = idx.id
        }
    })
}
