'use strict'

renderGallery()


function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    var strHTML = ''
    var count = 0

    strHTML = gImgs.map(img => {
        return `<img src="${img.url}" alt="" id:"${count++}" class="gallery-img" onclick=onImgSelect(${count})>`
    })

    elGallery.innerHTML = strHTML.join('')    
}


function onImgSelect(elImgIdx) {
    document.querySelector('.editor').classList.remove('hide')

    setImg(elImgIdx)
    renderMeme()
}