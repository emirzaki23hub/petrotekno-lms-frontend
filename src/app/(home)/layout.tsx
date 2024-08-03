import dynamic from "next/dynamic";
// import CarouselIndex from "./Carousel";

const CarouselIndex = dynamic(() => import("./Carousel"), {
  loading: () => <div className="h-screen bg-primary-100"></div>,
});

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="fixed inset-0  flex flex-col overflow-hidden">
      <CarouselIndex />
      <div className="relative z-[2]">{children}</div>
    </div>
  );
};

export default AuthLayout;
