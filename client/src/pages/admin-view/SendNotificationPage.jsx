import React, { useState } from "react";

const SendNotificationPage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    if (!title || !body) {
      setResponse("Please fill in both title and message.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/notify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, body }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setResponse(`✅ ${data.message}`);
      } else {
        setResponse(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setResponse("❌ Error sending notification.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Send Push Notification</h2>
      <input
        type="text"
        className="border w-full mb-3 p-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border w-full mb-3 p-2 rounded"
        placeholder="Message body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Sending..." : "Send Notification"}
      </button>
      {response && <p className="mt-4">{response}</p>}
    </div>
  );
};

export default SendNotificationPage;
