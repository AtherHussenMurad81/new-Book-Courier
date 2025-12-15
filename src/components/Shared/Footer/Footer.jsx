// src/components/Layout/Footer.jsx
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiX } from "react-icons/si"; // X logo

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 px-6 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/books" className="hover:text-white transition-colors">
                Books
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white transition-colors">
                Coverage
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white transition-colors">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="mb-2">📍Golapgonj, Sylhet, Bangladesh</p>
          <p className="mb-2">📧 muradnowshad20@gmail.com</p>
          <p className="mb-2">📞 +8801601-672639</p>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white text-xl"
            >
              <SiX />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white text-xl"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
        © 2025-2026 PlantNet Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
