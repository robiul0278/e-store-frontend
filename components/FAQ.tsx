'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What materials are the toy cars made of?',
    answer: (
      <>
        Our toy cars are primarily made of high-quality die-cast metal with some plastic components for detailing.
        <br /><br />
        They are durable, child-safe, and built to last for both play and collection.
      </>
    ),
  },
  {
    question: 'Do the toy cars have moving parts?',
    answer: (
      <>
        Yes! Many of our models feature opening doors, hoods, trunks, and functional wheels for a realistic experience.
        <br /><br />
        Product descriptions specify which features are included.
      </>
    ),
  },
  {
    question: 'How long does shipping take?',
    answer: (
      <>
        Orders are processed within 24 hours. Standard shipping within the USA typically takes 3–5 business days.
        <br /><br />
        Expedited options are available at checkout.
      </>
    ),
  },
  {
    question: 'Can I return or exchange a toy car?',
    answer: (
      <>
        Yes, we accept returns or exchanges within 7 days of delivery if the item is unused and in its original packaging.
        <br /><br />
        Just contact our support with your order ID and reason for return.
      </>
    ),
  },
  {
    question: 'Are these toys safe for kids?',
    answer: (
      <>
        Absolutely. All our toy cars meet US safety standards and are free from small detachable parts for kids under 3.
        <br /><br />
        Please check the recommended age on each product page.
      </>
    ),
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto py-6 w-full md:py-16 lg:py-16">
      {/* Heading */}
      <div className="flex items-center justify-center gap-4 mb-10">
        <hr className="flex-grow border border-t 0" />
        <h2 className="text-xl md:text-1xl font-semibold text-center whitespace-nowrap">
          Frequently Asked Questions
        </h2>
        <hr className="flex-grow border border-t " />
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map(({ question, answer }, idx) => (
          <div
            key={idx}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <button
              onClick={() => toggleIndex(idx)}
              className="w-full flex justify-between items-center px-6 py-4 font-medium text-left text-gray-800 dark:text-gray-200 focus:outline-none"
            >
              {question}
              <motion.span
                animate={{ rotate: openIndex === idx ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-2 text-amber-500 font-bold text-2xl leading-none"
              >
                +
              </motion.span>
            </button>

            {/* Animate Answer */}
            <AnimatePresence initial={false}>
              {openIndex === idx && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="px-6 pb-4 text-sm text-muted-foreground"
                >
                  {answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
