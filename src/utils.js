import PixelManager from './components/PixelManager'
import { Parser } from 'html-to-react'


export const htmlToReactParser = new Parser()

export const mapEdgesToNodes = (data) => data.edges.map(n => n.node)
export const redirectTo = (uri, newTab) =>
    newTab
        ? window.open(uri, '_blank')
        : window.location.href = uri

export const hexToRGB = (hex) => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    })

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null
}

export const getTextColorClass = (backgroundColor) => {
    var rgb = hexToRGB(backgroundColor)
    var o = Math.round(((parseInt(rgb.r) * 299) +
        (parseInt(rgb.g) * 587) +
        (parseInt(rgb.b) * 114)) / 1000);
    // return (o > 125) ? 'text-dark' : 'text-light';
    return (o > 175) ? 'text-dark' : 'text-light'
}

export const buttonClick = ({ call, action, title, openLinksInNewTab }) => {
    PixelManager.reportButtonClick({ call: `${title} - ${call}`, action })

    if (openLinksInNewTab) {
        const win = window.open(action, '_blank')
        win.focus()
    }
    else {
        redirectTo(action)
    }

}