# CSA Kirinyaga WeAXELAbsite
A simple React web application for CSA Kirinyaga, built with Vite, TypeScript, and Tailwind CSS.


## File Structure

### Core Files
- `index.html`: Main HTML entry point with root div for React.
- `src/main.tsx`: React app entry point, renders the App component.
- `src/App.tsx`: Main app component with navigation and login state.
- `src/Login.tsx`: Login modal component with form validation.
- `src/index.css`: Global styles with Tailwind imports and custom classes.
NB -- core file FUNCTIONALITY  are further explained kwa the files themselves

### Configuration Files
`package.json`: Project dependencies, scripts, and metadata.
`vite.config.ts`: Vite build tool configuration.
`tsconfig.json`: TypeScript config for source code.
`tsconfig.node.json`: TypeScript config for build files.
`tailwind.config.js`: Tailwind CSS configuration.
`postcss.config.js`: PostCSS configuration for CSS processing.
`package-lock.json`: Dependency lock file.

## Technologies Used

**React**: Component-based UI library.
**TypeScript**: Typed JavaScript for better code quality.
**Vite**: Fast build tool and dev server. You can google for further explanation on using vite
**Tailwind CSS**:  for styling 
**PostCSS**: is just an auto prefixerr.

# How to Run
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Build for production: `npm run build`
4. Preview build: `npm run preview`
if problems occur you should check for vite if is installed if not you can run { run npm create vite@latest}

## Login Credentials 
this are hard coded for easy dev.

- Username: admin
- Password: password

