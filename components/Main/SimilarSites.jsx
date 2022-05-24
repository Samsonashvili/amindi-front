import { useRouter } from "next/router"
import { useState, useEffect } from "react";

const sites = [
    {
        name: 'MAI-AVTO.GE',
        url: '',
        desc: 'გაიგე საინტერესო ფაქტები ავტომობილებზე',
        icon: '/images/maiavto-icon.svg',
        img: '/images/maiavto-main.png'
    },
    {
        name: 'MP3-DOWNLOADER.GE',
        url: '',
        desc: 'გადმოწერე Youtube-დან MP3 ფაილები შენს კომპიუტერში',
        img: '/images/mp3-main.png'
    },
    {
        name: 'Tik-Tok.ge',
        url: '',
        desc: 'გაერთე ტრენდული ტიკტოკ ვიდეოებით',
        icon: '/images/tiktok-icon.svg',
        img: '/images/tiktok-main.png'
    },
]

function SimilarSites() {
    const [isNewsPage, setIsNewsPage] = useState(false)

    const router = useRouter()

    useEffect(() => {
        router.pathname.includes('news') && setIsNewsPage(true)

        return () => setIsNewsPage(false)
    }, [router])


    return (
        <div className={`${isNewsPage ? 'flex flex-col mt-7' : 'grid lg:grid-cols-3'} gap-4 mb-8`}>
            {
                sites.map(site => (
                    <a href={site.url} key={site.name} target="_blank" rel="noreferrer">
                        <div className={`rounded-[18px] ${isNewsPage ? 'bg-site-deep-blue' : 'bg-sidebar-white'} text-white xl:p-8 lg:p-6 p-6 relative transition duration-150 min-h-[190px] overflow-hidden`}>
                            <div className="w-2/3">
                                <div className="flex items-center">
                                    {
                                        site.icon && <img src={site?.icon} alt={site?.name} className="max-w-[22px] mr-2" />
                                    }
                                    <div>
                                        <h3 className='text-[18px]'>
                                            {site.name}
                                        </h3>
                                    </div>
                                </div>
                                <div className="mt-2 opacity-60 font-helvetica text-xs">
                                    {site.desc}
                                </div>
                            </div>

                            <div className='absolute right-[-12px] top-0 h-full'>
                                <img src={site.img} alt={site.name} className="h-full" />
                            </div>
                        </div>
                    </a>
                ))
            }
        </div>
    )
}

export default SimilarSites