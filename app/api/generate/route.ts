// What this code does:
// - Creates an API endpoint at `/api/generate`
// - Takes the user's prompt
// - Sends it to OpenAI with instructions to generate accessible React code
// - Returns the generated code back to your frontend

// import OpenAI from 'openai';
// import { NextRequest, NextResponse } from 'next/server';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req: NextRequest) {
//   try {
//     const { prompt } = await req.json();

//     const completion = await openai.chat.completions.create({
//       model: 'gpt-4o-mini',
//       messages: [
//         {
//           role: 'system',
//           content: `You are an expert React developer who specializes in creating accessible, production-ready components.

// Generate React components based on user descriptions with these requirements:
// - Use TypeScript with proper type definitions
// - Use Tailwind CSS for styling (utility classes only)
// - Include comprehensive accessibility features:
//   * Semantic HTML elements (button, nav, header, main, etc.)
//   * ARIA labels, roles, and properties where appropriate
//   * Keyboard navigation support (Tab, Enter, Escape, Arrow keys)
//   * Focus management and visible focus indicators
//   * Screen reader friendly text
// - Use React best practices (proper hooks, no prop drilling for simple components)
// - Make components responsive (mobile-first approach)
// - Add helpful comments explaining accessibility choices

// Output ONLY the component code with no markdown formatting, no explanations, and no backticks. Just the raw TypeScript/React code.`,
//         },
//         {
//           role: 'user',
//           content: prompt,
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 2000,
//     });

//     const code = completion.choices[0]?.message?.content || '';

//     return NextResponse.json({ code });
//   } catch (error) {
//     console.error('OpenAI API Error:', error);
//     return NextResponse.json(
//       { error: 'Failed to generate code. Please try again.' },
//       { status: 500 }
//     );
//   }
// }



import { NextRequest, NextResponse } from 'next/server';

// Mock code templates based on common component types
const mockResponses: { [key: string]: string } = {
  button: `export default function Button() {
  return (
    <button
      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg 
                 hover:bg-blue-700 focus:outline-none focus:ring-2 
                 focus:ring-blue-500 focus:ring-offset-2 
                 transition-colors duration-200"
      aria-label="Click me button"
    >
      Click Me
    </button>
  );
}`,

  card: `export default function Card() {
  return (
    <div
      className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"
      role="article"
    >
      <img
        className="w-full h-48 object-cover"
        src="https://via.placeholder.com/400x300"
        alt="Card image"
      />
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2 text-gray-800">Card Title</h2>
        <p className="text-gray-700 text-base">
          This is a beautiful card component with an image, title, and description.
          Perfect for displaying content in a grid layout.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          aria-label="Learn more"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}`,

  modal: `import { useState } from 'react';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        aria-label="Open modal"
      >
        Open Modal
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 id="modal-title" className="text-2xl font-bold mb-4">
              Modal Title
            </h2>
            <p className="text-gray-700 mb-6">
              This is a modal dialog with proper accessibility features including
              focus trapping and ARIA attributes.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              aria-label="Close modal"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}`,

  form: `import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      aria-label="Contact form"
    >
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none 
                     focus:ring-2 focus:ring-blue-500"
          required
          aria-required="true"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none 
                     focus:ring-2 focus:ring-blue-500"
          required
          aria-required="true"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
          Message
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none 
                     focus:ring-2 focus:ring-blue-500"
          required
          aria-required="true"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
}`,

  default: `export default function Component() {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Custom Component
      </h2>
      <p className="text-gray-600">
        This is a responsive component with accessibility features including
        semantic HTML, proper contrast ratios, and keyboard navigation support.
      </p>
      <button
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg 
                   hover:bg-indigo-700 focus:outline-none focus:ring-2 
                   focus:ring-indigo-500 focus:ring-offset-2"
        aria-label="Action button"
      >
        Take Action
      </button>
    </div>
  );
}`
};

// Function to detect what type of component is being requested
function detectComponentType(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('button')) return 'button';
  if (lowerPrompt.includes('card')) return 'card';
  if (lowerPrompt.includes('modal') || lowerPrompt.includes('dialog')) return 'modal';
  if (lowerPrompt.includes('form')) return 'form';
  
  return 'default';
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    // Simulate AI thinking time (makes it feel realistic)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Detect component type and return appropriate mock code
    const componentType = detectComponentType(prompt);
    const code = mockResponses[componentType];

    return NextResponse.json({ code });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate code' },
      { status: 500 }
    );
  }
}