'use client';

import { motion, Variants } from 'framer-motion';
import { ArrowRight, Car } from 'lucide-react';
import Link from 'next/link';
import HeroImage from './HeroImage';

export default function HeroSection() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const fadeIn: Variants = {
        hidden: { opacity: 0, x: 50 },
        show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120, damping: 15 } },
    };

    const ctaAnim: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 10, delay: 0.5 } },
    };

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="relative overflow-hidden py-10"
        >
            {/* Background circles */}
            <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-pink-300 rounded-full blur-3xl opacity-30" />
            <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-yellow-300 rounded-full blur-3xl opacity-30" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-0 lg:px-0 py-10 lg:py-16">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">

                    {/* Text content */}
                    <motion.div className="space-y-2 text-center lg:text-left">
                        <motion.div
                            variants={fadeIn}
                            className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium shadow"
                        >
                            <Car className="h-4 w-4" />
                            Premium Toy Cars
                        </motion.div>

                        <motion.div className="space-y-1">
                            <motion.h1
                                variants={fadeIn}
                                className="text-4xl md:text-3xl lg:text-4xl font-bold leading-tight"
                            >
                                <span className="bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">
                                    Drive Imagination with Toy Cars
                                </span>
                            </motion.h1>

                            <motion.p
                                variants={fadeIn}
                                className="text-sm text-muted-foreground max-w-2xl"
                            >
                                Explore our exciting collection of toy vehicles that inspire fun, learning, and creativity for every child.
                            </motion.p>
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div variants={ctaAnim} className="pt-4">
                            <Link
                                href="#toys"
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-yellow-400 text-white font-medium transition-all hover:scale-105 shadow-md"
                            >
                                Browse Cars
                                <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                        </motion.div>
                        {/* Stats Section */}
                        <motion.div
                            variants={fadeIn}
                            className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6"
                        >
                            {[
                                { label: "Cars Available", value: "500+" },
                                { label: "Countries Shipped", value: "20+" },
                                { label: "Happy Customers", value: "10k+" },
                            ].map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 rounded-lg bg-white/70 dark:bg-gray-800/50 shadow-md backdrop-blur-md"
                                >
                                    <p className="text-xl font-bold text-red-600">{stat.value}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Hero image */}
                    <motion.div
                        variants={fadeIn}
                        className="relative h-[230px] md:h-[380px] lg:h-[385px] w-full max-w-lg"
                    >
                        <HeroImage
                            src="https://cdn.pixabay.com/animation/2023/01/24/23/10/23-10-50-478_512.gif"
                            alt="Hot Wheels GIF"
                            priority
                            animationDelay={0.6}
                            className="h-full w-full rounded-xl"
                        />
                    </motion.div>

                </div>
            </div>

        </motion.div>
    );
}
