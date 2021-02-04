import React from "react";
import { Animated, Text, PanResponder, View } from "react-native";
//import WebView from "react-native-webview";
/*
function Link(props) {
  return (
    <Text
      {...props}
      accessibilityRole="link"
      style={StyleSheet.compose(styles.link, props.style)}
    />
  );
}
onPanResponderGrant: () => {
  const x = this.pan.x._value;
  const y = this.pan.y._value;
  this.pan.setOffset({
    x,
    y
  });
},*/
class Website extends React.Component {
  constructor(props) {
    super(props);
    this.pan = new Animated.ValueXY({ x: -20, y: -20 });
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, state) => false,
      onStartShouldSetPanResponderCapture: (e, state) => false,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: (e, { dx, dy }) => {
        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
          this.state.holding && this.setState({ holding: false });
          return true;
        } else {
          !this.state.holding && this.setState({ holding: true });
          return true;
        }
      },
      onPanResponderGrant: (e, gestureState) => {
        this.pan.setOffset(this.pan.__getValue());
        this.pan.setValue({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY });
      },
      onPanResponderMove: (e, gesture) => {
        this.pan.setValue({ x: gesture.dx, y: gesture.dy });
        /*Animated.event([null, { dx: this.pan.x, dy: this.pan.y }])(
          e,
          gestureState
        );*/
        if (Math.abs(gesture.dx) > 10 || Math.abs(gesture.dy) > 10) {
          clearTimeout(this.t);
          this.state.holding && this.setState({ holding: false });
        } else {
          !this.state.holding && this.setState({ holding: true });
        }
      },
      onPanResponderRelease: (e, { vx, dx }) => {
        this.setState({ holding: false });
        const offScreenX = () => {
          if (this.props.width < e.nativeEvent.pageX) {
            Animated.spring(this.pan.x, {
              toValue: this.props.width - 20,
              bounciness: 10
            }).start();
          } else if (0 > e.nativeEvent.pageX) {
            Animated.spring(this.pan.x, {
              toValue: -30,
              bounciness: 10
            }).start();
          }
        };
        const offScreenY = () => {
          if (this.props.height < e.nativeEvent.pageY) {
            Animated.spring(this.pan.y, {
              toValue: this.props.height - 20,
              bounciness: 10
            }).start();
          } else if (0 > e.nativeEvent.pageY) {
            Animated.spring(this.pan.y, {
              toValue: -30,
              bounciness: 10
            }).start();
          }
        };
        // abs(vx) speed (not velocity) of gesture,
        // abs(dx) distance traveled (not displacement)
        //if (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 30) {
        this.pan.flattenOffset();
        //}
        //var widthDiff = Math.abs(this.props.width / 2 - e.nativeEvent.pageX);
        //var heightDiff = Math.abs(this.props.height / 2 - e.nativeEvent.pageY);
        if (this.props.width / 2 > e.nativeEvent.pageX) {
          if (this.props.height / 2 < e.nativeEvent.pageY) {
            offScreenX();
            Animated.spring(this.pan.y, {
              toValue: this.props.height - 20,
              bounciness: 10
            }).start();
          } else {
            offScreenY();
            Animated.spring(this.pan.x, {
              toValue: -30,
              bounciness: 10
            }).start();
          }
        } else {
          if (this.props.height / 2 > e.nativeEvent.pageY) {
            offScreenX();
            Animated.spring(this.pan.y, {
              toValue: -30,
              bounciness: 10
            }).start();
          } else {
            offScreenY();
            Animated.spring(this.pan.x, {
              toValue: this.props.width - 20,
              bounciness: 10
            }).start();
          }
        }
        /*Animated.spring(this.pan.x, {
          toValue: this.props.width / 2,
          bounciness: 10
        }).start();
        Animated.spring(this.pan.y, {
          toValue: 0,
          bounciness: 10
        }).start();*/
        //https://stackoverflow.com/questions/46188512/reactnative-panresponder-limit-x-position
      }
    });
    this.state = { highAndTight: true, hideOpener: true };
  }
  /*handleY = (e) => {
    const { movingY } = this.state;
    var val = e.value;
    if (Math.abs(movingY - val) > 2) {
      this.setState({ movingY: val });
    } else {
      this.setState({ movingY: 0 });
    }
  };
  handleX = (e) => {
    const { movingX } = this.state;
    var val = e.value;
    if (Math.abs(movingX - val) > 2) {
      this.setState({ movingX: val });
    } else {
      this.setState({ movingX: 0 });
    }
  };
  componentWillUnmount = () => {
    this.pan.x.removeListener(this.handleX);
    this.pan.y.removeListener(this.handleY);
  };
  componentDidMount = () => {
    this.pan && this.pan.x && this.pan.x.addListener(this.handleX);
    this.pan && this.pan.y && this.pan.y.addListener(this.handleY);
  };*/
  componentDidUpdate = () => {
    const { holding } = this.state;
    if (holding !== this.state.lastholding) {
      if (holding) {
        this.t = setTimeout(() => {
          this.setState({ holding: false });
          this.props.setSearch("");
        }, 1200);
      } else clearTimeout(this.t);
      this.setState({ lastholding: this.state.holding });
    }
  };
  render() {
    const { website } = this.props;
    const { highAndTight, holding, loadedSite } = this.state;
    /*var js = () => {
      setTimeout(() => {
        document.addEventListener(
          "scroll",
          (event) => {
            window.ReactNativeWebView.postMessage(
              JSON.stringify(
                document.getElementsByClassName("topcontainer")[0].scrollTop
                // forum.scrollLeft === 0 && e.target.scrollTop === 0;
              )
            );
          },
          true
        );
      }, 300);
      return true;
    };*/
    return (
      <View
        style={{
          backgroundColor: "white",
          position: website !== "" ? "fixed" : "relative",
          width: "100vw",
          height: "100vh",
          margin: website !== "" ? "0px" : "10px",
          padding: website !== "" ? "0px" : "56px",
          borderRadius: website !== "" ? "0px" : "9px",
          boxShadow: `inset 0px 0px ${highAndTight ? 70 : 0}px ${
            highAndTight ? 1 : 0
          }px rgb(200,200,200)`,
          transition: ".1s ease-in"
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: website !== "" ? "100%" : "0%",
            border: `${website === "" || loadedSite ? 0 : 3}px solid blue`,
            borderRadius: "5px",
            transform: website !== "" ? "translateY(0%)" : "translateY(-100%)",
            transition: ".3s ease-in"
          }}
        >
          <Text
            style={{
              fontSize: website !== "" ? "" : "0px",
              opacity: loadedSite ? 0 : 1
            }}
          >
            {website !== "" && `${website + " gathering..."}`}
          </Text>
          {/*website !== "" && false && (
            <WebView
              style={{
                height: "100%",
                width: "100%"
              }}
              originWhitelist={[website]}
              title={website}
              //source={{ uri: website }}
              source={{
                html: `
              <!DOCTYPE html>\n
              <html>
                <head>
                  <title>Hello World</title>
                  <meta http-equiv="content-type" content="text/html; charset=utf-8">
                  <meta name="viewport" content="width=320, user-scalable=no">
                  <style type="text/css">
                    body {
                      margin: 0;
                      padding: 0;
                      font: 62.5% arial, sans-serif;
                      background: transparent;
                    }
                  </style>
                </head>
                <body>
                  <p>HTML content in transparent body.</p>
                </body>
              </html>
              `
              }}
              onLoadEnd={() => {
                window.alert("loaded " + website);
                this.setState({ loadedSite: website });
              }}
              //injectedJavaScript={String(js)}
            />
            )*/}
        </View>
        {website !== "" && (
          <Animated.View
            style={{
              position: "absolute",
              transform: [
                { translateX: this.pan.x },
                { translateY: this.pan.y }
              ]
            }}
            {...this.panResponder.panHandlers}
          >
            <View
              onMouseDown={() => {
                if (holding) {
                  this.t = setTimeout(() => {
                    this.setState({ holding: false });
                    this.props.setSearch("");
                  }, 2000);
                }
              }}
              onMouseUp={() => {
                this.setState({ holding: false });
                clearTimeout(this.t);
              }}
              onTouchStart={() => {
                this.t = setTimeout(() => {
                  if (holding) {
                    this.setState({ holding: false });
                    this.props.setSearch("");
                  }
                }, 2000);
              }}
              onTouchEnd={() => {
                this.setState({ holding: false });
                clearTimeout(this.t);
              }}
              style={{
                borderRadius: "25px",
                backgroundColor: holding ? "black" : "",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
                height: "50px",
                transition: `${holding ? "3" : "1"}s ease-in`
              }}
            >
              <View
                style={{
                  boxShadow: `0px 0px ${highAndTight || holding ? 23 : 0}px ${
                    highAndTight || holding ? 17 : 0
                  }px rgb(20,20,20)`,
                  borderRadius: "10px",
                  width: "0px",
                  height: "0px"
                }}
              ></View>
            </View>
          </Animated.View>
        )}
      </View>
    );
  }
}
export default Website;

/*website && (
  <Text style={styles.text}>
    visit{" "}
    <Link href={website} style={styles.code}>
      {website}
    </Link>{" "}
    meta
  </Text>
)*/
/*componentDidUpdate = () => {
    const x = this.pan.x._value;
    const y = this.pan.y._value;

    var holdX = Math.abs(x - this.state.lastX) > 8;
    var holdY = Math.abs(y - this.state.lastY) > 8;
    if (x !== this.state.lastX) this.setState({ holdX, lastX: x });
    if (y !== this.state.lastY) this.setState({ holdY, lastY: y });
  };*/

/**
 * 
 var notmovingX = Math.abs(movingX - this.pan.x) < 2;
  var notmovingY = Math.abs(movingY - this.pan.y) < 2;
  if (notmovingX > 2) {
    movingX = this.pan.x;
  } else {
    movingX = props.width / 2;
  }
  if (notmovingY > 2) {
    movingY = this.pan.y;
  } else {
    movingY = 0;
  }
  var restart = movingX === 0 || movingY === 0;
  if (restart) {
    return false;
  } else {
    this.setState({ holding: false, movingY, movingX });
    setTimeout(() => this.setState({ holding: true }), 5000);
    return true;
  }
*/
