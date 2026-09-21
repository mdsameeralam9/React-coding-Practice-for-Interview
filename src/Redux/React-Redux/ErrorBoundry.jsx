import { Component } from "react";

class ErrorBoundry extends Component {
  state = {
    isError: false,
  };

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch(err) {
    console.log(err);
  }

  render() {
    const isErr = this.state.isError;
    return (
      <div className="wrapper">
        {isErr && <h1>Something wen wrong</h1>}
        {!isErr && this.props.children}
      </div>
    );
  }
}

export default ErrorBoundry;
