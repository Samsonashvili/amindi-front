import { useState, useEffect } from "react"
import { useForm } from 'react-hook-form'

function Currency() {
  const [lariValue, setLariValue] = useState(1)
  const [currencyData, setCurrencyData] = useState(null)

  const { register, handleSubmit } = useForm()

  useEffect(() => {
    fetch(`https://any.ge/currency/api.php?ids=41,14,34,15`)
      .then(res => res.json())
      .then(data => setCurrencyData(data))
  }, [])

  const onSubmit = (data, value, field) => {
    console.log(value);
    field === 'other' ? setLariValue(data * value) : setLariValue(value / data)
  }

  return (
    currencyData && <>
      <div className='flex justify-between mb-4 md:mt-6'>
        <div className='xl:text-base md:text-xs font-myriad text-white'>
        ვალუტის კურსი
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 bg-sidebar-white rounded-[20px] overflow-hidden mb-4">
          <div className="flex items-center col-span-1 text-white bg-sidebar-white py-1 px-3 rounded-[20px] gap-2 font-myriad">
            <span className=" xl:text-base md:text-xs">GEL</span>
            <img src="/images/currencyIcons/gel.svg" alt="" />
            <span className=" xl:text-base md:text-xs">{lariValue.toString().substring(0, 4)}</span>
          </div>

          <div className="col-span-1 py-1 pr-3">
            <input
              type="number"
              {...register('lari')}
              className="w-full bg-transparent text-white xl:text-base md:text-xs my-2 outline-none appearance-none pl-1 font-helvetica"
              onChange={e => {
                onSubmit(e.target.value, '', 'lari')
                setLariValue(e.target.value)
              }}
              value={(lariValue === 0 || lariValue === 1) ? '' : lariValue.toString().substring(0, 4)}
              placeholder="კონვერტაცია"
              autoComplete="off"
            />
          </div>
        </div>

        {


          currencyData.map(currency => {
            const currencyValue = currency.cur_code.toLowerCase() === 'rub' ? currency.cur_value / 100 : currency.cur_value

            return <div className="grid grid-cols-2 bg-sidebar-white rounded-[20px] overflow-hidden mb-4">
              <div className="flex items-center col-span-1 text-white bg-sidebar-white py-1 px-3 rounded-[20px] gap-2 font-myriad">
                <span className=" xl:text-base md:text-xs">{currency.cur_code}</span>
                <img src={`/images/currencyIcons/${currency.cur_code.toLowerCase()}.svg`} alt="" />
                <span className=" xl:text-base md:text-xs">{(lariValue === '' || lariValue == 0) ? '' : (lariValue / currencyValue).toFixed(2)}</span>
              </div>

              <div className="col-span-1 py-1 pr-3">
                <input
                  type="number"
                  {...register(currency.cur_code)}
                  className="w-full bg-transparent text-white  xl:text-base md:text-xs my-2 outline-none appearance-none pl-1 font-helvetica"
                  onChange={e => {
                    onSubmit(e.target.value, currencyValue, 'other')
                  }}
                  placeholder="კონვერტაცია"
                  autoComplete="off"
                />
              </div>
            </div>
          })
        }
      </form>
    </>
  )
}

export default Currency