import React from "react";

export default function ContactUs() {
  return (
    <section className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <div className="mb-4">
        <p><b>Email:</b> <a href="mailto:contact.btf@dubai.bits-pilani.ac.in" className="text-blue-600 underline">contact.btf@dubai.bits-pilani.ac.in</a></p>
        <p><b>Phone:</b> <a href="tel:+971586290281" className="text-blue-600 underline">+971 586290281</a></p>
        <p><b>Address:</b><br />
          BITS Pilani Dubai Campus,<br />
          Dubai International Academic City,<br />
          Dubai, UAE
        </p>
      </div>
      <div className="border rounded overflow-hidden" style={{height: 300}}>
        <iframe
          title="BITS Pilani Dubai Campus Map"
          src="https://www.google.com/maps?q=BITS+Pilani+Dubai+Campus&output=embed"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
