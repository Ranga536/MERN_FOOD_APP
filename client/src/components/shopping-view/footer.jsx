import Logo from "../../assets/Delbite Logo.jpg";

const FooterInfo = () => {
  const links = [
    {
      label: "Youtube",
      url: "https://www.youtube.com/@InfoshareHub-q5k",
      imgSrc:
        "https://th.bing.com/th/id/OIP.BYE4MH1YZLg-D71PWB6MjwHaHa?w=512&h=512&rs=1&pid=ImgDetMain",
      imgAlt: "Youtube Icon",
    },
    {
      label: "Instagram",
      url: "https://www.instagram.com/delbite_official",
      imgSrc:
        "https://logodownload.org/wp-content/uploads/2017/04/instagram-logo-6.png",
      imgAlt: "Instagram Icon",
    },
    {
      label: "Whatsapp",
      url: "https://wa.me/+919515836496",
      imgSrc:
        "https://th.bing.com/th/id/OIP.qeBL7LoMSOxJnY_hd_ZOZgHaHc?rs=1&pid=ImgDetMain",
      imgAlt: "Whatsapp Icon",
    },
    {
      label: "Gmail",
      url: "https://mail.google.com/mail/?view=cm&fs=1&to=teamnr.contact.@gmail.com",
      imgSrc:
        "https://th.bing.com/th/id/OIP.loCwsn7u3iAGhlFClCumdgHaHa?rs=1&pid=ImgDetMain",
      imgAlt: "Gmail Icon",
    },
  ];

  return (
    <footer className="text-gray-300 font-[Poppins] bg-gray-900">
      <div className="container px-5 py-16 mx-auto flex flex-col md:flex-row md:flex-nowrap md:items-start items-center">
        <div className="w-64 flex-shrink-0 text-center md:text-left mb-8 md:mb-0">
          <a className="flex title-font font-semibold items-center justify-center md:justify-start text-white">
            <img
              src={Logo}
              alt="Delbite Logo"
              className="w-[80px] h-[80px] rounded-lg shadow-md"
            />
            <span className="ml-3 text-2xl tracking-wide">Delbite</span>
          </a>
          <p className="mt-3 text-sm text-gray-400 italic">
            You crave it. We deliver it — fast and fresh!
          </p>
        </div>

        <div className="flex-grow flex flex-wrap md:pl-20 text-center md:text-left">
          <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-10">
            <h2 className="text-gray-100 text-lg font-semibold mb-4 underline underline-offset-4">
              Catch Us on Social Media
            </h2>
            <nav className="list-none space-y-3">
              {links.map(({ label, url, imgSrc, imgAlt }, idx) => (
                <li key={idx}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    // className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                    className="flex items-center transition duration-300 transform hover:scale-105 hover:text-white"
                  >
                    <img
                      src={imgSrc}
                      alt={imgAlt}
                      className="w-5 h-5 mr-2 rounded-full shadow-md"
                    />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="bg-gray-800">
        <div className="container mx-auto py-4 px-5 flex flex-col sm:flex-row justify-center sm:justify-between items-center">
          <p className="text-gray-400 text-sm text-center sm:text-left">
            © 2025 Delbite {" "}
            {/* <a
              href="#"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white font-medium ml-1"
            >
              @developer
            </a> */}
          </p>
        </div>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-yellow-500 hover:bg-yellow-600 text-black p-3 rounded-full shadow-lg transition-transform hover:scale-110 z-50"
      >
        ↑
      </button>
    </footer>
  );
};

export default FooterInfo;
