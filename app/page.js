"use client";
import React from "react";
import { motion } from "framer-motion";
import HighLightText from "@/components/HighLightText";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import Image from "next/image";
import Category from "@/components/Home/Category";
import Consult from "@/components/Home/Consult";
import CallToAction from "@/components/Home/CallToAction";
import Footer from "@/components/common/Footer";
const Home = () => {
  // Variants for animations
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <>
    <div className="font-inter text-white flex justify-center bg-gray-900 scroll-smooth">
      <div className="w-11/12 max-w-maxContent flex justify-center items-center flex-col mt-20 relative">
        <div className="rounded-full shadow-circle2 flex items-center justify-center absolute left-5 top-60 -z-10 opacity-70"></div>

        {/* Hero Section */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-row w-11/12 relative my-20"
        >
          {/* Left Content */}
          <motion.div
            variants={fadeUp}
            className="tab1 flex flex-col w-1/2 gap-y-3"
          >
            <h2 className="mt-5 text-3xl font-crimson">
              Find the Right <HighLightText text={"Consultant"} /> in Minutes
            </h2>
            <p className="font-crimson font-semibold w-3/5 my-10">
              From legal advice to career coaching, book trusted experts in just
              a few clicks
            </p>
            <div className="flex gap-x-4">
              <motion.div whileHover={{ scale: 0.95 }}>
                <CTAButton
                  text={"Browse Consultants"}
                  flag={true}
                  linkto={"home"}
                />
              </motion.div>
              <motion.div whileHover={{ scale: 0.95 }}>
                <CTAButton
                  text={"Book An Appointment"}
                  flag={false}
                  linkto={"home"}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            variants={fadeUp}
            className="w-1/2 flex justify-center tab2"
          >
            <Image src="/HomeImages/2nd.png" width={400} height={100} alt="" />
          </motion.div>
        </motion.section>

        <div className="rounded-full shadow-circle1 flex items-center justify-center absolute  top-[650px] -z-10 opacity-70"></div>

        {/* CTA Button */}
        <Link href="book">
          <motion.button
            whileHover={{ scale: 0.95, boxShadow: "0px 4px 20px rgba(255,0,0,0.4)" }}
            transition={{ duration: 0.2 }}
            className="w-52 h-14 bg-gradient-to-tr bg-cyan-400/40 font-inter text-white rounded-full border-b-2 border-b-red-300 my-10"
          >
            Book Appointment
          </motion.button>
        </Link>

        {/* Video Section */}
        <motion.video
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          src="/banner.mp4"
          className="w-4/5 shadow-[20px_20px_30px_10px_rgba(66,170,245,0.3)] rounded-xl"
          muted
          autoPlay
          loop
        ></motion.video>

        {/* Consult Section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <Consult />
        </motion.div>

        {/* Category Section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <Category />
        </motion.div>

        {/* Optional Call to Action */}
        <CallToAction />
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Home;
