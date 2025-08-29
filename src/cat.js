import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Cat Model Viewer
export class CatModelViewer {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.model = null;
    this.container = document.getElementById('cat-model-container');

    this.init();
    this.handleResize();
    this.animate();
  }
  
  init() {
    // Create scene and camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.physicallyCorrectLights = true;

    // Add renderer to DOM
    this.container.appendChild(this.renderer.domElement);
    
    // Add orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.set(0, 0, 0);
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
    // this.controls.maxPolarAngle = Math.PI / 2;
    // this.controls.minPolarAngle = Math.PI / 2;

    this.camera.position.set(10, 10, 18);
    this.controls.update();
    this.controls.maxPolarAngle = this.controls.getPolarAngle();
    this.controls.minPolarAngle = this.controls.getPolarAngle();

    // Add lights
    this.addLights();

    // Load model
    this.loadModel();
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);
    
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(-5, 5, 5);
    directionalLight1.castShadow = true;
    directionalLight1.shadow.mapSize.width = 2048;
    directionalLight1.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight2.position.set(5, 5, 5);
    directionalLight2.castShadow = true;
    directionalLight2.shadow.mapSize.width = 2048;
    directionalLight2.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight3.position.set(0, 10, -10);
    directionalLight3.castShadow = true;
    directionalLight3.shadow.mapSize.width = 2048;
    directionalLight3.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight3);
    
    
    const fillLight = new THREE.DirectionalLight(0x00c0c3, 0.5);
    fillLight.position.set(5, 0, 5);
    this.scene.add(fillLight);
  }
  
  loadModel() {
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();
    
    // Load MTL material first
    mtlLoader.load('/cat.mtl', (materials) => {
      materials.preload();
      
      // Set materials for OBJ loader
      objLoader.setMaterials(materials);
      
      // Load OBJ model with materials
      objLoader.load('/cat.obj', (object) => {
        const cat = object;
        this.model = new THREE.Group();
        cat.position.set(0, 0, -5);
        this.model.add(cat);
        this.model.scale.set(1.5, 1.5, 1.5);
        this.model.rotation.y = Math.PI;
        
        // Enable shadows and ensure materials are not transparent
        cat.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        this.scene.add(this.model);

        // Hide loading indicator
        const loadingElement = this.container.querySelector('.model-loading');
        if (loadingElement) {
          loadingElement.style.display = 'none';
        }
        
      }, () => {}, (error) => {
        console.error('Error loading OBJ model:', error);
        
        // Hide loading indicator
        const loadingElement = this.container.querySelector('.model-loading');
        if (loadingElement) {
          loadingElement.style.display = 'none';
        }
      });
      
    }, () => {}, (error) => {
      console.error('Error loading MTL material:', error);
    });
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    
    // Add oscillating rotation to the cat model
    if (this.model) {
      this.model.rotation.y += 0.005;
    }
    
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }
  
  handleResize() {
    window.addEventListener('resize', () => {
      if (this.container) {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      }
    });
  }
}

