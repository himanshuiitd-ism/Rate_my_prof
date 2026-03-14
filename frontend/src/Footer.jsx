import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 Rate My Prof. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">
              Terms and Conditions
            </a>
            <a href="#" className="hover:text-gray-300">
              Privacy Policy
            </a>
            <div className="flex items-center space-x-2">
              <span>Contact:</span>
              <a
                href="https://instagram.com/startup.factory_iit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                @startup.factory_iit
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
