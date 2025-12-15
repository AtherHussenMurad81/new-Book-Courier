import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Newsletter = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section
      className="py-16 text-center bg-primary text-white px-4"
      data-aos="fade-up"
    >
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="zoom-in">
        📩 Subscribe to Our Newsletter
      </h2>

      {/* Subtitle */}
      <p
        className="mb-6 text-lg md:text-xl"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Get updates about new books and offers
      </p>

      {/* Input + Button */}
      <div
        className="flex flex-col sm:flex-row justify-center gap-2"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-64"
        />
        <button className="btn btn-secondary">Subscribe</button>
      </div>
    </section>
  );
};

export default Newsletter;
