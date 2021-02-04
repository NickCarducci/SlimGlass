import React from "react";
import { Text, View } from "react-native";

class Results extends React.Component {
  render() {
    const { website, siteQueryResults } = this.props;
    return (
      <View style={{ width: website === "" ? "" : "0px" }}>
        {siteQueryResults.length > 0 ? (
          siteQueryResults.map((x) => (
            <Text
              onClick={() => this.props.goTo(x)}
              style={{
                margin: "10px",
                padding: "56px",
                borderRadius: "9px",
                boxShadow: `inset 0px 0px 7px 1px rgb(200,200,200)`,
                transition: ".3s ease-in"
              }}
            >
              x
            </Text>
          ))
        ) : (
          <Text
            onClick={() => this.props.goTo("https://example.com")}
            style={{
              margin: "10px",
              padding: "56px",
              borderRadius: "9px",
              boxShadow: `inset 0px 0px 7px 1px rgb(200,200,200)`,
              transition: ".3s ease-in"
            }}
          >
            https://example.com
          </Text>
        )}
      </View>
    );
  }
}
export default Results;
