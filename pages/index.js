import AirPolution from "../components/Main/AirPolution"
import Currency from "../components/Main/Currency"
import ForecastBy12Days from "../components/Main/ForecastBy12Days"
import ForecastByhours from "../components/Main/ForecastByhours"
import WindandPressure from "../components/Main/WindandPressure"

export default function Home() {
  return (
    <div className="bg-site-deep-blue rounded-2xl md:ml-7 mt-7 container p-8">
      <div className="hidden sm:block">
        <ForecastBy12Days />
        <div className="grid lg:grid-cols-7 lg:grid-rows-1 grid-rows-2 grid-cols-2  gap-5 mt-4">
          <div className="lg:col-span-3 col-span-2 col-span">
            <ForecastByhours />
          </div>

          <div className="lg:col-span-2 md:col-span-1 col-span-2 grid grid-rows-2">
            <div className="mb-4"><WindandPressure /></div>
            <div><AirPolution /></div>
          </div>
          <div className="lg:col-span-2 md:col-span-1 col-span-2">
            <Currency />
          </div>
        </div>
      </div>
      <div className="sm:hidden">
        <div className="mb-4" >
          <ForecastBy12Days />
        </div>
        <div className="mb-4" >
          <ForecastByhours />
        </div>
        <div className="mb-4" >
          <WindandPressure />
        </div>
        <div className="mb-4" >
          <AirPolution />
        </div>
        <div className="mb-4" >
          <Currency />
        </div>
      </div>

    </div>
  )
}
