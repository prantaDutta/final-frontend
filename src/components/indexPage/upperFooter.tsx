import IndexPageSection from "./IndexPageSection";

interface upperFooterProps {}

const UpperFooter: React.FC<upperFooterProps> = ({}) => {
  return (
    <IndexPageSection title="Connect With Us">
      <div className="flex justify-center items-center py-6">
        <svg
          width="48"
          height="48"
          className="ml-3 md:ml-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24z"
            fill="#3B5998"
          />
          <path
            d="M26.502 38.111V25.054h3.604l.478-4.5h-4.082l.006-2.252c0-1.173.111-1.802 1.797-1.802h2.253V12h-3.605c-4.33 0-5.854 2.183-5.854 5.854v2.701H18.4v4.5h2.7V38.11H26.5z"
            fill="#fff"
          />
        </svg>
        <svg
          width="48"
          height="48"
          className="ml-3 md:ml-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24z"
            fill="#55ACEE"
          />
          <path
            d="M23.281 19.508l.05.83-.839-.102c-3.055-.39-5.724-1.712-7.99-3.932l-1.109-1.101-.285.813c-.604 1.814-.218 3.729 1.04 5.017.672.712.521.813-.637.39-.403-.136-.756-.238-.79-.187-.117.119.286 1.661.605 2.271.437.848 1.326 1.678 2.3 2.17l.823.39-.974.016c-.94 0-.974.017-.873.373.336 1.102 1.662 2.271 3.14 2.78l1.04.356-.906.542a9.45 9.45 0 01-4.5 1.254c-.755.017-1.376.085-1.376.136 0 .17 2.048 1.118 3.24 1.491 3.576 1.102 7.823.627 11.013-1.254 2.266-1.339 4.532-4 5.59-6.576.57-1.373 1.141-3.881 1.141-5.084 0-.78.05-.882.99-1.814.555-.542 1.075-1.135 1.176-1.305.168-.322.151-.322-.705-.034-1.427.509-1.629.441-.923-.322.52-.542 1.141-1.525 1.141-1.813 0-.05-.252.034-.537.186-.302.17-.974.424-1.477.577l-.907.288-.823-.56c-.453-.305-1.09-.644-1.426-.745-.857-.238-2.166-.204-2.938.068-2.099.762-3.425 2.728-3.274 4.88z"
            fill="#fff"
          />
        </svg>
        <svg
          width="48"
          height="48"
          className="ml-3 md:ml-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24z"
            fill="#0077B5"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.319 14.823c0 1.569-1.181 2.824-3.078 2.824h-.035c-1.825 0-3.006-1.255-3.006-2.824C11.2 13.22 12.416 12 14.277 12c1.86 0 3.007 1.22 3.042 2.823zm-.358 5.055V36.22h-5.44V19.878h5.44zM36.575 36.22v-9.37c0-5.02-2.683-7.356-6.262-7.356-2.888 0-4.18 1.586-4.902 2.699v-2.315h-5.44c.072 1.534 0 16.342 0 16.342h5.44v-9.127c0-.488.035-.975.179-1.325.393-.976 1.288-1.986 2.79-1.986 1.97 0 2.757 1.499 2.757 3.695v8.743h5.438z"
            fill="#fff"
          />
        </svg>
        <svg
          width="48"
          height="48"
          className="ml-3 md:ml-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 75.8 74.9"
        >
          <radialGradient
            id="a"
            cx=".583"
            cy="73.079"
            r="132.615"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#f4ec55" />
            <stop offset=".241" stopColor="#e48242" />
            <stop offset=".346" stopColor="#d66863" />
            <stop offset=".442" stopColor="#cd4f74" />
            <stop offset=".489" stopColor="#c94379" />
            <stop offset="1" stopColor="#3f56a6" />
          </radialGradient>
          <path
            fill="url(#a)"
            d="M38.2 72.8c-19.8 0-35.8-16-35.8-35.8 0-19.8 16.1-35.9 35.9-35.9C58 1.1 74.1 17.2 74.1 37c0 19.8-16.1 35.8-35.9 35.8z"
          />
          <g fill="#FFF">
            <path d="M38.2 20.9c5.3 0 5.9 0 7.9.1 1.9.1 3 .4 3.7.7.9.4 1.6.8 2.3 1.5.7.7 1.1 1.3 1.5 2.3.3.7.6 1.7.7 3.7.1 2.1.1 2.7.1 7.9 0 5.3 0 5.9-.1 7.9-.1 1.9-.4 3-.7 3.7-.4.9-.8 1.6-1.5 2.3-.7.7-1.3 1.1-2.3 1.5-.7.3-1.7.6-3.7.7-2.1.1-2.7.1-7.9.1-5.3 0-5.9 0-7.9-.1-1.9-.1-3-.4-3.7-.7-.9-.4-1.6-.8-2.3-1.5-.7-.7-1.1-1.3-1.5-2.3-.3-.7-.6-1.7-.7-3.7-.1-2.1-.1-2.7-.1-7.9 0-5.3 0-5.9.1-7.9.1-1.9.4-3 .7-3.7.4-.9.8-1.6 1.5-2.3.7-.7 1.3-1.1 2.3-1.5.7-.3 1.7-.6 3.7-.7 2.1-.1 2.7-.1 7.9-.1m0-3.6c-5.3 0-6 0-8.1.1-2.1.1-3.5.4-4.8.9-1.3.5-2.4 1.2-3.5 2.3-1.1 1.1-1.8 2.2-2.3 3.5-.5 1.3-.8 2.7-.9 4.8-.1 2.1-.1 2.8-.1 8.1s0 6 .1 8.1c.1 2.1.4 3.5.9 4.8.5 1.3 1.2 2.4 2.3 3.5 1.1 1.1 2.2 1.8 3.5 2.3 1.3.5 2.7.8 4.8.9 2.1.1 2.8.1 8.1.1s6 0 8.1-.1c2.1-.1 3.5-.4 4.8-.9 1.3-.5 2.4-1.2 3.5-2.3 1.1-1.1 1.8-2.2 2.3-3.5.5-1.3.8-2.7.9-4.8.1-2.1.1-2.8.1-8.1s0-6-.1-8.1c-.1-2.1-.4-3.5-.9-4.8-.5-1.3-1.2-2.4-2.3-3.5-1.1-1.1-2.2-1.8-3.5-2.3-1.3-.5-2.7-.8-4.8-.9-2-.1-2.7-.1-8.1-.1" />
            <path d="M38.2 26.9c-5.6 0-10.1 4.5-10.1 10.1s4.5 10.1 10.1 10.1S48.3 42.6 48.3 37s-4.5-10.1-10.1-10.1m0 16.6c-3.6 0-6.6-2.9-6.6-6.6 0-3.6 2.9-6.6 6.6-6.6 3.6 0 6.6 2.9 6.6 6.6 0 3.7-2.9 6.6-6.6 6.6M51.1 26.5c0 1.3-1.1 2.4-2.4 2.4-1.3 0-2.4-1.1-2.4-2.4 0-1.3 1.1-2.4 2.4-2.4 1.3 0 2.4 1.1 2.4 2.4" />
          </g>
        </svg>
        <svg
          width="48"
          height="48"
          className="ml-3 md:ml-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24z"
            fill="red"
          />
          <path
            d="M36.265 18.073c-.294-1.13-1.162-2.021-2.263-2.324C32.005 15.2 24 15.2 24 15.2s-8.005 0-10.002.55c-1.101.302-1.969 1.192-2.263 2.323-.535 2.05-.535 6.327-.535 6.327s0 4.277.535 6.327c.294 1.13 1.162 2.021 2.263 2.324C15.995 33.6 24 33.6 24 33.6s8.005 0 10.002-.55c1.101-.302 1.969-1.192 2.263-2.323.535-2.05.535-6.327.535-6.327s0-4.277-.535-6.327z"
            fill="#fff"
          />
          <path d="M21.6 28.8v-8l6.4 4-6.4 4z" fill="red" />
        </svg>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center pt-5 grid-gap-2">
        <div className="mt-4 sm:mt-3 px-4 md:mt-0">
          <h4 className="font-semibold md:font-semibold text-xl md:text-base">
            GrayScale
          </h4>
          <p className="text-md font-base mt-2">
            GrayScale is one of the fastest growing peer to peer (P2P) lending
            platforms in Bangladesh. It connects investors or lenders looking
            for high returns with creditworthy borrowers looking for short term
            personal loans.
          </p>
        </div>
        <div className="mt-4 sm:mt-3 px-4 md:mt-0">
          <h4 className="font-semibold md:font-semibold text-xl md:text-base">
            Quick Links
          </h4>
          <div className="text-md font-base mt-2">
            {quickLinks &&
              quickLinks.map((link) => {
                return (
                  <div
                    className="flex my-1.5 justify-center items-center"
                    key={link.title}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <p>{link.title}</p>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="mt-4 sm:mt-3 px-4 md:mt-0">
          <h4 className="font-semibold md:font-semibold text-xl md:text-base">
            Address
          </h4>

          <div className="flex my-3 justify-center items-center">
            <svg
              className="w-4 h-4 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p>Chattogram, Bangladesh</p>
          </div>
          <div className="flex my-3 justify-center items-center">
            <svg
              className="w-4 h-4 mr-3 mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <p>grayscale.inc.bd@gmail.com</p>
          </div>
          <div className="flex my-3 justify-center items-center">
            <svg
              className="w-4 h-4 mr-3 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <p>018XX-XXXXXX</p>
          </div>
          <div className="flex my-3 justify-center items-center">
            <svg
              className="w-4 h-4 mr-3 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <p>017XX-XXXXXX</p>
          </div>
        </div>
        <div className="mt-4 sm:mt-3 px-4 md:mt-0 font-normal">
          <h4 className="font-semibold md:font-semibold text-xl md:text-base">
            Subscribe
          </h4>
          <p className="text-md font-base mt-2">
            Subscribe to our newsletter for latest updates
          </p>
          <div className="mt-2 flex justify-center items-center">
            <svg
              className="w-6 h-6 mr-3 mt-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <input
              type="text"
              placeholder="Enter Your Email"
              className="bg-transparent border-b-2 border-gray-600 px-4 py-1"
            />
          </div>
          <button className="px-4 py-1 rounded-xl mt-2 bg-primary text-white hover:bg-primaryAccent">
            Subscribe
          </button>
        </div>
      </div>
    </IndexPageSection>
  );
};

const quickLinks = [
  {
    title: "Lend Now",
  },
  {
    title: "Borrow Now",
  },
  {
    title: "FAQ",
  },
  {
    title: "Contact Us",
  },
  {
    title: "About Us",
  },
];

export default UpperFooter;
