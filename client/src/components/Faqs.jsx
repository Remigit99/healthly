import { useState } from "react";

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is EchoMed?",
      answer:
        "EchoMed is a comprehensive health management platform designed to provide seamless care coordination and personalized health insights for patients and providers.",
    },
    {
      question: "How do I schedule an appointment on EchoMed?",
      answer:
        "You can schedule an appointment by navigating to the 'Appointments' section and selecting a available time slot.",
    },
    {
      question: "Is my child's health information secure on EchoMed?",
      answer:
        "Yes, EchoMed uses industry-standard encryption and security measures to protect your child's health information.",
    },
     {
      question: "What types of services does EchoMed provide?",
      answer:
        "EchoMed provides comprehensive pediatric healthcare specifically for infants, children, and adolescents. Our services include routine well-child checkups, developmental milestone tracking, immunizations, and treatment for common childhood illnesses.",
    },
     {
      question: "Can I use EchoMed for emergencies?",
      answer:
        "No. EchoMed is a diagnostic and screening service, not an emergency medical provider. If you are experiencing symptoms of a life-threatening emergency—such as severe chest pain, shortness of breath, or signs of a stroke—please call your local emergency number",
    },
    
  ];

  return (
    <section>
      <div className="container mx-auto px-24 py-16">
        <h1 className="text-h4 flex justify-center items-center font-semibold mb-8">Frequently Asked Questions</h1>

        <div className="mx-auto max-w-2xl md:max-w-3xl divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-sm">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div key={index} className="group">
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-5 text-left font-semibold text-gray-900 transition-colors hover:bg-gray-50"
                >
                  <span>{faq.question}</span>
                  {/* V4 dynamic rotation */}
                  <svg
                    className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* The "Smooth Slide" Grid Logic */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 text-gray-600 font-accent leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
