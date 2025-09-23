import React from 'react'
import { motion } from 'framer-motion'
import { Download, MapPin, Mail, Calendar } from 'lucide-react'
import { Button, Card, CardContent } from '../../../components/ui'
import { useFadeIn } from '../../../hooks'
import { personalInfo } from '../../../data/personal'
import { skillsByCategory } from '../../../data/skills'

const About: React.FC = () => {
  const titleRef = useFadeIn<HTMLDivElement>()
  const contentRef = useFadeIn<HTMLDivElement>(0.2)
  const statsRef = useFadeIn<HTMLDivElement>(0.4)

 return (
    <section
      className="bg-[#F4F4F4] py-20 px-6 md:px-0 relative"
      style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}
    >
      {/* Top wave to connect with Hero section */}
      {/* <div className="absolute top-0 left-0 right-0 z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 200"
          className="w-full h-[200px] fill-black"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L1440,0 L1440,100 C1320,40 1200,160 1080,100 C960,40 840,160 720,100 C600,40 480,160 360,100 C240,40 120,160 0,100 Z" />
        </svg>
      </div> */}

{/* Black Ribbon Bar - bottom wave for hero */}
<div className="absolute top-0 left-0 right-0 z-30">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 130"
    className="w-full h-[130px] fill-black"
    preserveAspectRatio="none"
  >
    <path d="M0,0 L1440,0 L1440,76 C1080,130 360,6 0,76 Z" />
  </svg>
</div>


      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Container - Photo */}
        <div className="flex justify-center items-center">
          <img
            src="/path_to_profile_photo.jpg"
            alt="Profile"
            className="rounded-xl shadow-2xl w-[75%] max-w-[340px] object-cover"
            style={{ background: "#e1e8f0" }}
          />
        </div>
        {/* Right Container - Fuzzy Bold Text */}
        <div>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-[#2E2E2E] mb-6"
            style={{ filter: "blur(1.2px)" }}
          >
            Creating Digital Impact
          </h2>
          <p className="text-lg text-[#64748B] font-semibold tracking-wide mb-4">
            Passionate about transforming complex ideas into seamless digital products.
          </p>
          <p className="text-base text-[#4A90E2] font-bold bg-[#D4C5B0] px-3 py-2 rounded-md inline-block">
            Driven by design, powered by technology – delivering exceptional solutions for businesses.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About
