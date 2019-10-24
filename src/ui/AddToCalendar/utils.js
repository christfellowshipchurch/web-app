import { get, has } from 'lodash'
import moment from 'moment'

const formatEvent = (event) => ({
  title: get(event, 'title', 'Christ Fellowship Church Event'),
  description: get(event, 'description', ''),
  address: get(event, 'address', ''),
  startTime: moment(get(event, 'startTime', new Date())).toISOString(),
  endTime: moment(
    has(event, 'endTime')
      ? get(event, 'endTime', new Date())
      : get(event, 'startTime', new Date())
  ).toISOString(),
})

export const googleCalLink = (event) => {
  const {
    title,
    description,
    address,
    startTime,
    endTime
  } = formatEvent(event)

  return encodeURI([
    'https://www.google.com/calendar/render',
    '?action=TEMPLATE',
    `&text=${title}`,
    `&dates=${startTime}`,
    `/${endTime}`,
    `&details=${description}`,
    `&location=${address}`,
    '&sprop=&sprop=name:'
  ].join(''))
}

export const icsLink = (event) => {
  const {
    title,
    description,
    address,
    startTime,
    endTime
  } = formatEvent(event)

  return (
    'data:text/calendar;charset=utf8,' + [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `URL:${document.URL}`,
      `DTSTART:${startTime}`,
      `DTEND:${endTime}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${address}`,
      'END:VEVENT',
      'END:VCALENDAR'].join('\n')
  )
}