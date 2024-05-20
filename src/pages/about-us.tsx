import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          About Us
        </h1>

        {/* Introduction Section */}
        <section className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Наша місія</h2>
        </section>

        {/* History Section */}
        <section className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Наша історія
          </h2>

          <div className="mt-4">
            <Image
              src="https://images.unsplash.com/photo-1520986642935-0567c1a1ce2d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our Store"
              width={800}
              height={450}
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Наші цінності
          </h2>
        </section>

        {/* Team Section */}
        <section className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Зустрічайте команду
          </h2>
        </section>

        {/* Contact Section */}
        <section className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Зв'яжіться з нами
          </h2>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
