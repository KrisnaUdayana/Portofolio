import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone, FiSend, FiArrowRight } from "react-icons/fi";

const contactItems = [
  { icon: FiMail, label: "Email", value: "krisnaudayana18@gmail.com", href: "mailto:krisnaudayana18@gmail.com", color: "bg-blue-100 text-blue-600" },
  { icon: FiLinkedin, label: "LinkedIn", value: "linkedin.com/in/krisna", href: "https://linkedin.com/in/krisna", color: "bg-blue-100 text-blue-700" },
  { icon: FiGithub, label: "GitHub", value: "github.com/KrisnaUdayana", href: "https://github.com/KrisnaUdayana", color: "bg-gray-200 text-gray-800" },
  { icon: FiPhone, label: "Phone", value: "+12345678", href: "tel:+12345678", color: "bg-green-100 text-green-600" },
];

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    window.setTimeout(() => setSubmitted(false), 2800);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="contact" className="relative w-full bg-[#f4f4f5] py-24 px-4 md:px-8 border-t-[3px] border-black">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Left Side - Copy */}
          <motion.div variants={itemVariants} className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 border-[2px] border-black rounded-full bg-yellow-300 text-black font-bold text-xs uppercase tracking-widest mb-8 shadow-[4px_4px_0_#111]">
                <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
                Let's Talk
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-black mb-6 tracking-tight uppercase leading-[1.1]">
                Have a product idea that needs a steady builder?
              </h2>
              <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed mb-10 max-w-lg">
                Share what you are trying to build, fix, or clarify. I can help shape the technical path and move it toward something real.
              </p>

              <div className="flex items-start gap-4 p-6 border-[3px] border-black rounded-2xl bg-white shadow-[6px_6px_0_#111] mb-10 max-w-md">
                <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-black flex items-center justify-center shrink-0">
                  <FiMapPin className="text-blue-600" size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-black uppercase tracking-wider mb-1">Location / Availability</h4>
                  <p className="text-sm font-medium text-gray-600">Available for remote collaboration and selected long-term product work.</p>
                </div>
              </div>
            </div>

            {/* Contact Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactItems.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href}
                  className="group flex items-center gap-4 p-4 border-[3px] border-black rounded-2xl bg-white shadow-[4px_4px_0_#111] hover:shadow-[6px_6px_0_#111] hover:-translate-y-1 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center shrink-0 ${item.color}`}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                    <p className="font-bold text-black text-sm group-hover:text-blue-600 transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div variants={itemVariants} className="h-full">
            <div className="h-full border-[3px] border-black rounded-[32px] bg-white p-8 md:p-10 shadow-[8px_8px_0_#111] flex flex-col">
              <div className="mb-8 border-b-2 border-gray-100 pb-6 flex items-center justify-between">
                <h3 className="text-2xl font-black uppercase tracking-tight">Send a Message</h3>
                <FiSend size={24} className="text-gray-400" />
              </div>

              <form onSubmit={handleSubmit} className="flex-grow flex flex-col gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Your name" 
                    required 
                    className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-medium text-black focus:outline-none focus:border-black focus:ring-0 transition-colors placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="you@example.com" 
                    required 
                    className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-medium text-black focus:outline-none focus:border-black focus:ring-0 transition-colors placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2 flex-grow flex flex-col">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Message</label>
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Tell me what you want to build" 
                    required
                    className="w-full flex-grow min-h-[150px] p-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-medium text-black focus:outline-none focus:border-black focus:ring-0 transition-colors placeholder:text-gray-400 resize-none"
                  />
                </div>

                <div className="mt-auto pt-4">
                  <button 
                    type="submit" 
                    className="w-full flex items-center justify-center gap-3 py-5 border-[3px] border-black rounded-2xl bg-black text-white font-black text-lg uppercase tracking-wide shadow-[4px_4px_0_#111] hover:shadow-[6px_6px_0_#111] hover:bg-gray-800 hover:-translate-y-1 transition-all"
                  >
                    Submit Request
                    <FiArrowRight size={22} />
                  </button>

                  {submitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-green-100 border-2 border-green-500 rounded-xl flex items-center gap-3 text-green-800 font-bold"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      Message queued. I will get back to you soon.
                    </motion.div>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
