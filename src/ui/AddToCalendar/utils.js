import { get, has } from 'lodash'
import moment from 'moment'

const formatEvent = (event) => ({
  title: get(event, 'title', 'Christ Fellowship Church Event'),
  description: get(event, 'description', ''),
  address: get(event, 'address', ''),
  startTime: moment(get(event, 'startTime', new Date())).toISOString(),
  endTime: moment(
    get(event, 'endTime', null) === null
      ? get(event, 'endTime', new Date())
      : get(event, 'startTime', moment(new Date()).add(1, 'h'))
  ).toISOString(),
})

const formatTime = (date, allDay) => {

  //Checks if Calendar is set to all day, and removes time
  let formattedDate = allDay
      ?  moment.utc(date).format("YYYYMMDD")
      :  moment.utc(date).format("YYYYMMDDTHHmmssZ")

  return formattedDate.replace("+00:00", "Z")
}

export const googleCalLink = (event, allDay) => {
  const {
    title,
    description,
    address,
    startTime,
    endTime
  } = formatEvent(event)

  return encodeURI([
    'https://calendar.google.com/calendar/render',
    '?action=TEMPLATE',
    `&dates=${formatTime(startTime, allDay)}`,
    `/${formatTime(endTime, allDay)}`,
    `&location=${address}`,
    `&text=${title}`,
    `&details=${description}`,
  ].join(''))
}

export const icsLink = (event, allDay) => {
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
      `DTSTART:${formatTime(startTime, allDay)}`,
      `DTEND:${formatTime(endTime, allDay)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${address}`,
      'END:VEVENT',
      'END:VCALENDAR'].join('\n')
  )
}