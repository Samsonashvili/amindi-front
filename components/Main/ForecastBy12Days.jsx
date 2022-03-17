import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useEffect, useState } from 'react'
import { useAppContext } from '../Store'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const parentVariants = {
    initial: "",
    animate: {
        transition: {
            staggerChildren: .1
        }
    }
}

const childrenVariants = {
    initial: {
        opacity: 0,
        scale: 0
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: .3
        }
    }
}

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 3,
    arrows: false,
};

function getDate(date) {
    let monthGe = '';
    const d = new Date((date - 19800) * 1000)
    const myArray = d.toGMTString().split(" ");
    const day = myArray[1]
    const month = myArray[2]
    switch (month) {
        case 'Jan':
            monthGe = 'იანვარი';
            break;
        case 'Feb':
            monthGe = 'თებერვალი';
            break;
        case 'Mar':
            monthGe = 'მარტი';
            break;
        case 'Apr':
            monthGe = 'აპრილი';
            break;
        case 'May':
            monthGe = 'მაისი';
            break;
        case 'Jun':
            monthGe = 'ივნისი';
            break;
        case 'Jul':
            monthGe = 'ივლისი';
            break;
        case 'Aug':
            monthGe = 'აგვისტო';
            break;
        case 'Sept', "Sep":
            monthGe = 'სექტემბერი';
            break;
        case 'Oct':
            monthGe = 'ოქტომბერი';
            break;
        case 'Nov':
            monthGe = 'ნოემბერი';
            break;
        case 'Dec':
            monthGe = 'დეკემბერი';
            break;
        default:
            break;
    }
    return (day + ' ' + monthGe)
}

function ForecastBy12Days() {
    const [data, setData] = useState(null)
    const { cityObject } = useAppContext()
    console.log(data, 'city');
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityObject?.coord?.lat}&lon=${cityObject?.coord?.lon}&exclude=hourly,minutely,alerts&units=metric&appid=0a595777f15bfcfb7a415bd95948766c`)
            .then(res => res.json())
            .then(data => setData(data))

        return () => {
            setData(null)
        }

    }, [cityObject])

    return (
        <>
            <div className='flex justify-between mb-4'>
                <div className='text-xl font-myriad text-white'>
                    ამინდი დღეების მიხედვით
                </div>
            </div>
            {
                data && <motion.div variants={parentVariants} initial="initial" animate="animate" key={data.city?.id}>
                    <div className='grid xl:grid-cols-8 md:grid-cols-4 md:grid hidden gap-4'>
                        {
                            data.daily?.map((d, i) => {
                                const day = new Date(d.dt * 1000).toLocaleDateString("ka", {
                                    weekday: "long",
                                }).toLowerCase()
                                let dayKa;

                                switch (day) {
                                    case 'monday':
                                        dayKa = 'ორშაბათი'
                                        break;
                                    case 'tuesday':
                                        dayKa = 'სამშაბათი'
                                        break;
                                    case 'wednesday':
                                        dayKa = 'ოთხშაბათი'
                                        break;
                                    case 'thursday':
                                        dayKa = 'ხუთშაბათი'
                                        break;
                                    case 'friday':
                                        dayKa = 'პარასკევი'
                                        break;
                                    case 'saturday':
                                        dayKa = 'შაბათი'
                                        break;
                                    case 'sunday':
                                        dayKa = 'კვირა'
                                        break;

                                    default: ''
                                        break;
                                }

                                return <motion.div className='flex flex-col items-center bg-sidebar-white p-5 rounded-2xl' variants={childrenVariants} key={i}>
                                    <div className='font-helvetica text-xs text-white opacity-60'>
                                        {dayKa}
                                    </div>
                                    <div className='text-white font-myriad text-sm'>
                                        {getDate(d.dt)}
                                    </div>
                                    <div className='min-w-[50px] min-h-[70px]'>
                                        <img src={`/images/weatherIcons/${d.weather && d.weather[0].icon}.svg`} alt="" />
                                    </div>
                                    <div className='font-myriad text-xs text-white mt-2'>
                                        {Math.round(d.temp.min)}°  {Math.round(d.temp.max)}°
                                    </div>
                                    <div>

                                    </div>
                                </motion.div>

                            })
                        }
                    </div>
                    <div className="md:hidden">
                        <Slider {...settings} >
                            {
                                data.daily?.map((d, i) => {
                                    const day = new Date(d.dt * 1000).toLocaleDateString("ka", {
                                        weekday: "long",
                                    }).toLowerCase()
                                    let dayKa;

                                    switch (day) {
                                        case 'monday':
                                            dayKa = 'ორშაბათი'
                                            break;
                                        case 'tuesday':
                                            dayKa = 'სამშაბათი'
                                            break;
                                        case 'wednesday':
                                            dayKa = 'ოთხშაბათი'
                                            break;
                                        case 'thursday':
                                            dayKa = 'ხუთშაბათი'
                                            break;
                                        case 'friday':
                                            dayKa = 'პარასკევი'
                                            break;
                                        case 'saturday':
                                            dayKa = 'შაბათი'
                                            break;
                                        case 'sunday':
                                            dayKa = 'კვირა'
                                            break;

                                        default: ''
                                            break;
                                    }

                                    return <motion.div className='flex flex-col items-center bg-sidebar-white p-5 rounded-2xl ' variants={childrenVariants} key={i}>
                                        <div className='font-helvetica text-xs text-white opacity-60'>
                                            {dayKa}
                                        </div>
                                        <div className='min-w-[50px] min-h-[70px]'>
                                            <img src={`/images/weatherIcons/${d.weather && d.weather[0].icon}.svg`} alt="" />
                                        </div>
                                        <div className='font-myriad text-xs text-white mt-2'>
                                            {Math.round(d.temp.min)}°  {Math.round(d.temp.max)}°
                                        </div>
                                        <div>

                                        </div>
                                    </motion.div>

                                })
                            }
                        </Slider>
                    </div>

                </motion.div>
            }
            <div className="grid grid-cols-8 gap-4 mt-4">
                {
                    !data && [...Array(8)].map((_, i) => (
                        <div className='flex flex-col items-center bg-sidebar-white p-5 rounded-2xl animate-pulse w-[150px]' key={i}>
                            <div className='font-helvetica text-xs text-white opacity-60'>
                                <div className='w-3 h-3'></div>
                            </div>
                            <div className='min-w-[50px] min-h-[70px]'>
                                <div className='w-5 h-5 rounded-full'></div>
                            </div>
                            <div className='font-myriad text-xs text-white mt-2'>
                                <div className='w-3 h-3'></div>
                            </div>
                            <div>

                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default ForecastBy12Days