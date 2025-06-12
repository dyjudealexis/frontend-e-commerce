// components/Banner.tsx
import Image from 'next/image';

const Banner: React.FC = () => {
  return (
    <div className="banner">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="banner__pic">
              <Image 
                src="/img/banner/banner-1.jpg" 
                alt="Banner 1" 
                width={500} 
                height={300} 
                layout="responsive"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="banner__pic">
              <Image 
                src="/img/banner/banner-2.jpg" 
                alt="Banner 2" 
                width={500} 
                height={300} 
                layout="responsive"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
