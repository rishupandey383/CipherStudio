import type { SandpackFiles, Project } from './types';

export const DEFAULT_PROJECT_FILES: SandpackFiles = {
  '/public/index.html': {
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`,
    hidden: true,
  },
  '/src/styles.css': {
    code: `body {
  font-family: sans-serif;
  -webkit-font-smoothing: auto;
  -moz-font-smoothing: auto;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: auto;
  text-rendering: optimizeLegibility;
  font-smooth: always;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

h1 {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
}
`,
  },
  '/src/App.js': {
    code: `import './styles.css';

export default function App() {
  return (
    <div className="app">
      <h1>Welcome to CipherStudio!</h1>
      <p>Start editing files to see the magic happen.</p>
    </div>
  );
}`,
  },
  '/src/index.js': {
    code: `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
    hidden: true,
  },
  '/package.json': {
    code: JSON.stringify(
      {
        dependencies: {
          react: '^18.0.0',
          'react-dom': '^18.0.0',
          'react-scripts': '^5.0.0',
        },
        main: '/src/index.js',
      },
      null,
      2
    ),
    hidden: true,
  },
};

export const DEFAULT_TEST_PROJECT: Project = {
  id: 'default-test-project-01',
  name: 'Test Project',
  description: 'My first React app',
  createdAt: new Date().toISOString(),
  files: DEFAULT_PROJECT_FILES,
};

// Template Files
export const AI_STORY_GENERATOR_FILES: SandpackFiles = {
  ...DEFAULT_PROJECT_FILES,
  '/src/App.js': {
    code: `import React, { useState } from 'react';
import './styles.css';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateStory = async () => {
    if (!prompt) {
      alert('Please enter a prompt!');
      return;
    }
    setIsLoading(true);
    setStory('');
    // TODO: Replace this with your actual AI API call
    console.log("Generating story for prompt:", prompt);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
    const generatedStory = \`Once upon a time, in a world where \${prompt}, there was an unexpected adventure waiting to happen. The journey was long and the challenges were great, but the outcome was truly magical.\`;
    setStory(generatedStory);
    setIsLoading(false);
  };

  return (
    <div className="app">
      <h1>AI Story Generator</h1>
      <p>Enter a prompt and let the AI write a story for you.</p>
      <div className="story-generator">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., a cat who could talk to ghosts"
          rows="3"
        />
        <button onClick={generateStory} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Story'}
        </button>
        {story && (
          <div className="story-output">
            <h2>Your Story:</h2>
            <p>{story}</p>
          </div>
        )}
      </div>
    </div>
  );
}`,
  },
   '/src/styles.css': {
    code: `body {
  font-family: sans-serif;
  -webkit-font-smoothing: auto;
  -moz-font-smoothing: auto;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
}

.story-generator {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #0072ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}

.story-output {
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid #eee;
  border-radius: 8px;
  text-align: left;
  background-color: #f9f9f9;
}
`,
  },
};

export const ECOMMERCE_STOREFRONT_FILES: SandpackFiles = {
    ...DEFAULT_PROJECT_FILES,
    '/src/App.js': {
        code: `import React, { useState } from 'react';
import './styles.css';
import products from './products';

export default function App() {
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
    alert(\`\${product.name} added to cart!\`);
  };

  return (
    <div className="app">
      <header>
        <h1>Modern Store</h1>
        <p>Cart Items: {cart.length}</p>
      </header>
      <main className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p className="price">\${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </main>
    </div>
  );
}`
    },
    '/src/products.js': {
        code: `const products = [
  { id: 1, name: 'Wireless Headphones', price: 99, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400' },
  { id: 2, name: 'Smart Watch', price: 199, imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400' },
  { id: 3, name: 'Digital Camera', price: 299, imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400' },
  { id: 4, name: 'VR Headset', price: 399, imageUrl: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400' },
];
export default products;`
    },
    '/src/styles.css': {
        code: `body { font-family: sans-serif; margin: 0; background-color: #f4f4f9; }
.app { max-width: 1200px; margin: 0 auto; padding: 20px; }
header { text-align: center; margin-bottom: 40px; }
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
.product-card { background: white; border: 1px solid #ddd; border-radius: 8px; padding: 20px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
.product-card img { max-width: 100%; height: 150px; object-fit: cover; border-radius: 4px; }
.product-card h2 { font-size: 1.2rem; margin: 10px 0; }
.product-card .price { font-size: 1.1rem; color: #333; font-weight: bold; margin-bottom: 15px; }
button { width: 100%; padding: 10px; font-size: 1rem; background-color: #0072ff; color: white; border: none; border-radius: 4px; cursor: pointer; }`
    }
};

export const PORTFOLIO_3D_FILES: SandpackFiles = {
    ...DEFAULT_PROJECT_FILES,
    '/src/App.js': {
        code: `import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import './styles.css';

function Box(props) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} />
    </Canvas>
  );
}`
    },
    '/package.json': {
        code: JSON.stringify({
            dependencies: {
                react: '^18.0.0',
                'react-dom': '^18.0.0',
                'react-scripts': '^5.0.0',
                '@react-three/fiber': 'latest',
                '@react-three/drei': 'latest',
                three: 'latest'
            },
            main: '/src/index.js',
        }, null, 2),
        hidden: true,
    },
    '/src/styles.css': {
        code: `body { margin: 0; }
canvas { display: block; width: 100vw; height: 100vh; }`
    }
};