import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Books from "../../components/Home/Books";

const LatestBooks = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4">
      {/* Title */}
      <div className="text-center mb-10" data-aos="fade-down">
        <h2 className="text-3xl md:text-4xl font-bold">📘 Latest Books</h2>
        <p className="mt-2 text-gray-500">
          Discover the newest books added by our library partners
        </p>
      </div>

      {/* Books Wrapper with valid animation */}
      <div data-aos="slide-up" data-aos-delay="300">
        <Books limit={6} />
      </div>
    </section>
  );
};

export default LatestBooks;
