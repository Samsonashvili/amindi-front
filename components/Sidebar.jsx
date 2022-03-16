import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cities } from './Header/cities.js';
import { useAppContext } from './Store.js'

function Sidebar() {
    const [weatherInfo, setWeatherInfo] = useState(null)
    const { cityObject, cityName } = useAppContext()

    function getTime(unix_timestamp) {
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
    // console.log(cityObject);
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

    useEffect(() => {
        setWeatherInfo([
            {
                infoName: 'ტემპ. მგრძნობელობა',
                infoText: `${!isNaN(cityObject?.main?.feels_like) && Math.round(cityObject?.main?.feels_like - 273.15)}°`
            },
            {
                infoName: 'ტენიანობა',
                infoText: `${!isNaN(cityObject?.main?.humidity) && cityObject?.main?.humidity} % `
            },
            {
                infoName: 'ქარის სიჩქარე',
                infoText: `${!isNaN(cityObject?.wind?.speed) && Math.round(cityObject?.wind?.speed * 3)} kph`
            },
            {
                infoName: 'ღრუბლიანობა',
                infoText: `${cityObject?.clouds?.all}%`
            },
            {
                infoName: 'მზის ამოსვლა',
                infoText: `${getTime(cityObject?.sys?.sunrise)}`
            },
            {
                infoName: 'მზის ჩასვლა',
                infoText: `${getTime(cityObject?.sys?.sunset)}`
            },
        ])
    }, [cityObject])

    return (
        <div className='mt-7'>
            <AnimatePresence exitBeforeEnter>
                {
                    Object.keys(cityObject).length > 0 && <motion.div
                        className='rounded-2xl bg-sidebar-white p-6 flex flex-col items-center'
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { duration: .4 } }}
                        exit={{ scale: 0, transition: { duration: .3 } }}
                        key={cities.find(city => city.name_eng === cityName)?.name_geo}
                    >
                        <div className='font-myriad text-white'>
                            {cities.find(city => city.name_eng === cityName)?.name_geo}
                        </div>
                        <img src={`/images/weatherIcons/${cityObject.weather && cityObject.weather[0].icon}.svg`} className="w-32 mt-6" alt="" />
                        <div className='font-myriad text-white text-base mt-6'>
                            {getWeatherName(cityObject?.weather[0]?.main)}
                        </div>
                        <div className='font-myriad text-white text-base mb-6'>
                            {Math.round(cityObject?.main?.temp - 273.15)}°C
                        </div>
                        <div className='min-w-[152px]'>
                            {
                                (cityObject && weatherInfo) && weatherInfo.map(info => (
                                    <div className='flex justify-between items-center w-full text-xs mb-[14px]'>
                                        <div className='font-helvetica text-white opacity-70'>{info.infoName}</div>
                                        <div className='font-myriad text-sm text-white'>{info.infoText}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
            <div className='hidden md:block mt-4 max-w-[200px]'>
                <img src="/images/fewqe.png" alt="" />
            </div>
        </div>
    )
}

export default Sidebar