import React from 'react'
import { useAppContext } from '../Store'

function WindandPressure() {
    const { cityObject } = useAppContext()
    console.log(cityObject, "pres");
    return (
        <div className='p-6 bg-sidebar-white rounded-xl'>
            <div className='xl:text-base md:text-xs text-white font-myriad mb-4'>ქარი და წნევა</div>
            <div>
                <div>
                    <div className='flex items-center'>
                        <div className='flex items-center justify-center w-[40px] h-[40px] rounded-full bg-sidebar-white '>
                            <img src="/images/wind.svg" alt="" />
                        </div>
                        <div className='ml-4'>
                            <div className='font-helvetica text-xs text-white opacity-60'>
                                ქარის სიჩქარე
                            </div>
                            <div className='font-myriad text-sm text-white'>
                                {!isNaN(cityObject?.wind?.speed) && Math.round(cityObject?.wind?.speed * 3)} km/h
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center mt-4'>
                        <div className='flex items-center justify-center w-[40px] h-[40px] rounded-full bg-sidebar-white '>
                            <img src="/images/pressure.svg" alt="" />
                        </div>
                        <div className='ml-4'>
                            <div className='font-helvetica text-xs text-white opacity-60'>
                                წნევა
                            </div>
                            <div className='font-myriad text-sm text-white'>
                                {!isNaN(cityObject?.main?.pressure) && Math.round(cityObject?.main?.pressure / 10)} kpa
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WindandPressure