import Image from 'next/image'
import IndexPageSection from './IndexPageSection'

interface sponsorsProps {}

const Sponsors: React.FC<sponsorsProps> = ({}) => {
  return (
    <IndexPageSection title="Our Verified Sponsors">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {images &&
          images.map((img) => {
            return (
              <div className="p-2 md:pt-4 lg:pt-4 mt-3 md:mt-5 text-center" key={img.img}>
                <div className="flex justify-center items-center mb-2 md:mb-4">
                  <Image src={img.img} alt={`${img.img}`} width="200" height="200" className="object-contain"></Image>
                </div>
              </div>
            )
          })}
      </div>
    </IndexPageSection>
  )
}

const images = [
  {
    img: '/bkash.png'
  },
  {
    img: '/nogod.png'
  },
  {
    img: '/rocket.png'
  },
  {
    img: '/sure_cash_logo.png'
  }
]

export default Sponsors
