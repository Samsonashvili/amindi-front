import { useEffect, useState } from "react"

const date = new Date()
const day = date.getDate().toString()
const month = date.getMonth() + 1
const hours = date.getHours().toString()
const mins = Number(date.getMinutes())


function DateHours() {
  const m = mins < 10 ? '0' + mins : mins
  let month_geo = '';

  switch (month) {
    case 1:
      month_geo = 'იანვარი'
      break;
    case 2:
      month_geo = 'თებერვალი'
      break;
    case 3:
      month_geo = 'მარტი'
      break;
    case 4:
      month_geo = 'აპრილი'
      break;
    case 5:
      month_geo = 'მაისი'
      break;
    case 6:
      month_geo = 'ივნისი'
      break;
    case 7:
      month_geo = 'ივლისი'
      break;
    case 8:
      month_geo = 'აგვისტო'
      break;
    case 9:
      month_geo = 'სექტემბერი'
      break;
    case 10:
      month_geo = 'ოქტომბერი'
      break;
    case 11:
      month_geo = 'ნოემბერი'
      break;
    case 12:
      month_geo = 'დეკემბერი'
      break;

    default: ''
      break;
  }
  const fullMonth = day + ' ' + month_geo;
  const fullHour = hours + ':' + m;

  return (
    <div className="flex items-center">
      <div className="w-[40px] h-[40px] flex items-center justify-center bg-sidebar-white rounded-full mr-3"><img src="/images/calendar.svg" alt="" /></div>
      <div className="flex flex-col ">
        <div className="font-helvetica text-xs text-white opacity-70">
          {fullMonth}
        </div>
        <div className="font-myriad text-sm text-white">
          {fullHour}
        </div>
      </div>
    </div>
  )
}

export default DateHours