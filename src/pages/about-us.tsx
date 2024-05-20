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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to provide the best motorcycles and motor parts to
            enthusiasts around the world. We aim to be the number one source for
            all your motorcycle needs, offering a wide range of products at
            competitive prices.
          </p>
        </section>

        {/* History Section */}
        <section className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our History</h2>
          <p className="text-gray-600">
            Established in 2020, our store has quickly grown to become a trusted
            name in the motorcycle industry. With a team of dedicated
            professionals and a commitment to excellence, we have served
            thousands of satisfied customers.
          </p>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li className="mb-2">
              <strong>Quality:</strong> We ensure all our products meet the
              highest standards.
            </li>
            <li className="mb-2">
              <strong>Customer Service:</strong> Our team is always ready to
              help you with any queries.
            </li>
            <li className="mb-2">
              <strong>Innovation:</strong> We constantly update our inventory
              with the latest and greatest in motorcycle technology.
            </li>
            <li>
              <strong>Integrity:</strong> We believe in being honest and
              transparent with our customers.
            </li>
          </ul>
        </section>

        {/* Team Section */}
        <section className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Meet the Team
          </h2>
          <p className="text-gray-600 mb-4">
            Our team is comprised of passionate motorcycle enthusiasts who are
            dedicated to providing you with the best service and products.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                name: "John Doe",
                position: "Founder & CEO",
                imageUrl:
                  "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                name: "Jane Smith",
                position: "Head of Marketing",
                imageUrl:
                  "https://images.unsplash.com/photo-1624224971170-2f84fed5eb5e?q=80&w=2899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                name: "Alice Johnson",
                position: "Customer Service Manager",
                imageUrl:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                name: "Bob Williams",
                position: "Lead Technician",
                imageUrl:
                  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
            ].map((teamMember, index) => (
              <div key={index} className="text-center">
                <Image
                  src={teamMember.imageUrl}
                  alt={teamMember.name}
                  width={200}
                  height={200}
                  className="rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  {teamMember.name}
                </h3>
                <p className="text-gray-600">{teamMember.position}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-4">
            If you have any questions or need further information, feel free to
            contact us. We are here to help!
          </p>
          <Link
            href="/contact-us"
            className="bg-blue text-white px-6 py-3 rounded-lg hover:bg-green transition duration-300"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
