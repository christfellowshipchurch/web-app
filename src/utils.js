import { Parser } from 'html-to-react'
import moment from 'moment'
import { get, split } from 'lodash'

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

// Old button click from Pixel Manager
// export const buttonClick = ({ call, action, title, openLinksInNewTab }) => {
//     PixelManager.reportButtonClick({ call: `${title} - ${call}`, action })

//     if (openLinksInNewTab) {
//         const win = window.open(action, '_blank')
//         win.focus()
//     } else {
//         redirectTo(action)
//     }
// }

export const getDirectionsUrl = (address) =>
    `https://www.google.com/maps/search/?api=1&query=${address.replace(' ', '+')}`

export const formatDate = (props) => {
    const mStart = moment(get(props, 'startDate', new Date()))
    let mEnd = null
    const end = get(props, 'endDate', null)

    if (end) {
        mEnd = moment(end)
        const format = mStart.month() === mEnd.month()
            ? 'D'
            : 'MMM D'

        return `${mStart.format('MMM D')} - ${mEnd.format(format)}`
    }

    return mStart.format('MMM D')
}

export const getStartDateFromEvents = (props) => {
    const events = get(props, 'events', [])
    const start = get(props, 'startDate', new Date())
    const mStart = moment(start).isValid()
        ? start
        : new Date()
    const sorted = events.sort((a, b) => moment(a.start).diff(moment(b.start)))

    return moment(get(sorted, '[0].start', mStart)).format('MMM D')
}