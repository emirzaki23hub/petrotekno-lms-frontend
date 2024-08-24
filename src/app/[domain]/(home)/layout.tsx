import CarouselIndex from "./Carousel";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="fixed inset-0  flex flex-col min-h-screen">
      <CarouselIndex />
      <div className="relative max-lg:h-full max-lg:overflow-y-auto z-[2]">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
