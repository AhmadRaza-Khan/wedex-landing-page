import { useEffect, useState } from "react";

const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const carouselData = [

    {
      "id": 1,
      "image": "/1.png",
      "text": "Getting started is easy and in under 10 minutes you can have an app ready for your business"
    },
    {
      "id": 2,
      "image": "/2.png",
      "text": "Build your datasets with ease, it’s just a couple of clicks"
    },
    {
      "id": 3,
      "image": "/3.png",
      "text": "Add the data fields you want to store in your table"
    },
    {
      "id": 4,
      "image": "/4.png",
      "text": "Start adding the data from your business"
    },
    {
      "id": 5,
      "image": "/5.png",
      "text": "Access and Visualize your data"
    }
  ]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % carouselData.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="mx-auto w-[65%]">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {carouselData.map((item: any) => (
            <div
              key={item.id}
              className="w-full flex-shrink-0 flex flex-col items-center"
            >
              <img
                src={item.image}
                className="w-full object-contain"
                alt={`Slide ${item.id + 1}`}
              />
              <p className="text-center text-[1rem] md:text-[1.6rem] lg:text-[2rem] text-white mt-4">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
