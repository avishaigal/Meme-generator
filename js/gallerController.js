'use strict'

renderGallery()

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    var strHTML = ''

    strHTML = gImgs.map(img => {
        return `<img src="${img.url}" alt="" height="150" width="150">`
    })
    elGallery.innerHTML = strHTML.join('')
}