import { getMe } from "@/services/getMe";
import Hero from "./_components/Hero";
import PopularIndustries from "./_components/PopularIndustries";
import HowItWorks from "./_components/HowItWorks";
import FeaturedServices from "./_components/FeaturedServices";
import TopRatedTechnicians from "./_components/TopRatedTechnicians";
import WhyChooseFixItNow from "./_components/WhyChooseFixItNow";
import BookingProcessTimeline from "./_components/BookingProcessTimeline";
import CustomerReviews from "./_components/CustomerReviews";
import PlatformStatistics from "./_components/PlatformStatistics";
import BecomeTechnician from "./_components/BecomeTechnician";
import FAQSection from "./_components/FAQSection";
import FinalCTA from "./_components/FinalCTA";
import HeroCarousel from "./_components/HeroCarousel";

export default  async function Home() {

  const user = await getMe();
  // console.log(user)

  return (
<div>
  {/* <Hero/> */}
  <HeroCarousel/>
  <PopularIndustries/>
  <HowItWorks/>
  <FeaturedServices/>
  <TopRatedTechnicians/>
  <WhyChooseFixItNow/>
  <BookingProcessTimeline/>
  <CustomerReviews/>
  <PlatformStatistics/>
  <BecomeTechnician/>
  <FAQSection/>
  <FinalCTA/>
</div>
  );
}
