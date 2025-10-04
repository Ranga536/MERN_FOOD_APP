import SuperAdmin from "@/components/admin-view/super-admin";
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
    // <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-xl">
    //   <h2 className="text-2xl font-bold mb-4">Send Push Notification</h2>
    //   <input
    //     type="text"
    //     className="border w-full mb-3 p-2 rounded-2xl"
    //     placeholder="Title"
    //     value={title}
    //     onChange={(e) => setTitle(e.target.value)}
    //   />
    //   <textarea
    //     className="border w-full mb-3 p-2 rounded-2xl"
    //     placeholder="Message body"
    //     value={body}
    //     onChange={(e) => setBody(e.target.value)}
    //   ></textarea>
    //   <button
    //     onClick={handleSend}
    //     disabled={loading}
    //     // className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    //     // className="cursor-pointer bg-blue-400 hover:bg-pink-600 text-white p-2 rounded-lg shadow-md transition-all duration-200"
    //     className="cursor-pointer bg-gradient-to-r from-[#eb05ae] via-[#2575fc] to-[#00c9ff] hover:shadow-xl hover:scale-[1.02] text-white p-2 rounded-lg shadow-md transition-all duration-200"
    //   >
    //     {loading ? "Sending..." : "Send Notification"}
    //   </button>
    //   {response && <p className="mt-4 text-red-500 italic">{response}</p>}
    // </div>.
    <SuperAdmin />
  );
};

export default SendNotificationPage;
