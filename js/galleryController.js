'use strict'

renderGallery()

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    var strHTML = ''
    var count = 0

    strHTML = gImgs.map(img => {
        return `<img src="${img.url}" alt="" id:"${count++}" height="150" width="150" onclick=onImgSelect(${count})>`
    })

    elGallery.innerHTML = strHTML.join('')
}

function onImgSelect(elImgIdx) {
    document.querySelector('.gallery').classList.add('hide')
    document.querySelector('.canvas-container').classList.remove('hide')

    setImg(elImgIdx)
    renderMeme()
}