export default function Introduction() {
  return (
    <header className="grid md:grid-cols-3 px-4 md:bg-new-bg md:bg-center md:bg-no-repeat md:bg-opacity-50 h-9vh">
      <div className="text-gray-600 w-full">
        <div className="text-left">
          <div className="flex text-center h-8vh">
            <div className="m-auto">
              {headlines.map((headline) => {
                return (
                  <p
                    key={headline}
                    className="text-xl sm:text-2xl md:text-3xl font-bold p-1"
                  >
                    {headline}
                  </p>
                );
              })}

              <div className="md:block m-3 md:m-6">
                {buttons.map((btn) => (
                  <button
                    key={btn}
                    className="bg-primary mb-2 md:mb-2 rounded-full text-white text-sm font-semibold px-2 md:px-4 py-1.5 md:py-3 uppercase mr-3"
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const buttons = ["Get Started", "Watch Tutorials"];
const headlines: string[] = [
  "Lend Money ✅ ",
  "Borrow Money ✅ ",
  "Within 24 Hours 😲 ",
];
