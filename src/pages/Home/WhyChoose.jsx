import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const WhyChoose = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  const features = [
    {
      id: 1,
      title: "📦 Fast Delivery",
      desc: "Get books delivered quickly from nearby libraries.",
    },
    {
      id: 2,
      title: "📚 Huge Collection",
      desc: "Thousands of books from different categories.",
    },
    {
      id: 3,
      title: "🔒 Trusted Sellers",
      desc: "Books provided by verified library owners.",
    },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4">
      {/* Title */}
      <div className="text-center mb-12" data-aos="fade-down">
        <h2 className="text-3xl md:text-4xl font-bold">
          ⭐ Why Choose BookCourier
        </h2>
        <p className="mt-2 text-gray-500 max-w-xl mx-auto">
          Learn why BookCourier is the best choice for book lovers
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className="card shadow-xl p-6"
            data-aos="zoom-in"
            data-aos-delay={index * 200} // staggered animation
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
