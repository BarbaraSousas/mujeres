import { motion } from 'framer-motion'

export default function ColorOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* Magenta orb - top left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, #FF2D78 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Lime orb - bottom right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
        className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, #C8FF00 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Coral orb - center right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
        className="absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, #FF6B35 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Electric blue orb - subtle bottom left accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 2, delay: 0.7, ease: 'easeOut' }}
        className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />
    </div>
  )
}
