import { Component } from "react";

class ErrorBoundry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

 static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(info, stack) {
    console.log(info, stack);
  }

  render() {
    if (this.state.hasError) return <h1>Please Try Again</h1>;

    return this.props.children;
  }
}


export default ErrorBoundry