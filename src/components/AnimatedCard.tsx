import { motion } from 'framer-motion'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

export default function AnimatedCard({ children, className = '', delay = 0, hover = true }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={hover ? { y: -8, transition: { duration: 0.2 } } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  )
}
