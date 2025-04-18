
import { useEffect, useRef } from "react";

// Since we can't use OGL directly in React without proper bundling setup,
// I'll create a simplified version using Canvas and WebGL

export default function Aurora(props: {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
}) {
  const {
    colorStops = ["#8B5CF6", "#00f2c0", "#0ea5e9"],
    amplitude = 1.0,
    blend = 0.5,
    speed = 0.5
  } = props;
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: true
    });
    
    if (!gl) {
      console.error("WebGL2 not supported");
      return;
    }

    // Set up WebGL
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    canvas.style.backgroundColor = 'transparent';

    // Resize function
    const resize = () => {
      if (!container || !canvas) return;
      
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      
      canvas.width = width;
      canvas.height = height;
      gl!.viewport(0, 0, width, height);
    };

    // Create shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, `#version 300 es
      in vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, `#version 300 es
      precision highp float;

      uniform float uTime;
      uniform float uAmplitude;
      uniform vec3 uColorStops[3];
      uniform vec2 uResolution;
      uniform float uBlend;

      out vec4 fragColor;

      vec3 permute(vec3 x) {
        return mod(((x * 34.0) + 1.0) * x, 289.0);
      }

      float snoise(vec2 v){
        const vec4 C = vec4(
            0.211324865405187, 0.366025403784439,
            -0.577350269189626, 0.024390243902439
        );
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);

        vec3 p = permute(
            permute(i.y + vec3(0.0, i1.y, 1.0))
          + i.x + vec3(0.0, i1.x, 1.0)
        );

        vec3 m = max(
            0.5 - vec3(
                dot(x0, x0),
                dot(x12.xy, x12.xy),
                dot(x12.zw, x12.zw)
            ), 
            0.0
        );
        m = m * m;
        m = m * m;

        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      struct ColorStop {
        vec3 color;
        float position;
      };

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;
        
        ColorStop colors[3];
        colors[0] = ColorStop(uColorStops[0], 0.0);
        colors[1] = ColorStop(uColorStops[1], 0.5);
        colors[2] = ColorStop(uColorStops[2], 1.0);
        
        vec3 rampColor;
        
        // Manual color ramp implementation
        int index = 0;
        for (int i = 0; i < 2; i++) {
           ColorStop currentColor = colors[i];
           bool isInBetween = currentColor.position <= uv.x;
           index = int(mix(float(index), float(i), float(isInBetween)));
        }
        
        ColorStop currentColor = colors[index];
        ColorStop nextColor = colors[index + 1];
        float range = nextColor.position - currentColor.position;
        float lerpFactor = (uv.x - currentColor.position) / range;
        rampColor = mix(currentColor.color, nextColor.color, lerpFactor);
        
        float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
        height = exp(height);
        height = (uv.y * 2.0 - height + 0.2);
        float intensity = 0.6 * height;
        
        // midPoint is fixed; uBlend controls the transition width.
        float midPoint = 0.20;
        float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
        
        vec3 auroraColor = intensity * rampColor;
        
        // Premultiplied alpha output.
        fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
      }
    `);
    gl.compileShader(fragmentShader);

    // Create program
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Check shader compilation
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error('Vertex shader error:', gl.getShaderInfoLog(vertexShader));
      return;
    }
    
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('Fragment shader error:', gl.getShaderInfoLog(fragmentShader));
      return;
    }
    
    // Check program linking
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('WebGL program error:', gl.getProgramInfoLog(program));
      return;
    }

    // Create triangle geometry
    const vertices = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Set up attributes
    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Set up uniforms
    const uTimeLocation = gl.getUniformLocation(program, 'uTime');
    const uAmplitudeLocation = gl.getUniformLocation(program, 'uAmplitude');
    const uColorStopsLocation = gl.getUniformLocation(program, 'uColorStops');
    const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');
    const uBlendLocation = gl.getUniformLocation(program, 'uBlend');

    // Function to convert hex to rgb
    const hexToRgb = (hex: string) => {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
      
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
      ] : [0, 0, 0];
    };

    // Convert color stops to rgb
    const colorStopsRgb = colorStops.map(hexToRgb).flat();

    // Set initial uniform values
    gl.uniform3fv(uColorStopsLocation, new Float32Array(colorStopsRgb));
    gl.uniform1f(uAmplitudeLocation, amplitude);
    gl.uniform1f(uBlendLocation, blend);
    
    // Animation loop
    let startTime = performance.now();
    
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      const currentTime = performance.now();
      const elapsedTime = (currentTime - startTime) * 0.001 * speed;
      
      gl.uniform1f(uTimeLocation, elapsedTime);
      gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);
      
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // Initial resize and start animation
    resize();
    window.addEventListener('resize', resize);
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);
      gl.deleteBuffer(vertexBuffer);
    };
  }, [colorStops, amplitude, blend, speed]);

  return (
    <div ref={containerRef} className="aurora-container">
      <canvas ref={canvasRef} className="absolute w-full h-full" />
    </div>
  );
}
