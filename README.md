# OBINexus WWW - Interactive Sales Showcase

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Three.js](https://img.shields.io/badge/Three.js-r128-black?logo=three.js)](https://threejs.org/)
[![OBINexus](https://img.shields.io/badge/OBINexus-Core-00ff88)](https://github.com/obinexus)
[![Deploy Status](https://img.shields.io/badge/Deploy-Live-success)](https://www.obinexus.org)

## 🚀 Overview

The OBINexus WWW repository contains interactive 3D sales demonstrations and technical showcases for the OBINexus ecosystem. Built with Three.js, these visualizations help potential customers, developers, and partners understand our revolutionary debugging, memory management, and service infrastructure technologies.

## 📦 What's Inside

```
www/
├── index.html              # Main landing page router
├── visualizers/           # Interactive 3D demonstrations
│   ├── diram/            # DIRAM debugger visualization
│   │   ├── components/   # React/Three.js components
│   │   └── styles/       # CSS for DIRAM viz
│   ├── bioergonomics/    # Bioergonomics infrastructure demos
│   ├── service-mesh/     # Service-first architecture viz
│   └── avatars/          # HITL ↔ HOTL avatar system
├── pages/                # Static showcase pages
│   ├── sales/           # Sales pitch decks
│   ├── technical/       # Technical deep-dives
│   └── case-studies/    # Implementation examples
├── assets/              # Shared resources
│   ├── models/          # 3D models and geometries
│   ├── shaders/         # Custom WebGL shaders
│   └── textures/        # Visual assets
└── scripts/             # Build and deployment scripts
```

## 🎯 Core Showcases

### 1. DIRAMC - Directed Instruction RAM Debugger
**Path:** `/visualizers/diram/`

Interactive 3D visualization showing:
- Library tracing architecture (.so file debugging)
- 95.4% quality coherence targeting
- Real-time memory allocation tracking
- GDB integration workflows

### 2. Bioergonomics Vision
**Path:** `/visualizers/bioergonomics/`

Demonstrates:
- Transformable housing systems
- Collapse-resistant infrastructure
- 7+7 to Level 10 progression system
- W→Z→Y→X resolution framework

### 3. Service-First Architecture
**Path:** `/visualizers/service-mesh/`

Shows the domain structure:
```
<service>.<operation>.obinexus.<department>.<division>.<country>.org
```

### 4. HITL ↔ HOTL Avatar System
**Path:** `/visualizers/avatars/`

Interactive demonstration of:
- Filter Mode (Human-In-The-Loop)
- Flash Mode (Human-Out-The-Loop)
- Bidirectional collaboration states
- Avatar personas (Uche, Eze, Obinexus)

## 🛠️ Technology Stack

- **Three.js r128** - 3D graphics engine
- **WebGL 2.0** - Hardware-accelerated graphics
- **React** - Component architecture (optional)
- **Vanilla JS** - Core interactions
- **CSS3** - Animations and styling
- **Web Workers** - Background processing

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/obinexus/www.git
cd www

# Install dependencies (if using npm)
npm install

# Run local development server
npm run dev

# Or use Python simple server
python3 -m http.server 8000

# Visit http://localhost:8000
```

## 🌐 Deployment

The showcase is designed to be deployed as static files:

```bash
# Build for production
npm run build

# Deploy to any static host
# Examples: GitHub Pages, Netlify, Vercel, AWS S3

# For GitHub Pages
npm run deploy:gh-pages
```

## 📊 Showcase URLs

Production deployments follow the OBINexus service-first pattern:

```
# Main showcase
sales.demo.obinexus.showcase.web.global.org

# Department-specific demos
sales.demo.obinexus.diram.debugging.uk.org
sales.demo.obinexus.bioergonomics.housing.ng.org
sales.demo.obinexus.avatars.ai.us.org
```

## 🎨 Creating New Showcases

### Basic Three.js Template

```javascript
// /visualizers/your-showcase/index.js
class YourShowcase {
    constructor(container) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 
            window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        
        this.init();
        this.create();
        this.animate();
    }
    
    init() {
        // Setup code
    }
    
    create() {
        // Create 3D objects
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        // Animation logic
        this.renderer.render(this.scene, this.camera);
    }
}
```

## 🔧 Configuration

### Environment Variables

```env
# .env
OBINEXUS_API_URL=https://api.obinexus.org
COHERENCE_TARGET=0.954
DEFAULT_MODE=filter
ENABLE_ANALYTICS=true
```

### Showcase Configuration

```javascript
// config/showcases.js
export const showcases = {
    diram: {
        title: "DIRAM Debugger",
        path: "/visualizers/diram/",
        features: ["trace", "debug", "analyze"],
        coherenceTarget: 0.954
    },
    // Add more showcases...
};
```

## 📈 Performance Guidelines

- Keep total bundle size under 2MB
- Optimize 3D models (use Draco compression)
- Implement LOD (Level of Detail) for complex scenes
- Use instancing for repeated geometries
- Target 60 FPS on mid-range devices
- Progressive loading for large assets

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Adding a Showcase

1. Fork the repository
2. Create feature branch: `git checkout -b showcase/your-feature`
3. Add your showcase in `/visualizers/`
4. Update the router in `index.html`
5. Add documentation
6. Submit pull request

## 📚 Documentation

- **Technical Docs**: [docs.obinexus.org](https://docs.obinexus.org)
- **Vision Documents**: [github.com/obinexus/vdocs](https://github.com/obinexus/vdocs)
- **API Reference**: [api.obinexus.org/docs](https://api.obinexus.org/docs)
- **YouTube Demos**: [@obinexus](https://youtube.com/@obinexus)

## 🔍 Related Repositories

- [obinexus/diram](https://github.com/obinexus/diram) - DIRAM core implementation
- [obinexus/diramc](https://github.com/obinexus/diramc) - DIRAM debugger CLI
- [obinexus/avatars](https://github.com/obinexus/avatars) - Avatar system
- [obinexus/vdocs](https://github.com/obinexus/vdocs) - Vision documentation

## 📊 Metrics & Analytics

The showcase tracks engagement metrics (with consent):
- Interaction patterns with 3D elements
- Feature interest heatmaps
- Time spent on demonstrations
- Conversion paths through showcases

## 🛡️ Security

- All showcases run client-side (no server data exposure)
- Content Security Policy (CSP) implemented
- No external dependencies from untrusted CDNs
- Regular security audits

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👤 Author

**Nnamdi Michael Okpala**
- GitHub: [@obinexus](https://github.com/obinexus)
- Vision: "When systems fail, build your own"

## 🙏 Acknowledgments

- Three.js community for the amazing 3D library
- All contributors to the OBINexus ecosystem
- The spirit of Uche (The Wise One) for guidance

---

**"From visualization to understanding, from demo to deployment - showcasing the future of defensive computing."**

#OBINexus #ThreeJS #WebGL #InteractiveDemo #DIRAM #Bioergonomics #HITL #HOTL