// Final Version - Updated with Direct EmailJS Keys

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles, useGLTF } from '@react-three/drei';
import { SectionWrapper } from '../hoc'; // your HOC wrapper

const ContactSection = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      "service_6kppc8d",
      "template_j8wti0c",
      {
        from_name: form.name,
        from_email: form.email,
        to_name: "Arham",
        to_email: "khokharbrand7585645@gmail.com",
        title: "Website Contact Form",
        message: form.message,
      },
      "7nrwobHTwxON5ozUJ"
    )
      .then(() => {
        setLoading(false);
        setIsSubmitted(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 3000);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        alert('Something went wrong. Please try again.');
      });
  };

  const EarthModel = () => {
    const earth = useGLTF('./planet/scene.gltf');
    return (
      <group>
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#a67bff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7d4bf0" />
        <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
      </group>
    );
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20" style={{
      background: 'radial-gradient(ellipse at bottom, #0c0a1d 0%, #050418 100%)'
    }}>

      {/* Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl">
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-[#8b5cf6] blur-[100px] opacity-20 left-[20%] top-[10%]"
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-[#7d4bf0] blur-[140px] opacity-10 right-[15%] bottom-[10%]"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl w-full px-4 sm:px-6 lg:px-8">

        {/* Form */}
        <motion.div
          className="relative bg-gradient-to-br from-[#0f0c29] to-[#1a063d] p-10 rounded-3xl border border-[#a67bff]/30 backdrop-blur-xl shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#a67bff] to-[#7d4bf0] mb-8">
            Contact
          </h2>
          <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-6'>
            {['name', 'email', 'message'].map((field, idx) => (
              <label key={idx} className='flex flex-col'>
                <span className='text-[#dfd9ff] font-medium mb-2 capitalize'>{`Your ${field}`}</span>
                {field !== 'message' ? (
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    placeholder={`Enter your ${field}`}
                    className='bg-[rgba(15,12,40,0.5)] py-3 px-5 placeholder:text-[#7d7daa] text-white rounded-xl border border-[#3f3c5a] focus:border-[#a67bff] focus:ring-1 focus:ring-[#a67bff] w-full'
                    required
                  />
                ) : (
                  <textarea
                    rows="4"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Type your message"
                    className='bg-[rgba(15,12,40,0.5)] py-3 px-5 placeholder:text-[#7d7daa] text-white rounded-xl border border-[#3f3c5a] focus:border-[#a67bff] focus:ring-1 focus:ring-[#a67bff] w-full'
                    required
                  />
                )}
              </label>
            ))}

            <motion.button
              type='submit'
              className='relative overflow-hidden py-3 px-8 text-white font-bold rounded-xl'
              style={{
                background: 'linear-gradient(145deg, rgba(125, 75, 240, 0.3), rgba(166, 123, 255, 0.4))',
                border: '1px solid rgba(166, 123, 255, 0.3)',
                boxShadow: '0 0 20px rgba(166, 123, 255, 0.3)'
              }}
              whileHover={{ background: 'linear-gradient(145deg, rgba(125, 75, 240, 0.4), rgba(166, 123, 255, 0.5))' }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <span className="relative z-10">
                {loading ? 'Sending...' : 'Transmit Message'}
              </span>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#a67bff] to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
              )}
            </motion.button>

            {isSubmitted && (
              <motion.div
                className="mt-4 text-[#a67bff] text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✅ Message sent successfully!
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Earth Model */}
        <motion.div
          className="relative h-[500px] lg:h-auto rounded-3xl overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Canvas
            shadows
            frameloop="demand"
            dpr={[1, 2]}
            camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
            gl={{ alpha: true, preserveDrawingBuffer: true }}
            style={{ background: 'transparent' }}
          >
            <OrbitControls
              autoRotate
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
            <Stars radius={100} depth={50} count={5000} factor={4} fade />
            <Sparkles count={100} scale={10} size={2} speed={0.4} color="#a67bff" />
            <EarthModel />
          </Canvas>

          {/* Visual flare */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[70%] h-[70%] rounded-full border-4 border-[#a67bff]/20 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute w-[75%] h-[75%] rounded-full border border-[#a67bff]/10" />
          </div>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-[#c5b0ff] text-sm">
            Holographic Earth Visualization • Three.js
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default SectionWrapper(ContactSection, "contact");