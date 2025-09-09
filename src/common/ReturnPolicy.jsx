import Header from "../Header/header";
import Footer from "../Footer/footer";

export default function ReturnPolicy() {
    return (
        <div>
            <Header />
            <div className="max-w-7xl mx-auto px-0 py-12 text-gray-800">
                {/* Page Title */}
                <h1 className="text-3xl sm:text-4xl font-bold mb-6">
                    Returns, Replacement & Refunds
                </h1>

                <p className="text-gray-600 mb-4">
                    At eshopEasy, your satisfaction is our top priority. We understand that sometimes a product may not meet your expectations or arrive in perfect condition. That’s why we’ve created a straightforward return, replacement, and refund policy to ensure a hassle-free shopping experience.
                </p>
                <p className="text-gray-600 mb-6">
                    Please review our policy below for details on how to request a return, replacement, or refund.
                </p>

                <hr className="my-6" />

                {/* 1. Return Policy */}
                <h2 className="text-xl font-semibold mb-2">1. Return Policy</h2>
                <p className="mb-2">We accept returns under the following conditions:</p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                    <li>We must be intimated about return within <strong>3 days</strong> of delivery. Items must be returned within <strong>7–10 days</strong> of delivery.</li>
                    <li>Items must be in their <strong>original condition</strong>, unused, and in their original packaging (if applicable).</li>
                    <li>Certain items, such as clearance or final sale, are <strong>non-returnable</strong>.</li>
                </ul>
                <p className="mb-2">
                    To initiate a return, please contact our customer service team by Whatsapp on <span className="font-semibold">+91 XXXXXXXXXX</span> with your order number and details about the product you wish to return.
                </p>
                <p className="italic text-gray-600 mb-6">
                    Please note: Parcel opening video is compulsory. To process any claims or issues, a video of you opening the parcel is mandatory. Without this video, we will be unable to process any claims. Return shipping costs are the responsibility of the customer unless the product is defective, damaged, or incorrect.
                </p>

                <hr className="my-6" />

                {/* 2. Replacement Policy */}
                <h2 className="text-xl font-semibold mb-2">2. Replacement Policy</h2>
                <p className="mb-2">
                    If your item arrives damaged, defective, or incorrect, we’re happy to replace it at no additional cost.
                </p>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                    <li>You must report the issue within <strong>24 hours of delivery</strong> by Whatsapp on <span className="font-semibold">+91 XXXXXXXXXX</span> with:
                        <ul className="list-disc pl-6 mt-1 space-y-1">
                            <li>Your order number.</li>
                            <li>A brief description of the issue.</li>
                            <li>Parcel opening video.</li>
                        </ul>
                    </li>
                    <li>Photos of the damaged or incorrect item (if applicable).</li>
                    <li>Replacement will be shipped within 24 hours of approving replacement. Delivery takes 2–10 days depending on your location.</li>
                </ul>
                <p className="mb-6">Once verified, we will ship a replacement item to you as quickly as possible.</p>

                <hr className="my-6" />

                {/* 3. Refund Policy */}
                <h2 className="text-xl font-semibold mb-2">3. Refund Policy</h2>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                    <li>If you return an item in accordance with our Return Policy, a refund will be processed once we receive and inspect the returned product.</li>
                    <li>Refunds will be issued to the <strong>original payment method</strong>. Please allow <strong>5–7 business days</strong> for it to appear in your account after processing.</li>
                    <li>Refund will be processed within 24 hours of approving your complaints.</li>
                </ul>
                <p className="mb-6">
                    If your item is damaged, defective, or incorrect and you do not wish to receive a replacement, you may request a full refund instead.
                </p>

                <hr className="my-6" />

                {/* 4. Non-Returnable Items */}
                <h2 className="text-xl font-semibold mb-2">4. Non-Returnable/Non-Refundable Items</h2>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                    <li>Clearance or final sale items.</li>
                    <li>Customised Products.</li>
                    <li>Any item not in its original condition, damaged due to misuse, or missing parts.</li>
                </ul>

                <hr className="my-6" />

                {/* 5. Return Shipping Information */}
                <h2 className="text-xl font-semibold mb-2">5. Return Shipping Information</h2>
                <ul className="list-disc pl-6 mb-2 space-y-1">
                    <li>Customers are responsible for return shipping costs unless the return is due to a defective, damaged, or incorrect item.</li>
                    <li>All returns must be shipped by the customer to our warehouse address. <strong>Please note that we do not offer reverse pickup services.</strong></li>
                    <li>We recommend using a trackable shipping service to ensure your return is delivered to us.</li>
                    <li>
                        Our return address is: <span className="font-semibold">eshopEasy, Brindavan Colony, No: 2/119, Puducherry, India</span>. (Do not call on this number for your return inquiry, this is warehouse receiving only)
                    </li>
                </ul>

                <hr className="my-6" />

                {/* 6. How to Start */}
                <h2 className="text-xl font-semibold mb-2">6. How to Start a Return or Replacement Request</h2>
                <ol className="list-decimal pl-6 mb-6 space-y-1">
                    <li>Whatsapp us at <span className="font-semibold">+91 XXXXXXXXXX</span> with your order number, the product details, and the reason for the return or replacement.</li>
                    <li>Attach parcel opening video and relevant photos if the item is damaged or incorrect.</li>
                    <li>Our customer service team will review your request and provide instructions for the next steps.</li>
                </ol>

                <hr className="my-6" />

                {/* 7. Questions */}
                <h2 className="text-xl font-semibold mb-2">7. Questions or Concerns?</h2>
                <p className="mb-4">
                    If you have any questions about our return, replacement, or refund policy, feel free to Whatsapp us at <span className="font-semibold">+91 XXXXXXXXXX</span> or email us at{" "}
                    <a href="mailto:support@eshopeasy.com" className="text-blue-600 hover:underline">
                        support@eshopeasy.com
                    </a>. Our friendly customer service team is here to assist you!
                </p>
                <p className="text-gray-600">
                    Thank you for shopping with eshopEasy. We appreciate your business and are committed to making your experience as smooth and enjoyable as possible.
                </p>
            </div>
            <Footer />

        </div>
    );
}
