import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Form from "./components/Form";
import Website from "./components/Website";
import Results from "./components/Results";
import { tlds } from "..";

class App extends React.Component {
  width = Dimensions.get("window").width;
  height = Dimensions.get("window").height;
  state = { search: "", website: "", siteQueryResults: [] };

  componentWillUnmount() {
    clearTimeout(this.resizeTimer);
    window.removeEventListener("resize", this.refresh);
  }
  refresh = () => {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      const width = Dimensions.get("window").width;
      const height = Dimensions.get("window").height;
      document.documentElement.style.setProperty("--vw", `${width}px`);
      document.documentElement.style.setProperty("--vh", `${height}px`);
      this.setState({
        width,
        height
      });
    }, 200);
  };
  componentDidMount = () => {
    this.refresh();
    window.addEventListener("resize", this.refresh);
  };
  handleSearchQuery = async (search) => {
    var arr = search.split(".");
    if (arr) {
      if (arr.length < 4) {
        var suffix = arr[arr.length - 1];
        if (tlds.includes(suffix.toUpperCase())) {
          const alertError = (entry) => {
            window.alert(entry + " is more than letters, numbers or hyphen");
          };
          //tld recognized
          var website = "";
          var withoutSuffix = arr.slice(-1);
          let good = 0;
          withoutSuffix.map((entry) => {
            if (/[a-zA-Z0-9-]/g.test(entry)) {
              return good++;
            } else return alertError(entry);
          });
          if (good === withoutSuffix.length) {
            if (arr[0].includes("https://")) {
              //https:// already entered
              website = search;
            } else {
              website = "https://" + search;
            }
            var answer = window.confirm("navigate to " + website + "?");
            if (answer) {
              this.setState({ website });
              /*const metadata = await pageMetaScraper.scrape(website);
            if (metadata) {
              this.setState({ website, metadata });
              console.log(metadata);
            }*/
              //connot even get metadata from another origin
              //must use node
            }
          }
        } else
          window.alert(
            suffix +
              " is not a registered domain suffix.  email nick@carducci.sh with requests"
          );
      } else
        window.alert(
          "we only support the subdomain level sub.domain.top.  email nick@carducci.sh with requests"
        );
    } else {
      //term
      /*
    firebase
      .firestore()
      .collection("siteQueryResults")
      .where("metaAsArray", "array-contains", search)
      .get()
      .then((querySnapshot) => {
        let siteQueryResults = [];
        let p = 0;
        querySnapshot.docs.forEach((doc) => {
          p++;
          if (doc.exists) {
            var foo = doc.data();
            foo.id = doc.id;
            siteQueryResults.push(foo);
          }
          if (querySnapshot.docs.length === p) {
            this.setState({ siteQueryResults });
          }
        });
      });*/
    }
  };
  render() {
    const { website, siteQueryResults, search } = this.state;
    return (
      <View style={styles.app}>
        <Form
          changeSearchText={(search) => this.setState({ search })}
          search={search}
          siteQueryResults={siteQueryResults}
          handleSearchQuery={this.handleSearchQuery}
          width={this.state.width}
        />
        <Results
          website={website}
          siteQueryResults={this.state.siteQueryResults}
          goTo={(website) => this.handleSearchQuery(website)}
        />
        <Website
          website={website}
          width={this.state.width}
          height={this.state.height}
          setSearch={(website) => this.setState({ website })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    userSelect: "none",
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 0,
    borderColor: "rgb(80,80,140)"
  },
  logo: {
    height: 80
  },
  header: {
    padding: 20
  }
});

export default App;
