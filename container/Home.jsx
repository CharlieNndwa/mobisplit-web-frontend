import dynamic from "next/dynamic";
const [
  Navbar,
  Hero,
  HireBicycle,
  AboutUsAndServices,
  DownloadAppSection,
  InsuranceSection,
  Request,
  Logistics,
  RiderFeatures,
  FooterView,
  Preloader,
] = [
  dynamic(() => import("container/Navbar")),
  dynamic(() => import("components/Home/Hero")),
  dynamic(() => import("components/Home/HireBicycle")),
  dynamic(() => import("components/Home/AboutUsAndServices")),
  dynamic(() => import("components/Home/DownloadAppSection")),
  dynamic(() => import("components/Home/InsuranceSection")),
  dynamic(() => import("components/Home/Request")),
  dynamic(() => import("components/Home/Logistics")),
  dynamic(() => import("components/Home/RiderFeatures")),
  dynamic(() => import("container/FooterView")),
  dynamic(() => import("components/Preloader/Preloader")),
];

export default function HomeView() {
  return (
    <>
      <Preloader />
      <Navbar />
      <Hero />
      <AboutUsAndServices />
      <DownloadAppSection />
      <InsuranceSection />
      <RiderFeatures />
      {/* <Request />
      <Logistics /> */}
      <FooterView />
    </>
  );
}
