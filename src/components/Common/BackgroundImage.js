import React, { PureComponent } from "react";
import { ImageBackground, Platform } from "react-native";

// A valid source is either an object with an uri key or a number (from a `require` call)
const isValidSource = source => {
	return typeof source === 'number' || typeof source === 'object'
}
let externalPropsTransformer = null;

class BackgroundImage extends PureComponent {
  static propTypes = {
    ...ImageBackground.propTypes
  };

  static setPropsTransformer(transformer) { externalPropsTransformer = transformer; }

  static getPropsTransformer() { return externalPropsTransformer; }

  constructor(props) {
    super(props);

    this.captureNativeComponentRef = this.captureNativeComponentRef.bind(this);
    this.state = {
      transformedProps: this.createTransformedProps(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        transformedProps: this.createTransformedProps(nextProps)
      });
    }
  }

  setNativeProps(nativeProps) { this.nativeComponent.setNativeProps(nativeProps); }

  createTransformedProps(props) {
    let transformedProps = { ...props };
    const { source, defaultSource } = props;

    if (Platform.OS === "android" && !isValidSource(source)) {
      transformedProps.source =
        defaultSource || require("../../../assets/images/transparent.png");
      transformedProps.style = { width: null, height: null, ...props.style };
    }

    transformedProps.ref = this.captureNativeComponentRef;
    if (externalPropsTransformer) {
      transformedProps = externalPropsTransformer(transformedProps);
    }

    return transformedProps;
  }

  captureNativeComponentRef(component) { this.nativeComponent = component; }

  render() {
    const { transformedProps } = this.state;

    return <ImageBackground {...transformedProps} />;
  }
}

export { BackgroundImage };
