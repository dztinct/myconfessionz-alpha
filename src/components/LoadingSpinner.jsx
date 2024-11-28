import { motion } from "motion/react"
import logo from '../images/myconfessionz.png'

const LoadingSpinner = () => {
  return (
    // <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald flex items-center justify-center relative overflow-hidden">
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Simple Loading Spinner */}
        {/* <motion.div
            className="w-16 h-16 border-4 border-t-4 border-t-green-500  border-green-200 rounded-full"
            animate= {{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
         */}
        <img src={logo} alt="" 
        className="w-16 h-16 border-4 border-t-4 border-t-bRed border-bRed rounded-full"
        animate= {{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      
    </div>
  )
}

export default LoadingSpinner
