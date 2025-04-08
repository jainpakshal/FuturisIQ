
import { Link } from 'react-router-dom';
import { Compass, Mail, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Compass className="h-8 w-8 text-indigo-400" />
              <span className="text-xl font-bold">FuturisIQ</span>
            </div>
            <p className="text-gray-400">
              Guiding students through their academic and career journey with personalized insights 
              and AI-powered recommendations.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/career-dna" className="text-gray-400 hover:text-white transition-colors">Career DNA</Link>
              </li>
              <li>
                <Link to="/career-paths" className="text-gray-400 hover:text-white transition-colors">Career Paths</Link>
              </li>
              <li>
                <Link to="/roadmap" className="text-gray-400 hover:text-white transition-colors">Roadmap</Link>
              </li>
              <li>
                <Link to="/ai-mentor" className="text-gray-400 hover:text-white transition-colors">AI Mentor</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-indigo-400" />
              <span className="text-gray-400">support@futurisiq.com</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} FuturisIQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
