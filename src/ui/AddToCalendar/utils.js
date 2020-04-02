import { get, has } from 'lodash'
import moment from 'moment'

const formatEvent = (event) => ({
  title: get(event, 'title', 'Christ Fellowship Church Event'),
  description: get(event, 'description', ''),
  address: get(event, 'address', ''),
  startTime: moment(get(event, 'startTime', moment(new Date()))),
  endTime: moment(get(event, 'endTime', moment(new Date()).add(1, 'h'))),
})

const formatTime = (date, allDay) => { 
  let formattedDate = allDay
    ? moment.utc(date).format("YYYYMMDD")  
    : moment.utc(date).format("YYYYMMDDTHHmmssZ")
  return formattedDate.replace("+00:00", "Z")
}

export const googleCalLink = (event, allDay) => {
  let {
    title,
    description,
    address,
    startTime,
    endTime
  } = formatEvent(event)

  //NOTE: when using all day format(removing time), the time defaults to midnight. 
  // In order to show correct days, we must add a day to the endTime

  if(allDay) {
    endTime = moment(endTime).add(1, 'day')
  }

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
  let {
    title,
    description,
    address,
    startTime,
    endTime
  } = formatEvent(event)

  if(allDay) {
    endTime = moment(endTime).add(1, 'day')
  }

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