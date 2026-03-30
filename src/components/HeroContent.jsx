import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MarqueeTicker from './MarqueeTicker'

const headlineWords = ['UMA NOVA ERA', 'DE SOLUÇÕES', 'DIGITAIS']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
}

const wordVariants = {
  hidden: {
    y: 80,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export default function HeroContent() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubmitted(true)
    }
  }

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-screen overflow-hidden px-4 sm:px-6">
      {/* Sweep line */}
      <motion.div
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: '100vw', opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
        className="absolute top-1/2 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-magenta to-transparent"
        style={{ zIndex: 5 }}
      />

      {/* Top label */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase font-body font-light mb-3 sm:mb-5"
      >
        Algo grande está chegando
      </motion.p>

      {/* Main headline */}
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="font-display text-center leading-[0.85] mb-3 sm:mb-5"
      >
        {headlineWords.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            className="block text-[11vw] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            style={{
              color: index === 1 ? '#FF2D78' : 'white',
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="text-center font-body font-light text-white/50 text-xs sm:text-sm lg:text-base max-w-md mb-1"
      >
        Design. Desenvolvimento. Mídia. Conteúdo. Estratégia.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="text-center font-body font-light text-white/40 text-[11px] sm:text-sm mb-4 sm:mb-6"
      >
        Um time. Possibilidades infinitas.
      </motion.p>

      {/* Marquee */}
      <div className="w-full max-w-4xl">
        <MarqueeTicker />
      </div>

      {/* Email form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        className="w-full max-w-md mt-2 sm:mt-4"
      >
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2 sm:gap-3"
              exit={{ opacity: 0, y: -20 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Deixe seu email e seja a primeira a saber"
                required
                className="flex-1 px-4 py-3 sm:py-3.5 rounded-lg font-body text-xs sm:text-sm text-white placeholder-white/40 outline-none transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${isFocused ? '#FF2D78' : 'rgba(255,255,255,0.15)'}`,
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03, filter: 'brightness(1.1)' }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-3 sm:py-3.5 bg-magenta text-white font-body font-medium text-xs sm:text-sm uppercase tracking-wider rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                Avise-me →
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-2 py-2"
            >
              {/* Animated checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-12 h-12 rounded-full bg-magenta/20 flex items-center justify-center"
              >
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-6 h-6 text-magenta"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>
              <p className="text-white/70 font-body text-sm text-center">
                Você está na lista. <span className="text-magenta">Nos vemos em breve.</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom section */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex flex-col items-center">
        {/* Bottom social proof line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="text-center font-body text-[10px] sm:text-xs text-white/30 tracking-wide px-4"
        >
          Feito por mulheres. Movido por estratégia. Prontas para transformar o seu negócio.
        </motion.p>

        {/* Studio name placeholder */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="mt-2 sm:mt-3 font-display text-sm sm:text-base tracking-[0.2em] text-white/20"
        >
          [STUDIO]
        </motion.p>
      </div>
    </div>
  )
}
