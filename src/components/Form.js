import React from "react";
import { View, TextInput } from "react-native";
class Form extends React.Component {
  input = React.createRef();
  state = { textFocus: true };
  render() {
    const { website, siteQueryResults, search } = this.props;
    var height =
      website === "" || siteQueryResults.length > 0 ? "0px" : "min-content";
    var width = Math.min(this.props.width - 62, 300);
    /*if (this.input && this.input.current) {
      this.input.current.setNativeProps({
        enterKeyHint: "go",
        enterkeyhint: null
      });
    }*/
    return (
      <View
        style={{
          //transition: `transformY(${search !== "" ? "-70" : "0"}px)`,
          top: website === "" ? "-70px" : "0px",
          right: "10px",
          width: "100vw",
          marginTop: "10px",
          flexDirection: "row",
          justifyContent: "flex-end"
        }}
      >
        <View
          style={{
            borderRadius: "9px",
            boxShadow: `inset 0px 0px 7px 1px ${
              this.state.textFocus ? "rgb(200,200,240)" : "rgb(200,200,200)"
            }`,
            height,
            transition: ".3s ease-in"
          }} //needs state!
          onSubmitEditing={(e) => {
            e.preventDefault();
            this.props.handleSearchQuery(search);
          }}
        >
          <TextInput
            ref={this.input}
            enterKeyHint="go"
            onFocus={() => this.setState({ textFocus: true })}
            onBlur={() => this.setState({ textFocus: false })}
            value={search}
            placeholder="domain or meta term"
            style={{
              paddingRight: "15px",
              paddingLeft: "15px",
              outlineWidth: 0,
              color: "rgb(130,130,130)",
              borderRadius: "9px",
              boxShadow: `inset 0px 0px 7px 1px ${
                this.state.textFocus ? "rgb(120,120,200)" : "rgb(80,80,80)"
              }`,
              textAlign: "right",
              width,
              height: "33px"
            }}
            onChange={(e) => this.props.changeSearchText(e.target.value)}
          />
        </View>
        <View
          style={{
            marginLeft: "7px",
            color: "rgb(130,130,130)",
            borderRadius: "9px",
            boxShadow: `inset 0px 0px 7px 1px rgb(120,120,200)`,
            textAlign: "center",
            width: "33px",
            height: "33px"
          }}
        ></View>
      </View>
    );
  }
}
export default Form;
