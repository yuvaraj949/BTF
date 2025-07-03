import React from "react";
import events from "../data/events.json";

type Event = {
  title: string;
  startTime: string;
  endTime: string;
  date: string;
  location: string;
  shortDescription: string;
  tag: string;
};

export default function Events() {
  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">Events</h1>
      <ul className="space-y-6">
        {(events as Event[]).map((event) => (
          <li key={event.title + event.date} className="border rounded p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-semibold">{event.title}</h2>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">{event.tag}</span>
            </div>
            <div className="text-sm text-gray-600 mb-1">
              {event.date} | {event.startTime.slice(11,16)} - {event.endTime.slice(11,16)} | {event.location}
            </div>
            <p>{event.shortDescription}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
