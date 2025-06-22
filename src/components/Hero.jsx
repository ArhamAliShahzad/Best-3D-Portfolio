import { motion } from 'framer-motion';
import { ComputersCanvas } from './canvas';

const scrollToAbout = () => {
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    aboutSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const Hero = () => {
  return (
    <section className='w-full relative h-screen mx-auto overflow-hidden'>
      {/* Background gradient for better depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1440] to-[#0d0c1d] -z-10" />

      <div className={`absolute inset-0 top-[120px] mx-auto flex flex-row items-start gap-5 max-w-7xl px-6 md:px-8`}>
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915eff]' />
          <div className='w-1 sm:h-80 h-40 bg-gradient-to-b from-[#915eff] to-[#0d0c1d]' />
        </div>

        <div className='max-w-2xl'>
          <h1 className='text-white font-black text-[40px] sm:text-[50px] lg:text-[60px] xl:text-[70px]'>
            Hi, I'm <span className='text-[#915eff]'>Arham</span>
          </h1>
          <p className='text-[#dfd9ff] font-medium text-[16px] sm:text-[18px] lg:text-[20px] mt-2 max-w-2xl'>
            A passionate Frontend Developer and continuous learner crafting immersive web experiences.
          </p>
        </div>
      </div>

      {/* Computers Canvas - Made more responsive */}
      <div className='absolute inset-0 top-0 w-full h-full opacity-90'>
        <ComputersCanvas />
      </div>

      {/* Scroll indicator with enhanced animation */}

      <div className='absolute bottom-8 md:bottom-10 w-full flex items-center justify-center '>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToAbout}
          className='cursor-pointer'
          aria-label="Scroll to about section"
        >
          {/* <a href='about'> */}
          <div className='w-[33px] h-[62px] rounded-3xl border-4 border-[#915eff] flex justify-center items-start p-2 bg-[#0d0c1d]/50 backdrop-blur-sm'>
            <motion.div
              animate={{
                y: [0, 24, 0]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatType: 'loop',
                ease: "easeInOut"
              }}
              className='w-3 h-3 rounded-full bg-[#915eff]'
            />
          </div>
          {/* </a> */}
        </motion.div>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-[#915eff] filter blur-[100px] opacity-20" />
      <div className="absolute bottom-40 left-20 w-32 h-32 rounded-full bg-[#915eff] filter blur-[100px] opacity-20" />
    </section>
  )
}

export default Hero;