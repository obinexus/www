// components/DIRAM3D.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

class DIRAM3DVisualizer {
  constructor(container) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.memoryBlocks = [];
    this.dataFlows = [];
    this.mode = 'filter'; // filter or flash
    this.coherenceLevel = 0.954;
    
    this.init();
    this.createDIRAMStructure();
    this.animate();
  }

  init() {
    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(15, 10, 15);

    // Renderer with transparency
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0.1);
    this.container.appendChild(this.renderer.domElement);

    // Controls for accessibility
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    
    // Bloom effect for that DIRAM glow
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.5, 0.4, 0.85
    );
    this.composer.addPass(bloomPass);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 5);
    this.scene.add(directionalLight);
  }

  createDIRAMStructure() {
    // Core Memory Grid (4x4x4x4 tensor visualization)
    const gridSize = 4;
    const spacing = 3;
    
    // Create memory blocks
    for (let w = 0; w < gridSize; w++) {
      for (let z = 0; z < gridSize; z++) {
        for (let y = 0; y < gridSize; y++) {
          for (let x = 0; x < gridSize; x++) {
            const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
            const material = new THREE.MeshPhongMaterial({
              color: this.getBlockColor(x, y, z, w),
              emissive: this.getBlockColor(x, y, z, w),
              emissiveIntensity: 0.2,
              transparent: true,
              opacity: 0.7
            });
            
            const block = new THREE.Mesh(geometry, material);
            block.position.set(
              (x - 1.5) * spacing,
              (y - 1.5) * spacing + w * 0.5,
              (z - 1.5) * spacing
            );
            
            // Store metadata for interaction
            block.userData = {
              x, y, z, w,
              type: 'memory_block',
              state: 'idle',
              allocation: null
            };
            
            this.memoryBlocks.push(block);
            this.scene.add(block);
          }
        }
      }
    }

    // Create Gate System (NOT, XOR, AND)
    this.createGateSystem();
    
    // Create Data Flow Particles
    this.createDataFlow();
    
    // Create Coherence Indicator
    this.createCoherenceIndicator();
  }

  createGateSystem() {
    // Three-gate logic visualization
    const gates = [
      { name: 'NOT', color: 0xff0000, position: new THREE.Vector3(-8, 0, 0) },
      { name: 'XOR', color: 0x00ff00, position: new THREE.Vector3(0, 0, -8) },
      { name: 'AND', color: 0x0000ff, position: new THREE.Vector3(8, 0, 0) }
    ];

    gates.forEach(gate => {
      // Gate structure
      const geometry = new THREE.TetrahedronGeometry(1.5);
      const material = new THREE.MeshPhongMaterial({
        color: gate.color,
        emissive: gate.color,
        emissiveIntensity: 0.3,
        wireframe: true
      });
      
      const gateMesh = new THREE.Mesh(geometry, material);
      gateMesh.position.copy(gate.position);
      gateMesh.userData = { type: 'gate', name: gate.name };
      
      this.scene.add(gateMesh);
      
      // Connection lines to memory grid
      const points = [
        gate.position,
        new THREE.Vector3(0, 0, 0)
      ];
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: gate.color,
        opacity: 0.3,
        transparent: true
      });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      this.scene.add(line);
    });
  }

  createDataFlow() {
    // Particle system for data flow visualization
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      // Color based on mode (filter=blue, flash=orange)
      const color = this.mode === 'filter' 
        ? new THREE.Color(0x4444ff)
        : new THREE.Color(0xff8800);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.6
    });
    
    this.dataParticles = new THREE.Points(geometry, material);
    this.scene.add(this.dataParticles);
  }

  createCoherenceIndicator() {
    // Visual coherence meter (95.4% target)
    const geometry = new THREE.RingGeometry(5, 5.5, 32);
    const material = new THREE.MeshBasicMaterial({
      color: this.coherenceLevel >= 0.954 ? 0x00ff00 : 0xff0000,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3
    });
    
    this.coherenceRing = new THREE.Mesh(geometry, material);
    this.coherenceRing.position.y = -8;
    this.coherenceRing.rotation.x = Math.PI / 2;
    this.scene.add(this.coherenceRing);
  }

  getBlockColor(x, y, z, w) {
    // Color based on position in 4D tensor
    const hue = ((x + y + z + w) / 16) * 360;
    return new THREE.Color(`hsl(${hue}, 70%, 50%)`);
  }

  // Animation methods
  animateMemoryBlocks() {
    this.memoryBlocks.forEach((block, index) => {
      // Pulse effect for active blocks
      if (block.userData.state === 'active') {
        const scale = 1 + Math.sin(Date.now() * 0.003 + index) * 0.1;
        block.scale.set(scale, scale, scale);
      }
      
      // Rotation for allocated blocks
      if (block.userData.allocation) {
        block.rotation.y += 0.01;
      }
    });
  }

  animateDataFlow() {
    if (this.dataParticles) {
      const positions = this.dataParticles.geometry.attributes.position.array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Hamiltonian path movement
        positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.05;
        positions[i + 1] += Math.cos(Date.now() * 0.001 + i) * 0.05;
        positions[i + 2] += Math.sin(Date.now() * 0.001 + i * 0.5) * 0.05;
        
        // Wrap around bounds
        if (Math.abs(positions[i]) > 10) positions[i] *= -0.9;
        if (Math.abs(positions[i + 1]) > 10) positions[i + 1] *= -0.9;
        if (Math.abs(positions[i + 2]) > 10) positions[i + 2] *= -0.9;
      }
      
      this.dataParticles.geometry.attributes.position.needsUpdate = true;
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    this.animateMemoryBlocks();
    this.animateDataFlow();
    
    // Rotate coherence ring
    if (this.coherenceRing) {
      this.coherenceRing.rotation.z += 0.01;
    }
    
    this.controls.update();
    this.composer.render();
  }

  // Public methods for interaction
  allocateMemory(blockIndex) {
    if (blockIndex < this.memoryBlocks.length) {
      const block = this.memoryBlocks[blockIndex];
      block.userData.state = 'active';
      block.userData.allocation = Date.now();
      
      // Visual feedback
      block.material.emissiveIntensity = 0.8;
      setTimeout(() => {
        block.material.emissiveIntensity = 0.2;
      }, 500);
    }
  }

  switchMode(newMode) {
    this.mode = newMode;
    // Update particle colors
    this.createDataFlow();
  }

  setCoherence(level) {
    this.coherenceLevel = level;
    if (this.coherenceRing) {
      this.coherenceRing.material.color.set(
        level >= 0.954 ? 0x00ff00 : 0xff0000
      );
    }
  }
}

export default DIRAM3DVisualizer;
