import Banner from "./Banner";
import Coverage from "./Coverage";
import LatestBooks from "./LatestBooks";
import Newsletter from "./Newsletter";
import Testimonials from "./Testimonials";
import WhyChoose from "./WhyChoose";

const Home = () => {
  return (
    <div>
      <Banner />
      <LatestBooks />
      <Coverage />
      <WhyChoose />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
