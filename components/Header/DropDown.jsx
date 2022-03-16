import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { cities } from './cities'
// https://api.openweathermap.org/data/2.5/weather?lat=42.47521495708851&lon=44.47640515130203&appid=0a595777f15bfcfb7a415bd95948766c
// https://api.openweathermap.org/data/2.5/weather?lat=42.339781247285316&lon=43.40784065021814&appid=0a595777f15bfcfb7a415bd95948766c

import { useAppContext } from '../Store'

function DropDown() {
    const [showDropDown, setShowDropDown] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const { cityObject, setCityObject, setAirPollution, cityName, setCityName } = useAppContext()

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?appid=0a595777f15bfcfb7a415bd95948766c&q=${cityName}`)
            .then(res => res.json())
            .then(data => {
                setCityObject(data)
            })

        return () => setCityObject({})
    }, [cityName])

    useEffect(() => {
        Object.keys(cityObject).length > 0 && fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${cityObject?.coord.lat}&lon=${cityObject?.coord.lon}&appid=0a595777f15bfcfb7a415bd95948766c`)
            .then(res => res.json())
            .then(data => setAirPollution(data.list[0].main.aqi))
    }, [cityObject])

    return (
        <div className="relative md:ml-10 md:mt-0 mt-6">
            <div
                className='rounded-full bg-site-deep-blue text-white py-3 px-4 min-w-[400px] flex justify-between items-center select-none'
                onClick={() => setShowDropDown(!showDropDown)}
            >
                {cities.find(city => city.name_eng.toLowerCase() === cityName)?.name_geo}
                <div className='w-[16px] h-[16px] flex items-center justify-center border border-opacity-10 border-white rounded-full'>
                    <img src="/images/dropdown_arrow.svg" alt="arrow" />
                </div>
            </div>

            <AnimatePresence>
                {
                    showDropDown && <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ stiffness: 200, type: 'tween' }}
                        className="absolute top-[68px] w-full z-[2]"
                    >
                        <div className="relative bg-white rounded-3xl left-0 w-full pt-4 max-h-[500px] overflow-auto scroll_container">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                className="w-full rounded-full border border-opacity-20 border-white outline-none text-center py-3 font-helvetica"
                                placeholder='ქალაქის სახელი...'
                                autoFocus={showDropDown}
                            />

                            <div className='flex flex-col text-center mt-4 font-myriad'>
                                {
                                    cities.filter(city => (
                                        city.search_value.includes(inputValue.toLocaleLowerCase()) || city.name_geo.includes(inputValue.toLocaleLowerCase())
                                    )).map((city, index) => (
                                        <div
                                            key={index}
                                            className='mb-1 cursor-pointer'
                                            onClick={() => {
                                                setCityName(city.name_eng)
                                                setShowDropDown(false)
                                            }}>{city.name_geo}</div>
                                    ))
                                }
                            </div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
            {
                showDropDown && <div className='fixed w-screen h-screen left-0 top-0 bg-black opacity-30 z-[1]' onClick={() => setShowDropDown(false)}></div>
            }
        </div>
    )
}

export default DropDown