export default function Introduction() {
  return (
    <header className="grid md:grid-cols-3 px-4 md:bg-new-bg md:bg-center md:bg-no-repeat md:bg-opacity-50 h-9vh">
      <div className="text-gray-600 w-full">
        <div className="text-left">
          {/* <h1 className="font-medium md:font-semibold text-3xl md:text-5xl text-center">
            The Best p2p lending platform in Bangladesh
          </h1> */}
          {/* <br />
          <p className="font-medium md:font-2xl text-xl md:text-4xl text-center">
            Lend and Borrow Money Anytime
          </p> */}
          <div className="flex text-center h-8vh">
            <div className="m-auto">
              <p className="text-3xl font-bold p-1">Lend Money ✅ </p>
              <p className="text-3xl font-bold p-1">Borrow Money ✅ </p>
              <p className="text-3xl font-bold p-1">Within 24 Hours 😲 </p>

              <div className="md:block m-3 md:m-6">
                {buttons.map((btn) => (
                  <button
                    key={btn}
                    className="bg-primary mb-2 md:mb-0 rounded-full text-white text-sm font-semibold md:text-lg px-2 md:px-4 py-1.5 md:py-3 uppercase mr-3"
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
