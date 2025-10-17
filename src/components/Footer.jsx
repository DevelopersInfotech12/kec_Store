'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight, Heart } from 'lucide-react';

export default function ModernFooter() {
  const [email, setEmail] = useState('');
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const handleSubscribe = () => {
    if (email) {
      alert('Thank you for subscribing!');
      setEmail('');
    }
  };

  const footerLinks = {
    shop: [
      { name: 'New Arrivals', href: '#' },
      { name: 'Best Sellers', href: '#' },
      { name: 'Sale', href: '#' },
      { name: 'Gift Cards', href: '#' }
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Blog', href: '#' }
    ],
    support: [
      { name: 'Contact Us', href: '#' },
      { name: 'FAQs', href: '#' },
      { name: 'Shipping', href: '#' },
      { name: 'Returns', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Accessibility', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', color: 'hover:text-emerald-400' },
    { icon: Twitter, name: 'Twitter', color: 'hover:text-teal-400' },
    { icon: Instagram, name: 'Instagram', color: 'hover:text-green-400' },
    { icon: Linkedin, name: 'LinkedIn', color: 'hover:text-lime-400' }
  ];

  return (
    <footer className="">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 pt-16">
        {/* Top Section - Newsletter */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Stay Connected
          </h2>
          <p className="text-slate-400 mb-8 text-lg">
            Subscribe to our newsletter for exclusive deals and updates
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-emerald-950/30 border border-emerald-700/50 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all duration-300 placeholder-slate-500"
                />
              </div>
              <button
                onClick={handleSubscribe}
                className="px-8 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-xl font-semibold hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-emerald-500/30"
              >
                Subscribe
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-2xl font-bold capitalize bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-300 font-bold hover:text-emerald-300 hover:pl-2 transition-all duration-300 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-8 bg-emerald-950/20 rounded-2xl border border-emerald-700/30">
          <div className="flex items-start gap-4 group">
            <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all duration-300">
              <Mail className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-emerald-300 text-lg">Email Us</h4>
              <p className="text-slate-200 text-sm">support@store.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4 group">
            <div className="p-3 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-all duration-300">
              <Phone className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-emerald-300 text-lg">Call Us</h4>
              <p className="text-slate-200 text-sm">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-start gap-4 group">
            <div className="p-3 bg-teal-500/20 rounded-lg group-hover:bg-teal-500/30 transition-all duration-300">
              <MapPin className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-emerald-300 text-lg">Visit Us</h4>
              <p className="text-slate-200 text-sm">123 Store Street, NY</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-emerald-700/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo & Copyright */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
               <img src="/images/logo.png" alt="" srcset="" />
              </h3>
             
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href="#"
                    onMouseEnter={() => setHoveredSocial(index)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    className={`p-3 bg-emerald-900/50 rounded-xl ${social.color} transform transition-all duration-300 ${
                      hoveredSocial === index ? 'scale-110 -rotate-6' : ''
                    } hover:shadow-lg hover:shadow-emerald-500/40 border border-emerald-700/30`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-sm">We accept:</span>
              <div className="flex gap-2">
                {['VISA', 'MC', 'AMEX', 'PP'].map((method) => (
                  <div
                    key={method}
                    className="px-3 py-1 bg-emerald-900/50 border border-emerald-700/30 rounded-lg text-xs font-semibold text-emerald-300 hover:bg-emerald-800/50 transition-all duration-300"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
           <p className="text-slate-400 text-sm flex items-center gap-2 justify-center py-4">
                Developed By Developers Infotech © 2025 All rights reserved
              </p>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
    </footer>
  );
}