import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null, errorInfo: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { this.setState({ errorInfo }); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: '#900', background: '#fee', minHeight: '100vh', fontFamily: 'monospace', zIndex: 9999, position: 'relative' }}>
          <h2 style={{fontSize: '24px', fontWeight: 'bold'}}>React Crash:</h2>
          <p style={{fontSize: '18px', fontWeight: 'bold'}}>{this.state.error && this.state.error.toString()}</p>
          <pre style={{whiteSpace: 'pre-wrap', marginTop: '1rem'}}>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
