import React from "react";

const StatsPage = ({ stats }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Shortener Statistics</h2>
      {stats.length === 0 ? (
        <p className="text-gray-500">No URLs shortened yet.</p>
      ) : (
        stats.map((item, i) => (
          <div key={i} className="bg-white shadow p-4 rounded mb-4">
            <p><strong>Short URL:</strong> <a className="text-blue-600 underline" href={item.short} target="_blank">{item.short}</a></p>
            <p><strong>Created:</strong> {item.createdAt}</p>
            <p><strong>Expires:</strong> {item.expiry}</p>
            <p><strong>Click Count:</strong> {item.clicks.length}</p>

            <details className="mt-2">
              <summary className="cursor-pointer text-gray-700">Click Data</summary>
              {item.clicks.length === 0 ? (
                <p className="text-sm text-gray-500 mt-1">No clicks recorded.</p>
              ) : (
                <ul className="mt-2 space-y-1 text-sm">
                  {item.clicks.map((click, index) => (
                    <li key={index} className="border p-2 rounded">
                      <p><strong>Time:</strong> {click.time}</p>
                      <p><strong>Source:</strong> {click.source}</p>
                      <p><strong>Location:</strong> {click.location}</p>
                    </li>
                  ))}
                </ul>
              )}
            </details>
          </div>
        ))
      )}
    </div>
  );
};

export default StatsPage;
