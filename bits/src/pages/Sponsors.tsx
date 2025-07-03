import React from "react";

const sponsors = [
  {
    name: "TechCorp",
    logo: "/lovable-uploads/75563aab-1419-470f-86da-f6c102723c1d.png"
  },
  // Add more sponsors as needed
];

export default function Sponsors() {
  return (
    <section className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">Sponsors</h1>
      <ul className="flex flex-wrap gap-8 items-center">
        {sponsors.map((s) => (
          <li key={s.name} className="flex flex-col items-center">
            <img src={s.logo} alt={s.name} className="h-20 mb-2" />
            <span className="font-semibold">{s.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
