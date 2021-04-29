import IndexPageSection from "./IndexPageSection";
import React from "react";

interface provideInvestorsProps {}

const ProvideInvestors: React.FC<provideInvestorsProps> = ({}) => {
  return (
    <IndexPageSection title="Our Investors Get">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {investors &&
          investors.map((investor) => {
            return (
              <div
                className="bg-gray-200 text-gray-700 shadow-md p-3 md:p-5 mt-10 text-center cursor-pointer rounded-md hover:shadow-2xl transition-css"
                key={investor.title}
              >
                <p className="font-semibold text-2xl">{investor.title}</p>
                <p className="font-normal text-lg mt-5">{investor.content}</p>
              </div>
            );
          })}
      </div>
    </IndexPageSection>
  );
};

const investors = [
  {
    title: "Verified Borrowers",
    content:
      "Need not worry about your finances, LDC follows a 5 step LenDen screening mechanism which ensures lesser defaults and easy tracing of borrowers. “Click here” to understand the 5 step process in detail.",
  },
  {
    title: "Solid Returns",
    content:
      "The average Rate of Interest offered to borrowers is 28% p.a. However, 15% – 17% p.a is the net returns after adjustment of defaulted borrowers and the platform fees. “Learn more” to earn more.",
  },
  {
    title: "Diversified Investment",
    content:
      "It’s simpler to get started with a minimal investment of Rs.500 and the porfolio is better managed when your investment is spread across multiple borrowers. “Find out more“",
  },
  {
    title: "Monthly Cash Flow",
    content:
      "Monthly returns, are collected in an ESCROW account through auto-debit. Unlike other traditional investing instruments, cash flow starts immediately after the investment. “Know more“",
  },
];

export default ProvideInvestors;
