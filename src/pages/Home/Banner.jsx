// src/components/Home/Banner.jsx
import { Link } from "react-router";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Discover Your Next Book",
      desc: "Find thousands of books from trusted libraries near you.",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Fast & Reliable Delivery",
      desc: "Get your favorite books delivered to your doorstep.",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Trusted Library Owners",
      desc: "Buy books only from verified librarians.",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="relative w-full h-[520px] overflow-hidden rounded-xl">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {/* Gradient Overlay */}
          <div className="w-full h-full bg-gradient-to-r from-black/80 via-black/50 to-black/20 flex items-center">
            <div
              className="max-w-3xl ml-10 text-white space-y-6"
              data-aos="fade-up"
            >
              <h1
                className="text-4xl md:text-6xl font-bold leading-tight"
                data-aos="zoom-in"
              >
                {slide.title}
              </h1>
              <p
                className="text-lg md:text-xl opacity-90"
                data-aos="fade-right"
              >
                {slide.desc}
              </p>
              <div data-aos="fade-up">
                <Link to="/books" className="btn btn-primary btn-lg">
                  Browse All Books
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-20">
        <button
          onClick={() =>
            setCurrent(current === 0 ? slides.length - 1 : current - 1)
          }
          className="btn btn-circle bg-black/40 border-none text-white hover:bg-black"
        >
          ❮
        </button>
        <button
          onClick={() =>
            setCurrent(current === slides.length - 1 ? 0 : current + 1)
          }
          className="btn btn-circle bg-black/40 border-none text-white hover:bg-black"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Banner;
