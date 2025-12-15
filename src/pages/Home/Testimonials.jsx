import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Testimonials = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  const testimonials = [
    {
      id: 1,
      text: "Amazing service and fast delivery!",
      author: "Rahim",
    },
    {
      id: 2,
      text: "Best platform for book lovers.",
      author: "Karim",
    },
    {
      id: 3,
      text: "Easy ordering and trusted libraries.",
      author: "Ayesha",
    },
  ];

  return (
    <section className="py-16 bg-base-200 px-4">
      {/* Section Title */}
      <div className="text-center mb-12" data-aos="fade-down">
        <h2 className="text-3xl md:text-4xl font-bold">
          💬 What Our Users Say
        </h2>
        <p className="mt-2 text-gray-500 max-w-xl mx-auto">
          Hear from our happy customers
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((item, index) => (
          <div
            key={item.id}
            className="card p-6 shadow-md"
            data-aos="fade-up"
            data-aos-delay={index * 200} // staggered animation
          >
            <p className="text-gray-700">"{item.text}"</p>
            <h4 className="mt-4 font-semibold">— {item.author}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
