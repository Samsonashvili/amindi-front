import React from 'react'
import { useState, useEffect } from 'react';
import { useAppContext } from '../Store'

function AirPolution() {
    const [pollutionObject, setPollutionObject] = useState({})

    const { airPollution } = useAppContext()
    console.log(airPollution, "დაბინძურობა");
    const airPolutions = [
        {
            id: 1,
            type: "ძალიან კარგი",
            background: {
                backgroundColor: '#0C93F1'
            }
        },
        {
            id: 2,
            type: "კარგი",
            background: {
                backgroundColor: '#1BB258'
            }
        },
        {
            id: 3,
            type: "საშუალო",
            background: {
                backgroundColor: '#CFA200'
            }
        },
        {
            id: 4,
            type: "ცუდი",
            background: {
                backgroundColor: '#DB3939'
            }
        },
        {
            id: 5,
            type: "ძალიან ცუდი",
            background: {
                backgroundColor: '#A75B39'
            }
        }
    ]

    useEffect(() => {
        setPollutionObject(airPolutions.find((polution) => {
            return polution.id === airPollution
        }))

        return () => setPollutionObject({})
    }, [airPollution])

    console.log(pollutionObject);

    return (
        <div className='p-6 bg-sidebar-white rounded-xl max-h-[168px]'>
            <div className='xl:text-base md:text-xs  text-white font-myriad'>ჰაერის დაბინძურება</div>
            {
                (pollutionObject && Object.keys(pollutionObject).length > 0) && <div className='flex items-center justify-center rounded-2xl py-2 text-white text-xs font-myriad  my-4' style={pollutionObject.background}>
                    {pollutionObject?.type}
                </div>
            }
            <div className='flex flex-wrap'>
                {
                    airPolutions.map((polution) =>
                        <div className='flex items-center mr-1 mb-2'>
                            <div className='w-1 h-1 rounded-full' style={polution.background} ></div>
                            <div className='text-[10px] text-white opacity-60 ml-1'>{polution.type}</div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default AirPolution