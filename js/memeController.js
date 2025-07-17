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
    const textInput = setLineTxt()
    const textsArray = gMeme.lines

    textsArray.forEach(idx => {
        const { txt, size, color, offsetx, offsety, isActive } = idx

        if (isActive) {
            gCtx.lineWidth = 1
            gCtx.strokeStyle = 'black'
            gCtx.fillStyle = color
            gCtx.font = size + 'px fantasy'
            gCtx.textAlign = 'center'
            gCtx.textBaseline = 'middle'
            gCtx.fillText(textInput || txt, offsetx, offsety)
            gCtx.strokeText(textInput || txt, offsetx, offsety)
        } else {
            gCtx.lineWidth = 1
            gCtx.strokeStyle = 'black'
            gCtx.fillStyle = color
            gCtx.font = size + 'px fantasy'
            gCtx.textAlign = 'center'
            gCtx.textBaseline = 'middle'
            gCtx.fillText(txt, offsetx, offsety)
            gCtx.strokeText(txt, offsetx, offsety)
        }
    })
}


// function renderMeme() {
//     const elMeme = getMeme()
//     const { selectedImgId, selectedLineIdx, lines } = elMeme

//     var elImg = new Image()
//     elImg.src = gImgs[selectedImgId].url

//     gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width

//     elImg.onload = () => {
//         gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
//         renderText(lines[selectedLineIdx])
//     }
// }


// function renderText({ color, size, txt }, lineIdx) {
//         const text = setLineTxt(lineIdx)
//         gCtx.lineWidth = 1
//         gCtx.strokeStyle = 'black'
//         gCtx.fillStyle = color
//         gCtx.font = size + 'px fantasy'
//         gCtx.textAlign = 'center'
//         gCtx.textBaseline = 'middle'
//         gCtx.fillText(text, 150, 50)
//         gCtx.strokeText(text, 150, 50)
// }


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