import React from "react";

const tracks = [
  {
    title: "Artificial Intelligence",
    description: "Explore the latest in AI, machine learning, and data science."
  },
  {
    title: "Internet of Things",
    description: "Innovate with IoT devices, smart systems, and automation."
  },
  {
    title: "Sustainability",
    description: "Build solutions for a greener, more sustainable future."
  }
];

export default function Tracks() {
  return (
    <section className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">Tracks</h1>
      <p className="mb-4">Choose from a variety of competition tracks. 180+ participants joined us last year!</p>
      <ul className="space-y-4">
        {tracks.map((track) => (
          <li key={track.title} className="border rounded p-4">
            <h2 className="text-2xl font-semibold">{track.title}</h2>
            <p>{track.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
