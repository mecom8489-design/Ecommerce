import { useState } from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { useNavigate } from "react-router-dom";

const faqs = [
    {
        category: "Shipping Information",
        questions: [
            {
                q: "What are your shipping charges?",
                a: "We offer free shipping on most orders above a minimum purchase amount. For smaller orders, a nominal shipping fee may apply.",
            },
            {
                q: "How long will it take for my order to be delivered?",
                a: "Orders are usually delivered within 5–7 business days depending on your location and courier availability.",
            },
            {
                q: "How do I track my order?",
                a: "Once your order is shipped, we will send you a tracking link via email and SMS. You can also track it from your account’s order section.",
            },
            {
                q: "Do you offer Cash on Delivery (COD)?",
                a: "Yes, we offer COD on selected products and pincodes. Availability will be shown at checkout.",
            },
            {
                q: "What should I do if my package is delayed?",
                a: "If your package is delayed beyond the estimated delivery date, please contact our support team for assistance.",
            },
            {
                q: "What should I do if my order status shows 'delivered,' but I haven’t received it?",
                a: "In such cases, kindly check with neighbors/security first. If not found, contact us within 48 hours so we can escalate with the courier.",
            },
            {
                q: "What if my package arrives damaged or with missing items?",
                a: "Please take photos of the package and contact us within 48 hours. We will arrange a replacement or refund based on the issue.",
            },
            {
                q: "How do I contact customer support for shipping queries?",
                a: "You can reach our customer support via email, live chat, or by calling our helpline number mentioned on the Contact Us page.",
            },
        ],
    },
    {
        category: "Payment Information",
        questions: [
            {
                q: "What payment methods do you accept?",
                a: "We accept Credit/Debit Cards, UPI, Net Banking, Wallets, and Cash on Delivery (COD).",
            },
            {
                q: "Is COD (Cash on Delivery) available for all orders?",
                a: "COD is available for most products but may not be available in certain locations or for high-value orders.",
            },
            {
                q: "Are my payment details secure on your website?",
                a: "Yes, we use SSL encryption and trusted payment gateways to keep your payment information secure.",
            },
            {
                q: "How do I use a coupon or discount code?",
                a: "You can apply your coupon code during checkout in the 'Apply Coupon' section before making payment.",
            },
            {
                q: "What should I do if my payment fails?",
                a: "If your payment fails, please retry after checking your details. If the issue persists, try another payment method.",
            },
            {
                q: "How do I know if my payment was successful?",
                a: "You will receive an order confirmation email and SMS once your payment is successful.",
            },
            {
                q: "What happens if my payment fails but the amount is debited from my account?",
                a: "In such cases, the amount is usually reversed within 5–7 business days. If not, please contact our support team with transaction details.",
            },
            {
                q: "Who can I contact if I have payment-related questions?",
                a: "You can contact our payment support team via email or live chat for assistance with payment issues.",
            },
        ],
    },
    {
        category: "Order Returns & Cancellation",
        questions: [
            {
                q: "Can I cancel my order after placing it?",
                a: "Yes, you can cancel your order before it is shipped. Once shipped, cancellation is not possible.",
            },
            {
                q: "Are there any cancellation charges?",
                a: "No, we do not charge any cancellation fees for orders canceled before shipping.",
            },
            {
                q: "How will I get my refund after canceling an order?",
                a: (
                    <div>
                        <p>
                            For canceled orders, the refund will be processed to your original payment method:
                        </p>
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                            <li>
                                <strong>Online Payments (Credit/Debit Card, UPI, Net Banking):</strong>{" "}
                                Refunds typically take 5–7 business days to reflect in your account.
                            </li>
                            <li>
                                <strong>Cash on Delivery (COD):</strong> If you paid using COD, your refund will be processed
                                to your bank account or as store credit. We may request your bank details.
                            </li>
                            <li>
                                <strong>Wallet/Store Credit:</strong> Refunds will be credited back to your wallet or store credit balance immediately.
                            </li>
                        </ul>
                    </div>
                ),
            },
            {
                q: "What is your return policy?",
                a: "You can return items within 7 days of delivery as long as they are unused and in their original packaging.",
            },
            {
                q: "What if I receive a damaged or defective product?",
                a: "Please raise a return request within 48 hours of delivery, along with images of the product. We will arrange a replacement or refund.",
            },
            {
                q: "Are all products eligible for return?",
                a: "No, certain items like innerwear, personal care, and perishable goods are not eligible for return due to hygiene reasons.",
            },
        ],
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);
    const navigate = useNavigate();

    const toggle = (i) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <div>
            <Header />
            <section className="px-4 sm:px-6 md:px-12 py-10 max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10">
                    FAQs
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* FAQ Left */}
                    <div className="lg:col-span-2 space-y-8">
                        {faqs.map((faqGroup, groupIndex) => (
                            <div key={groupIndex}>
                                <h3 className="text-lg sm:text-xl font-bold mb-4 border-l-4 border-black pl-3 bg-gray-100 py-1 rounded">
                                    {faqGroup.category}
                                </h3>
                                <div className="divide-y">
                                    {faqGroup.questions.map((item, i) => {
                                        const index = `${groupIndex}-${i}`;
                                        return (
                                            <div key={index} className="py-3">
                                                <button
                                                    className="w-full flex justify-between items-center text-left font-medium text-base sm:text-lg"
                                                    onClick={() => toggle(index)}
                                                >
                                                    {item.q}
                                                    <span className="ml-2 text-xl">
                                                        {openIndex === index ? "−" : "+"}
                                                    </span>
                                                </button>
                                                {openIndex === index && (
                                                    <div className="mt-2 text-gray-600 text-sm sm:text-base leading-relaxed">
                                                        {item.a}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Box Right */}
                    <div className="bg-gray-50 rounded-lg p-4 shadow-md lg:self-start text-center">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 border-l-4 border-black pl-3 text-left">
                            Have a question?
                        </h3>
                        <p className="text-gray-600 mb-3 text-sm sm:text-base">
                            If you have an issue or question that requires immediate
                            assistance, you can click the button below to chat live with a
                            Customer Service representative.
                        </p>
                        <p className="text-gray-600 mb-4 text-sm sm:text-base">
                            Please allow <strong>06 – 12 business days</strong> from the time
                            your package arrives back to us for a refund to be issued.
                        </p>
                        <div className="flex justify-center">
                            <button
                                className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 cursor-pointer"
                                onClick={() => navigate("/contactUs")}
                            >
                                Contact us
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
