function Feedback() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    const phoneNumber = "919515836496"; 
    const message = `📌 Query / Feedback\n\n*Title:* ${title}\n*Description:* ${description}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
    e.target.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-red-100 to-pink-300 px-4 py-10">
      <div className="max-w-md w-full bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-8">
        <h2 className="text-3xl font-bold font-sans text-gray-800 text-center drop-shadow-lg">
          Share Your Feedback
        </h2>
        <p className="text-sm text-gray-700 text-center mt-2 mb-6 italic">
          Help us improve by sharing your thoughts about our services, orders, deliveries, and Restaurants food quality, Packaging issues, feedback, etc...
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Query Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Eg: Late delivery experience"
              className="w-full px-4 py-3 rounded-xl border border-green-500 bg-transparent text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Write your feedback..."
              rows="5"
              className="w-full px-4 py-3 rounded-xl border border-green-500 bg-transparent text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-green-500/90 hover:bg-green-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="whatsapp"
              className="h-5 w-5"
            />
            Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
