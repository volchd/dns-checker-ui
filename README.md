# DNS Checker UI

A modern DNS and email deliverability checker web app built with React 19, TypeScript, and Vite.

## Features
- Enter a domain and check its SPF, DKIM, DMARC, and overall deliverability score
- Clear error handling and helpful recommendations
- Responsive, fast, and easy to use
- Local/prod API endpoint switching via `public/config.json`

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm

### Installation
```bash
npm install
```

### Development
Start the local dev server:
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Configuration
Edit `public/config.json` to set your API endpoints for local and production environments:
```json
{
  "local": {
    "apiBaseUrl": "http://localhost:8000"
  },
  "production": {
    "apiBaseUrl": "https://api.example.com"
  }
}
```

## Project Structure
```
/ (root)
├── public/
│   └── config.json         # API endpoint config
├── src/
│   ├── App.tsx            # Main React component
│   ├── Dashboard.tsx      # Results display
│   ├── main.tsx           # App entry point
│   └── ...
├── index.html             # HTML entry
├── package.json           # Scripts & dependencies
├── tsconfig.json          # TypeScript config
└── README.md
```

## Tech Stack
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

## Testing
_No test framework is set up yet. PRs welcome!_

## License
MIT
