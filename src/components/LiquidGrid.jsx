import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Color, Vector2, Vector3 } from 'three'

/* 
  Custom Shader Material for the Liquid Grid
  Now with Mouse Interaction and Theme support controls
*/
const vertexShader = `
  varying vec2 vUv;
  varying float vElevation;
  uniform float uTime;
  uniform vec2 uMouse;

  // Simple pseudo-random noise
  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // 2D Noise
  float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Mouse Interaction
    // Calculate distance from mouse to vertex (in UV space approx)
    float dist = distance(uv, uMouse);
    // Create a localized ripple effect based on mouse distance
    // Smoother falloff
    float mouseEffect = smoothstep(0.5, 0.0, dist) * 2.5; 

    // Liquid distortion effect
    // Slower, smoother noise
    float noiseVal = noise(pos.xy * 0.03 + uTime * 0.08);
    
    // Gentle floating waves
    float wave1 = sin(pos.x * 0.05 + uTime * 0.15) * 1.5;
    float wave2 = cos(pos.y * 0.05 + uTime * 0.12) * 1.5;

    // Combine base liquid movement with mouse interaction
    // Significantly reduced amplitude for elegance
    float elevation = noiseVal * 1.5 + wave1 + wave2 + (mouseEffect * sin(uTime * 2.0));
    
    pos.z += elevation;
    vElevation = elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  varying float vElevation;
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uOpacity;

  void main() {
    // Create a grid pattern
    float gridX = step(0.98, fract(vUv.x * 40.0));
    float gridY = step(0.98, fract(vUv.y * 40.0));
    
    float grid = max(gridX, gridY);

    // Fade out edges
    float alpha = grid * uOpacity;
    
    // Distance from center fade
    float dist = distance(vUv, vec2(0.5));
    alpha *= (1.0 - smoothstep(0.3, 0.5, dist));

    // Highlight active areas (higher elevation = brighter)
    vec3 color = uColor;
    color += vec3(vElevation * 0.05);

    gl_FragColor = vec4(color, alpha);
  }
`

const LiquidPlane = () => {
    const meshRef = useRef()
    const { size, viewport } = useThree()

    // Theme management
    const [themeColor, setThemeColor] = useState(new Color('#4a5568'))
    const [gridOpacity, setGridOpacity] = useState(0.4)

    useEffect(() => {
        const updateTheme = () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
            if (isDark) {
                // Dark Mode: Brighter/Cyan-ish to pop
                setThemeColor(new Color('#5A8A9A')) // Cyan Blue
                setGridOpacity(0.3)
            } else {
                // Light Mode: Darker Steel Blue
                setThemeColor(new Color('#6B7A9E')) // Steel Blue
                setGridOpacity(0.4)
            }
        }

        // Initial check
        updateTheme()

        // Observe changes to data-theme attribute
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    updateTheme()
                }
            })
        })

        observer.observe(document.documentElement, { attributes: true })

        return () => observer.disconnect()
    }, [])

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColor: { value: new Color('#4a5568') },
            uMouse: { value: new Vector2(0.5, 0.5) },
            uOpacity: { value: 0.4 }
        }),
        []
    )

    // Update uniforms when state changes
    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.uColor.value.lerp(themeColor, 0.1) // Smooth transition
            meshRef.current.material.uniforms.uOpacity.value = gridOpacity
        }
    }, [themeColor, gridOpacity])

    // Track mouse
    const mouse = useRef(new Vector2(0.5, 0.5))

    /* 
       We need to track mouse interaction relative to the window.
       Since the canvas is full screen, normalized window coordinates work well.
    */
    useEffect(() => {
        const handleMouseMove = (event) => {
            // Normalize coordinates to [0, 1] for UV space mapping
            // We invert Y because UV (0,0) is usually bottom-left but screen is top-left, 
            // actually for this plane setup let's test straight mapping.
            mouse.current.x = event.clientX / window.innerWidth
            mouse.current.y = 1.0 - (event.clientY / window.innerHeight)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])


    useFrame((state) => {
        const { clock } = state
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime()

            // Lerp mouse for smoothness
            meshRef.current.material.uniforms.uMouse.value.lerp(mouse.current, 0.1)

            // Continually lerp color for smooth theme transitions
            meshRef.current.material.uniforms.uColor.value.lerp(themeColor, 0.05)
        }
    })

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -5, -10]}>
            <planeGeometry args={[100, 100, 64, 64]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
            />
        </mesh>
    )
}

const LiquidGrid = () => {
    return (
        <div className="liquid-grid-container" style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
                <LiquidPlane />
            </Canvas>
        </div>
    )
}

export default LiquidGrid
