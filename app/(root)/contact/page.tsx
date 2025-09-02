// app/contact/page.tsx
"use client";

import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Contact <span className="text-indigo-600">Us</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Have questions or need support? Reach out to us using the details below.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <MapPin className="w-10 h-10 text-indigo-600" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Address</h3>
          <p className="text-gray-600 dark:text-gray-300">
            123 E-Store Street<br />City, Country
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Phone className="w-10 h-10 text-green-500" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Phone</h3>
          <p className="text-gray-600 dark:text-gray-300">
            +880 1234 567 890
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Mail className="w-10 h-10 text-red-500" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Email</h3>
          <p className="text-gray-600 dark:text-gray-300">
            support@estore.com
          </p>
        </div>
      </div>

      {/* Optional Map Embed */}
      <div className="mt-16 max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg">
        <iframe
          className="w-full h-64 sm:h-96"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902962013135!2d90.3894!3d23.7509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7900f8f23b9%3A0xf3b36e9b899f5d0b!2sDhaka!5e0!3m2!1sen!2sbd!4v1693660912345!5m2!1sen!2sbd"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
