import ParticleCanvas from './components/ParticleCanvas'
import ColorOrbs from './components/ColorOrbs'
import HeroContent from './components/HeroContent'

function App() {
  return (
    <div className="relative min-h-screen bg-dark overflow-hidden">
      {/* Animated particle background */}
      <ParticleCanvas />

      {/* Decorative color orbs */}
      <ColorOrbs />

      {/* Main content */}
      <HeroContent />
    </div>
  )
}

export default App
