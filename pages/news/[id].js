import { useRouter } from 'next/router'
import Image from 'next/image'
import SimilarSites from '../../components/Main/SimilarSites'
import Head from 'next/head'
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { useState, useEffect } from 'react';


function SingeNews({ data }) {
    const [shareUrl, setShareUrl] = useState(null)
    const router = useRouter();
    // const newsId = router.query.id

    // console.log(data);

    useEffect(() => {
        typeof window !== 'undefined' && setShareUrl(window.location.href)
    }, [])

    console.log(shareUrl);

    return (
        <>
            <Head>
                <title>{data.heading}</title>
            </Head>
            <div className='lg:grid lg:grid-cols-6 lg:gap-6 flex flex-col'>
                <div className='bg-site-deep-blue md:ml-7 md:mt-7 mt-0 col-span-4 rounded-[20px] p-6 text-white'>
                    <div className='w-full rounded-xl overflow-hidden mb-4'> <img src="/images/horizontal.jpg" alt="banner" className='w-full' /></div>
                    <h2 className='text-2xl font-myriad mb-2'>{data.title}</h2>
                    <Image src={'https://api.amindi-ge.cc/' + data.photo}
                        width={1400}
                        height={700}
                        objectFit='cover'
                        className='rounded-2xl overflow-hidden'
                        alt={data.title}
                    />
                    <div className='font-helvetica text-sm opacity-70'>
                        {data.description}
                    </div>

                    {
                        shareUrl && <>
                            <h3 className='mt-8 mb-3 font-myriad'>გაზიარება</h3>

                            <div className="flex gap-4 mb-4">
                                <FacebookShareButton url={shareUrl}>
                                    <div className="flex items-center gap-4 bg-[#3B5998] px-4 py-2 rounded-[8px]">
                                        <img src="/images/Facebook-Logo.svg" alt="facebook" />
                                        Facebook
                                    </div>
                                </FacebookShareButton>

                                <TwitterShareButton url={shareUrl}>
                                    <div className="flex items-center gap-4 bg-[#03A9F4] px-4 py-2 rounded-[8px]">
                                        <img src="/images/Twitter.svg" alt="facebook" />
                                        Twitter
                                    </div>
                                </TwitterShareButton>
                            </div>
                            <div className='w-full rounded-xl overflow-hidden mb-4'> <img src="/images/horizontal.jpg" alt="banner" className='w-full' /></div>

                        </>
                    }
                </div>
                <div className='col-span-2 md:ml-7 lg:ml-0'>
                    <SimilarSites />
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const id = context.params.id

    const res = await fetch(`https://admin.amindi.cc/api/v1/news?id=${id}`)
    const data = await res.json()

    return { props: { data } }
}

export default SingeNews
