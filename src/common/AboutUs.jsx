import Header from "../Header/header";
import Footer from "../Footer/footer";

export default function AboutUs() {
    return (
        <div>
            <Header />
            <section className="px-6 md:px-16 py-12 max-w-5xl mx-auto text-gray-800">
                <h2 className="text-3xl font-bold text-center mb-10">About Us</h2>

                <div className="space-y-8">
                    {/* Section 1 */}
                    <div>
                        <h3 className="font-semibold text-lg">Our Journey Began in 2022</h3>
                        <p className="mt-2 leading-relaxed">
                            After carefully exploring the market, we launched <span className="font-bold">eshopEasy</span> under{" "}
                            <span className="font-bold">aahaSolutions</span> with a clear mission: to offer high-quality products at unbeatable
                            prices, making it easier for you to upgrade your home without breaking the bank. Since our inception, we’ve been
                            dedicated to revolutionizing the way you shop for everyday essentials, bringing together affordability and quality
                            in one place.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <h3 className="font-semibold text-lg">A Perfect Fit for Your Everyday Life</h3>
                        <p className="italic text-gray-600">Crafted to Meet Your Needs</p>
                        <p className="mt-2 leading-relaxed">
                            At <span className="font-bold">eshopEasy</span>, we pride ourselves on curating a diverse selection of products
                            that cater to your daily needs. Whether you’re looking for the latest gadgets, stylish accessories, practical
                            kitchen tools, or beautiful home décor, our collection is designed to make life simpler and more enjoyable. We
                            believe that everyone deserves access to premium products that enhance their lifestyle, which is why we’re
                            committed to offering a wide variety of items that combine style, functionality, and affordability.
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div>
                        <h3 className="font-semibold text-lg">Simplicity in Design & Function</h3>
                        <p className="italic text-gray-600">And We’re Just Getting Started</p>
                        <p className="mt-2 leading-relaxed">
                            Customer satisfaction is at the core of everything we do. We are constantly on the lookout for the latest trends
                            and innovations to bring you the best products at the best prices. At{" "}
                            <span className="font-bold">eshopEasy</span>, you can shop with confidence, knowing that you’re getting outstanding
                            value without sacrificing quality.
                        </p>
                        <p className="mt-4 leading-relaxed">
                            Join us as we continue our journey to transform your shopping into an experience of comfort, style, and
                            convenience – all while keeping your budget intact. Experience the difference at{" "}
                            <span className="font-bold">eshopEasy</span>, where affordability meets excellence.
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
