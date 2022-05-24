import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/dist/client/link';
import Image from "next/image"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    arrows: false,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1.5,
                slidesToScroll: 1.5,
                infinite: true,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
            }
        }
    ]
};
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



function NewsSlider() {
    const [data, setData] = useState(null)


    useEffect(() => {
        fetch("https://api.amindi-ge.cc/api/v1/main-news").then(res => res.json())
            .then(d => setData(d.data))

        return () => {
            setData(null)
        }
    }, [])
    // console.log(data);
    return (
        <div className='text-white mb-6'>

            <a>
                <div className='flex justify-between mb-4 items-center text-base font-myriad'>
                    <div className='text-xl font-myriad '>
                        სიახლეები
                    </div>
                    <Link href="/news">
                        <div className='flex gap-2 cursor-pointer'>
                            <div>
                                ყველა
                            </div>
                            <img src="/images/all.svg" alt="" />
                        </div>
                    </Link>
                </div>

            </a>
            <Slider {...settings} >

                {
                    data?.map((d, i) => {
                        return <Link href={`/news/${d.id}`} key={i}>
                            <a>
                                <motion.div className='flex flex-col items-center bg-sidebar-white rounded-xl overflow-hidden w-full cursor-pointer' variants={childrenVariants}>
                                    <div className='font-helvetica relative'>
                                        <Image
                                            width={550}
                                            height={250}
                                            objectFit='cover'
                                            src={'https://api.amindi-ge.cc/' + d.photo}
                                            alt={d.title}
                                        />
                                        <div className='p-4 min-h-[104px]'>
                                            <h3 className='line-clamp-2 text-sm font-myriad'>{d.title}</h3>
                                            <p className='line-clamp-2 text-xs opacity-60'>{d.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </a>
                        </Link>
                    })
                }

            </Slider>
        </div>

    )
}

export default NewsSlider