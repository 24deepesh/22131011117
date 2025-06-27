import React, { useState } from "react";
import { Log } from "./log";
import StatsPage from "./StatsPage.jsx";

const ShortenerForm = () => {
  const [urls, setUrls] = useState([{ original: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState([]);

  const addUrlInput = () => {
    if (urls.length >= 5) {
      Log("frontend", "warn", "input-limit", "Attempted to add more than 5 URLs");
      alert("Maximum 5 URLs allowed");
      return;
    }
    setUrls([...urls, { original: "", validity: "", shortcode: "" }]);
  };

  const isValidUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newResults = [];
    const newStats = [];

    for (let i = 0; i < urls.length; i++) {
      const { original, validity, shortcode } = urls[i];

      if (!isValidUrl(original)) {
        Log("frontend", "error", "url-validation", `Invalid URL at index ${i}`);
        alert(`Invalid URL at entry ${i + 1}`);
        return;
      }

      if (validity && isNaN(parseInt(validity))) {
        Log("frontend", "error", "validity", `Invalid validity at index ${i}`);
        alert(`Invalid validity at entry ${i + 1}`);
        return;
      }

      const now = new Date();
      const expiry = validity
        ? new Date(now.getTime() + validity * 60000).toLocaleString()
        : "∞";

      const short = `https://sho.rt/${shortcode || Math.random().toString(36).substring(2, 8)}`;

      newResults.push({ original, short, validity });
      newStats.push({
        short,
        createdAt: now.toLocaleString(),
        expiry,
        validity,
        clicks: []
      });
    }

    setResults(newResults);
    setStats([...stats, ...newStats]);
    Log("frontend", "info", "shortener", "URLs processed successfully");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-8">
        {urls.map((url, index) => (
          <div key={index} className="mb-4 border-b pb-4">
            <input
              type="url"
              required
              placeholder="Long URL"
              className="w-full p-2 border rounded mb-2"
              value={url.original}
              onChange={(e) => {
                const newUrls = [...urls];
                newUrls[index].original = e.target.value;
                setUrls(newUrls);
              }}
            />
            <input
              type="number"
              placeholder="Validity (minutes)"
              className="w-full p-2 border rounded mb-2"
              value={url.validity}
              onChange={(e) => {
                const newUrls = [...urls];
                newUrls[index].validity = e.target.value;
                setUrls(newUrls);
              }}
            />
            <input
              type="text"
              placeholder="Shortcode (optional)"
              className="w-full p-2 border rounded"
              value={url.shortcode}
              onChange={(e) => {
                const newUrls = [...urls];
                newUrls[index].shortcode = e.target.value;
                setUrls(newUrls);
              }}
            />
          </div>
        ))}
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
          onClick={addUrlInput}
        >
          + Add
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Shorten
        </button>
      </form>

      <StatsPage stats={stats} />
    </>
  );
};

export default ShortenerForm;
