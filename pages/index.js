import AirPolution from "../components/Main/AirPolution"
import Currency from "../components/Main/Currency"
import ForecastBy12Days from "../components/Main/ForecastBy12Days"
import ForecastByhours from "../components/Main/ForecastByhours"
import SimilarSites from "../components/Main/SimilarSites"
import WindandPressure from "../components/Main/WindandPressure"
import { AnimatePresence, motion } from 'framer-motion'
import NewsSlider from "../components/Main/NewsSlider"

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

export default function Home() {
  return (
    <div className="bg-site-deep-blue overflow-hidden rounded-2xl md:ml-7 mt-7 container p-8">
      <motion.div className="hidden sm:block" variants={parentVariants} initial="initial" animate="animate">
        <motion.div variants={childrenVariants}>
          <ForecastBy12Days />
        </motion.div>
        <motion.div className="grid lg:grid-cols-7 lg:grid-rows-1 grid-rows-2 grid-cols-2  gap-5 mt-4" variants={childrenVariants}>
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
        </motion.div>
        <NewsSlider />
        <motion.div variants={childrenVariants}>
          <SimilarSites />
        </motion.div>
      </motion.div>


      <motion.div className="sm:hidden" variants={parentVariants} initial="initial" animate="animate">
        <motion.div className="mb-4" variants={childrenVariants}>
          <ForecastBy12Days />
        </motion.div>
        <motion.div className="mb-4" variants={childrenVariants}>
          <ForecastByhours />
        </motion.div>
        <motion.div className="mb-4" variants={childrenVariants}>
          <WindandPressure />
        </motion.div>
        <motion.div className="mb-4" variants={childrenVariants}>
          <AirPolution />
        </motion.div>
        <motion.div className="mb-4" variants={childrenVariants}>
          <Currency />
        </motion.div>
        <motion.div className="mb-4" variants={childrenVariants}>
          <NewsSlider />
        </motion.div>
        <motion.div className="mb-4" variants={childrenVariants}>
          <SimilarSites />
        </motion.div>
      </motion.div>

    </div>
  )
}
