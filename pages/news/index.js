import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/dist/client/image';
import Link from 'next/dist/client/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AnimatePresence, motion } from 'framer-motion'

function News() {
  const [data, setData] = useState([]);
  const [isTopNews, setIsTopNews] = useState(false);
  const [page, setPage] = useState(1);
  const [isPending, setIsPending] = useState(true);
  const [showDropDown, setShowDropDown] = useState(false)


  function getData(ref) {

    fetch(`https://api.amindi-ge.cc/api/v1/${!isTopNews ? 'all-news' : 'top-news'}?page=${page}`)
      .then(res => res.json())
      .then(d => {
        if (ref === 'pageChange') {
          setIsPending(false)
          setData(data.concat(d.data))
        } else {
          setData([])
          setPage(1)
          setData(d.data)
          setIsPending(false)
        }

      })
      .catch(() => setIsPending(false))
  }

  useEffect(() => {
    getData('pageChange')
  }, [page])

  useEffect(() => {
    setIsPending(true)
    getData('topNewsChange')
  }, [isTopNews])

  return (
    <div className='p-8 bg-site-deep-blue md:ml-7 mt-7 text-white min-h-full'>
      <div className='flex items-center justify-between font-myriad mb-4  border-b-[1px] border-[#ffffff1F]'>
        <div className='xl:text-base md:text-xs pb-4'>სიახლეები</div>
        <div className="text-sm sm:flex hidden items-center gap-2">
          <div onClick={() => setIsTopNews(false)} className={`${!isTopNews ? 'opacity-100 border-opacity-100' : 'opacity-60'} pb-4 border-b-[2px] border-opacity-0 border-[#0C93F1]`}>
            ბოლოს დამატებული
          </div>
          <div onClick={() => setIsTopNews(true)} className={`${isTopNews ? 'opacity-100 border-opacity-100' : 'opacity-60'} pb-4 border-b-[2px] border-opacity-0 border-[#0C93F1]`}>
            ტოპ სიახლეები
          </div>
        </div>
        <div className='relative sm:hidden'>
          <div onClick={() => setShowDropDown(!showDropDown)} className="flex items-center gap-2 pb-4" >
            {
              !isTopNews ? "ბოლოს დამატებული" : "ტოპი"
            }
            <div style={{ transform: showDropDown ? 'rotate(180deg)' : 'rotate(0deg)' }}> <img src="/images/mobile_arrow.svg" alt="" /> </div>
          </div>
          <AnimatePresence>
            {
              showDropDown && <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 16, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={() => setShowDropDown(false)}
                className="absolute bg-white text-black right-0 top-3 z-10 p-3 rounded-lg min-w-[200px]"
              >
                <div onClick={() => setIsTopNews(false)} className={`${!isTopNews ? 'border-b-[2px] border-opacity-100' : 'opacity-60'} pb-1 `}>
                  ბოლოს დამატებული
                </div>
                <div onClick={() => setIsTopNews(true)} className={`${isTopNews ? 'border-b-[2px] border-opacity-100' : 'opacity-60'}`}>
                  ტოპ სიახლეები
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>

      </div>

      {
        (data?.length > 0 && !isPending) && <InfiniteScroll
          dataLength={data.length}
          next={() => setPage(page + 1)}
          style={{ display: 'grid' }} //To put endMessage and loader to the top.
          // inverse={true} //
          hasMore={true}
          loader={isPending && <h4>Loading...</h4>}
        >
          <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4'>

            {
              data?.map((d, i) => {
                return <Link href={`/news/${d.id}`} key={d.id}>
                  <a >
                    <div className='flex flex-col items-center bg-sidebar-white rounded-xl overflow-hidden w-full'>
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
        </InfiniteScroll>
      }

      {
        isPending && <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  gap-4'>
          {
            [...Array(4)].map((_, i) => (
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