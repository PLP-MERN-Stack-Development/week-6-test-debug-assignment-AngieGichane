import React, { Component } from 'react';
import { Typography, Button, Box } from '@mui/material';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body1" paragraph>
            We're sorry for the inconvenience. Our team has been notified.
          </Typography>
          {process.env.NODE_ENV === 'development' && (
            <Box sx={{ mt: 2, textAlign: 'left', p: 2, backgroundColor: '#f5f5f5' }}>
              <Typography variant="subtitle1">Error details:</Typography>
              <Typography variant="body2" component="pre">
                {this.state.error && this.state.error.toString()}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1 }}>Stack trace:</Typography>
              <Typography variant="body2" component="pre">
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </Typography>
            </Box>
          )}
          <Button 
            variant="contained" 
            color="primary" 
            onClick={this.handleReset}
            sx={{ mt: 2 }}
          >
            Try Again
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;