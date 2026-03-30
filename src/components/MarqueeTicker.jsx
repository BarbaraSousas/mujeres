import { motion } from 'framer-motion'

const services = [
  'Identidade Visual',
  'UX/UI Design',
  'Desenvolvimento Web',
  'Estratégia de Conteúdo',
  'Mídia Digital',
  'Dados & Analytics',
  'Estratégia de Crescimento',
  'Direção Criativa',
  'Redes Sociais',
  'E-commerce',
]

export default function MarqueeTicker() {
  const duplicatedServices = [...services, ...services]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="w-full overflow-hidden py-8"
    >
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark to-transparent z-10" />

        {/* Marquee content */}
        <div className="animate-marquee flex whitespace-nowrap">
          {duplicatedServices.map((service, index) => (
            <span
              key={index}
              className="flex items-center mx-4 text-sm md:text-base font-body font-light tracking-wide"
            >
              <span className="text-white/60 uppercase">{service}</span>
              <span className="mx-4 text-magenta text-lg">→</span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
