import './style.css'
import * as THREE from 'three'
import { CatModelViewer } from './cat.js'

// Three.js Background Animation
class BackgroundAnimation {
  constructor() {
    this.canvas = document.getElementById('background-canvas')
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: this.canvas, 
      alpha: true,
      antialias: true 
    })
    
    this.particles = []
    this.mouseX = 0
    this.mouseY = 0
    
    this.init()
    this.animate()
    this.handleResize()
    this.handleMouseMove()
  }
  
  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    this.camera.position.z = 5
    
    // Create particles
    const geometry = new THREE.SphereGeometry(0.02, 8, 8)
    const material = new THREE.MeshBasicMaterial({ 
      // Generate color between primary (#FF0056) and secondary (#F3682B) from style.css with random interpolation
      color: new THREE.Color().lerpColors(
        new THREE.Color('#FF0056'),
        new THREE.Color('#F3682B'),
        Math.random()
      )
    })
    
    for (let i = 0; i < 300; i++) {
      const particle = new THREE.Mesh(geometry, material)
      particle.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      )
      particle.velocity = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      }
      this.particles.push(particle)
      this.scene.add(particle)
    }
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    this.scene.add(ambientLight)
  }
  
  animate() {
    requestAnimationFrame(() => this.animate())
    
    // Update particles
    this.particles.forEach(particle => {
      particle.position.x += particle.velocity.x
      particle.position.y += particle.velocity.y
      particle.position.z += particle.velocity.z
      
      // Bounce off boundaries
      if (Math.abs(particle.position.x) > 10) particle.velocity.x *= -1
      if (Math.abs(particle.position.y) > 10) particle.velocity.y *= -1
      if (Math.abs(particle.position.z) > 5) particle.velocity.z *= -1
      
      // Rotate particles
      particle.rotation.x += 0.01
      particle.rotation.y += 0.01
    })
    
    // Move camera based on mouse
    this.camera.position.x += (this.mouseX * 0.5 - this.camera.position.x) * 0.05
    this.camera.position.y += (-this.mouseY * 0.5 - this.camera.position.y) * 0.05
    this.camera.lookAt(0, 0, 0)
    
    this.renderer.render(this.scene, this.camera)
  }
  
  handleResize() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    })
  }
  
  handleMouseMove() {
    document.addEventListener('mousemove', (event) => {
      this.mouseX = (event.clientX / window.innerWidth) * 2 - 1
      this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    })
  }
}

// Portfolio Functionality
class Portfolio {
  constructor() {
    this.init()
  }
  
  init() {
    this.initSmoothScrolling()
    this.initScrollAnimations()
    this.initMobileMenu()
    this.initActiveNavigation()
  }
  
  initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link')
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const targetId = link.getAttribute('href')
        const targetSection = document.querySelector(targetId)
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 70 // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          })
        }
      })
    })
  }
  
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)
    
    // Add fade-in class to elements
    const sections = document.querySelectorAll('.section')
    sections.forEach(section => {
      section.classList.add('fade-in')
      observer.observe(section)
    })
    
    // Animate stats on scroll
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateStats()
        }
      })
    }, { threshold: 0.5 })
    
    const statsSection = document.querySelector('.about-stats')
    if (statsSection) {
      statsObserver.observe(statsSection)
    }
  }
  
  animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number')
    
    statNumbers.forEach(stat => {
      const target = parseInt(stat.textContent)
      const duration = 2000
      const increment = target / (duration / 16)
      let current = 0
      
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        stat.textContent = Math.floor(current) + '+'
      }, 16)
    })
  }
  
  initMobileMenu() {
    const hamburger = document.querySelector('.hamburger')
    const navMenu = document.querySelector('.nav-menu')
    
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active')
        navMenu.classList.toggle('active')
      })
      
      // Close menu when clicking on a link
      const navLinks = document.querySelectorAll('.nav-link')
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active')
          navMenu.classList.remove('active')
        })
      })
    }
  }
  
  initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]')
    const navLinks = document.querySelectorAll('.nav-link')
    
    window.addEventListener('scroll', () => {
      let current = ''
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.offsetHeight
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id')
        }
      })
      
      navLinks.forEach(link => {
        link.classList.remove('active')
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active')
        }
      })
    })
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new BackgroundAnimation()
  new Portfolio()
  new CatModelViewer()
  
  // Add loading animation
  document.body.classList.add('loaded')
})

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
  // Add hover effects to project cards
  const projectCards = document.querySelectorAll('.project-card')
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)'
    })
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)'
    })
  })
  
  // Add typing effect to hero title
  const heroTitle = document.querySelector('.hero-title')
  if (heroTitle) {
    const text = heroTitle.textContent
    heroTitle.textContent = ''
    
    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }
    
    setTimeout(typeWriter, 1000)
  }
})
