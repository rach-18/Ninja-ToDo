import { useState } from "react";

const EarlyAccess = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name, "Email:", email);
    // Add form submission logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="w-full max-w-md bg-white border-2 border-purple-600 rounded-xl purple-shadow shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Request Early Access
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600"
          >
            Request Access
          </button>
        </form>
      </div>
    </div>
  );
};

export default EarlyAccess;
