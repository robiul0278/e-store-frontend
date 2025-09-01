'use client';

import { useState } from 'react';
import Link from 'next/link';

const footerLinks = [
  {
    title: 'About',
    links: [
      { label: 'Company', href: '/#' },
      { label: 'Team', href: '/#' },
      { label: 'Careers', href: '/#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/#' },
      { label: 'Contact', href: '/#' },
      { label: 'FAQ', href: '/#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/#' },
      { label: 'Terms', href: '/#' },
      { label: 'Cookie Policy', href: '/#' },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'Twitter', href: 'https://twitter.com', external: true },
      { label: 'Instagram', href: 'https://instagram.com', external: true },
      { label: 'Facebook', href: 'https://facebook.com', external: true },
    ],
  },
];

export default function Footer() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-4 md:px-0 lg:px-0 py-8 md:py-12">
        {/* Mobile View: Collapsible sections */}
        <div className="lg:hidden">
          {footerLinks.map((section) => (
            <div key={section.title} className="mb-4 border-b border-gray-200">
              <button
                className="w-full flex justify-between items-center py-3 text-left text-gray-800 dark:text-gray-200 font-semibold"
                onClick={() => toggleSection(section.title)}
              >
                {section.title}
                <span className="ml-2">{openSections[section.title] ? '−' : '+'}</span>
              </button>
              {openSections[section.title] && (
                <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400 pl-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={link ? '_blank' : undefined}
                        className="hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex lg:justify-between lg:gap-8">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">{section.title}</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link ? '_blank' : undefined}
                      className="hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500 dark:text-gray-400">
          © 2024 DigitalMarket. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
