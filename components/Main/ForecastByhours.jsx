import React from 'react'
import { useState, useEffect } from 'react'
import { useAppContext } from '../Store'
import { AnimatePresence, motion } from 'framer-motion'

function ForecastByhours() {
    const { cityObject } = useAppContext()
    const [data, setData] = useState(null)

    function getMinutes(unix_timestamp) {
        var date = new Date(unix_timestamp * 1000)
        var hours = date.getHours();

        // Minutes part from the timestamp
        if (date.getMinutes() < 10) {
            var minutes = '0' + date.getMinutes();
        } else {
            var minutes = date.getMinutes();
        }
        return (hours + ":" + minutes)
    }
    // console.log(data, 'dataaaa');

    function getWeatherName(name) {
        let geoName;
        let weatherToLowerCase = name.toLowerCase();
        switch (weatherToLowerCase) {
            case 'snow':
                geoName = 'თოვლი'
                break;
            case 'clouds':
                geoName = 'ღრუბლიანი'
                break;
            case 'light snow':
                geoName = 'ღრუბლიანი'
                break;
            case 'overcast clouds':
                geoName = 'ღრუბლიანი'
                break;
            case 'fog':
                geoName = 'ნისლი'
                break;
            case 'clear':
                geoName = 'მზიანი'
                break;
            case 'rain':
                geoName = 'წვიმა'
                break;
            default:
                break;
        }
        // console.log(geoName)
        return geoName;
    }

    function getDay(unix_timestamp) {
        const date = new Date()
        const dateUnix = new Date(unix_timestamp * 1000)

        let day;

        // Minutes part from the timestamp
        if (dateUnix.getDate() === date.getDate()) {
            day = 'დღეს'
        } else if (dateUnix.getDate() - 1 === date.getDate()) {
            day = 'ხვალ'
        } else if (dateUnix.getDate() - 2 === date.getDate()) {
            day = 'ზეგ'
        }
        return day
    }

    // const d = new Date()
    // console.log(d.getDate());
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityObject?.coord?.lat}&lon=${cityObject?.coord?.lon}&exclude=current,minutely,daily,alerts&units=metric&appid=761653970bb425488bf5e4757f44718b`)
            .then(res => res.json())
            .then(data => setData(data))

        return () => {
            setData(null)
        }
    }, [cityObject])

    return (
        <div>
            {
                Object.keys(cityObject).length > 0 && <div className='bg-sidebar-white rounded-xl p-6 flex flex-col'>
                    <div className='xl:text-base md:text-xs font-myriad text-white mb-4'>
                        ამინდი საათების მიხედვით
                    </div>
                    <div className='max-h-[280px] overflow-auto white-scroll_container'>
                        {
                            data?.hourly?.map((d, i) => {
                                return <div className='mb-5 flex items-center justify-between' key={i}>
                                    <div>
                                        <div className='flex items-center'>
                                            <div><img src="/images/clock.svg" alt="" /></div>
                                            <div className='font-myriad ml-2 text-sm text-white flex items-center'>
                                                {getMinutes(d.dt)}

                                                <svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 2 2" className='mx-1'>
                                                    <circle id="Ellipse_21" data-name="Ellipse 21" cx="1" cy="1" r="1" fill="#fff" />
                                                </svg>

                                                {getDay(d.dt)}
                                            </div>
                                        </div>
                                        <div className='font-helvetica text-xs text-white opacity-60'>
                                            {getWeatherName(d.weather[0].main)}
                                        </div>
                                    </div>

                                    <div className='flex items-center mr-4'>
                                        <div className='w-10 h-10'>
                                            <img src={`/images/weatherIcons/${d.weather && d.weather[0].icon}.svg`} alt="" />
                                        </div>
                                        <div className='text-white text-sm ml-3 font-myriad'>
                                            {Math.round(d.temp)}°
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            }

        </div>
    )
}

export default ForecastByhours