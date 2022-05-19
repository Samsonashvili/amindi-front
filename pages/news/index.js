import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/dist/client/image';
import Link from 'next/dist/client/link';

function News() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.amindi-ge.cc/api/v1/all-news").then(res => res.json())
      .then(d => setData(d.data))

    return () => {
      setData(null)
    }
  }, [])

  return (
    <div className='p-8 bg-site-deep-blue md:ml-7 mt-7 text-white'>
      <div className='xl:text-base md:text-xs mb-4 text-white font-myriad'>სიახლეები</div>
      {
        data ?
          <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4'>
            {
              data?.map((d, i) => {
                return <Link href={`/news/${d.id}`}>
                  <a>
                    <div className='flex flex-col items-center bg-sidebar-white rounded-xl overflow-hidden w-full' key={i}>
                      <div className='font-helvetica relative '>
                        <Image
                          width={600}
                          height={300}
                          objectFit='cover'
                          src={'https://api.amindi-ge.cc/' + d.photo}
                          alt={d.heading}
                        />
                        <div className='p-4 min-h-[104px]'>
                          <h3 className='line-clamp-2 text-sm font-myriad'>{d.title}</h3>
                          <p className='line-clamp-2 text-xs opacity-60'>{d.description}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              })
            }

          </div>
          :
          <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  gap-4'>
            {
              !data && [...Array(4)].map((_, i) => (
                <div className='flex flex-col items-center bg-sidebar-white p-5 rounded-2xl animate-pulse w-full' key={i}>
                  <div className='font-helvetica text-xs text-white opacity-60'>
                    <div className='w-3 h-3'></div>
                  </div>
                  <div className='min-w-[270px] min-h-[140px]'>
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
      }

    </div>

  )
}

export default News