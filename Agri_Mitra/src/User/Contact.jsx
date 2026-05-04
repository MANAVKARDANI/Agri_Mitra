import contactImg from "../assets/Hero_shop.png";

export default function Contact() {
  return (
    <div className="bg-white text-slate-800">
      {/* MAIN SECTION */}
      <main className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* LEFT IMAGE */}
        <div className="relative lg:w-[40%] min-h-[400px] lg:min-h-full overflow-hidden">
          <img
            src={contactImg}
            alt="plant"
            className="absolute inset-0 w-full h-full object-cover transition duration-700 hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>

          {/* CONTACT CARD */}
          <div className="absolute inset-0 flex items-center justify-center lg:justify-end px-6 lg:pr-12">
            <div className="bg-[#0D2B10] text-white p-10 lg:p-12 rounded-2xl shadow-2xl max-w-sm w-full lg:translate-x-24 transition hover:scale-[1.04] hover:shadow-3xl">
              <h2 className="text-3xl mb-8 border-b border-white/10 pb-4">
                Our Presence
              </h2>

              <div className="space-y-8">
                {/* LOCATION */}
                <div className="flex gap-4 hover:translate-x-1 transition">
                  <span className="material-symbols-outlined text-yellow-400">
                    location_on
                  </span>

                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">
                      Location
                    </h4>

                    <p className="text-sm text-slate-200">
                      RK UNIVERSITY RAJKOT
                      <br />
                      360020 GUJARAT, INDIA
                    </p>
                  </div>
                </div>

                {/* PHONE */}
                <div className="flex gap-4 hover:translate-x-1 transition">
                  <span className="material-symbols-outlined text-yellow-400">
                    phone_iphone
                  </span>

                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">
                      Direct Line
                    </h4>

                    <p className="text-sm text-slate-200">+91 9325865449</p>

                    <p className="text-xs text-slate-400 mt-1">
                      Mon-Fri, 9am – 10pm
                    </p>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex gap-4 hover:translate-x-1 transition">
                  <span className="material-symbols-outlined text-yellow-400">
                    mail
                  </span>

                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">
                      Support
                    </h4>

                    <p className="text-sm text-slate-200">
                      contact@agri-mitra.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="lg:w-[60%] bg-white flex items-center py-20">
          <div className="max-w-2xl mx-auto w-full px-8 lg:pl-32 lg:pr-20">
            <span className="text-yellow-600 font-bold text-xs uppercase tracking-[0.3em] block mb-4">
              Connect With Us
            </span>

            <h1 className="text-5xl lg:text-6xl text-slate-900 mb-6 font-serif">
              Get In Touch
            </h1>

            <p className="text-slate-500 leading-relaxed max-w-lg">
              Have questions about our agri-tech solutions? Reach out and our
              team of experts will respond within 24 hours.
            </p>

            {/* FORM */}
            <form className="mt-12 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border-b border-green-900/30 py-3 focus:outline-none focus:border-green-800 transition duration-300 hover:border-green-600"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="border-b border-green-900/30 py-3 focus:outline-none focus:border-green-800 transition duration-300 hover:border-green-600"
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                className="w-full border-b border-green-900/30 py-3 focus:outline-none focus:border-green-800 transition duration-300 hover:border-green-600"
              />

              <textarea
                rows="4"
                placeholder="Tell us more about your inquiry"
                className="w-full border-b border-green-900/30 py-3 focus:outline-none focus:border-green-800 transition duration-300 hover:border-green-600"
              ></textarea>

              {/* BUTTON */}
              <button
                type="submit"
                className="bg-green-800 hover:bg-green-900 text-white px-12 py-5 rounded-full font-bold flex items-center gap-3 transition duration-300 hover:shadow-2xl hover:scale-105"
              >
                <span className="uppercase text-xs tracking-widest">
                  Send Message
                </span>

                <span className="material-symbols-outlined text-sm transition group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* NEWSLETTER */}
      <section className="bg-[#F1F8F4] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl text-slate-900 mb-2 font-serif hover:text-green-800 transition">
            Join our Newsletter
          </h2>

          <p className="text-slate-500 mb-10 text-sm">
            Stay updated with the latest fertilizer stock alerts and agri-tech
            insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow rounded-full border px-6 py-4 focus:ring-2 focus:ring-green-800 outline-none transition"
            />

            <button className="bg-green-800 hover:bg-green-900 text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition hover:shadow-xl hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
