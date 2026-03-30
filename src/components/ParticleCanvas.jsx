import { useEffect, useRef } from 'react'

const COLORS = ['#FF2D78', '#C8FF00', '#FF6B35', '#00D4FF']

class Particle {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = this.canvas.height + Math.random() * 100
    this.baseX = this.x
    this.size = Math.random() * 3 + 1
    this.speedY = Math.random() * 0.5 + 0.2
    this.speedX = (Math.random() - 0.5) * 0.3
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.opacity = Math.random() * 0.5 + 0.2
    this.life = 0
    this.maxLife = Math.random() * 500 + 300
    // Interaction properties
    this.density = Math.random() * 30 + 10
    this.vx = 0
    this.vy = 0
  }

  update(mouse) {
    // Mouse interaction - repulsion effect
    if (mouse.x !== null && mouse.y !== null) {
      const dx = this.x - mouse.x
      const dy = this.y - mouse.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxDistance = mouse.radius

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance
        const angle = Math.atan2(dy, dx)
        const pushX = Math.cos(angle) * force * this.density * 0.15
        const pushY = Math.sin(angle) * force * this.density * 0.15

        this.vx += pushX
        this.vy += pushY
      }
    }

    // Apply velocity with friction
    this.x += this.vx + this.speedX
    this.y += this.vy - this.speedY
    this.vx *= 0.92
    this.vy *= 0.92

    this.life++

    // Fade in and out
    if (this.life < 50) {
      this.opacity = (this.life / 50) * (Math.random() * 0.5 + 0.2)
    } else if (this.life > this.maxLife - 50) {
      this.opacity = ((this.maxLife - this.life) / 50) * 0.5
    }

    // Reset when off screen or life ended
    if (this.y < -10 || this.life >= this.maxLife || this.x < -50 || this.x > this.canvas.width + 50) {
      this.reset()
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.globalAlpha = this.opacity
    ctx.fill()
    ctx.globalAlpha = 1
  }
}

export default function ParticleCanvas() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animationRef = useRef(null)
  const mouseRef = useRef({ x: null, y: null, radius: 150 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = null
      mouseRef.current.y = null
    }

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX
        mouseRef.current.y = e.touches[0].clientY
      }
    }

    const handleTouchEnd = () => {
      mouseRef.current.x = null
      mouseRef.current.y = null
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)

    // Create particles
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 12))
    particlesRef.current = Array.from({ length: particleCount }, () => new Particle(canvas))

    // Spread initial particles across screen
    particlesRef.current.forEach((p) => {
      p.y = Math.random() * canvas.height
      p.life = Math.random() * 200
    })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach(particle => {
        particle.update(mouseRef.current)
        particle.draw(ctx)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
