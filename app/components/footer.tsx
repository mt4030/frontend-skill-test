
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white h-30 text-gray-900 py-6">
      <div className="max-w-7xl mx-auto px-4 text-center md:flex-row justify-between items-center gap-4">
      
            <div className="flex justify-center mb-5 gap-4">
          
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-gray-800 bg-amber-500 transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-gray-800 bg-amber-500 transition"
          >
            <FaLinkedinIn />
          </a>
        </div>
             <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} GameInfo. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
