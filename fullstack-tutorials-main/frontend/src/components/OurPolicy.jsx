import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';

const OurPolicy = () => {

  const { logoAndIcons } = useContext(ShopContext);

  const heroImage = (logoAndIcons && Array.isArray(logoAndIcons.data))
      ? logoAndIcons.data.map(record => record.imageUrl)
      : [];  

  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>

      <div>
        <img className='w-12 m-auto mb-5' src={heroImage[15]} alt="" />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer hassle free  exchange policy</p>
      </div>
      <div>
        <img className='w-12 m-auto mb-5' src={heroImage[4]} alt="" />
        <p className='font-semibold'>7 Days Return Policy</p>
        <p className='text-gray-400'>We provide 7 days free return policy </p>
      </div>
      <div>
        <img className='w-12 m-auto mb-5' src={heroImage[16]} alt="" />
        <p className='font-semibold'>Best customer support</p>
        <p className='text-gray-400'>we provide 24/7 customer support</p>
      </div>

    </div>
  )
}

export default OurPolicy
