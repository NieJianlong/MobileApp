import React from "react";
import { Button, TouchableHighlight, Image,TouchableOpacity,Text, FlatList, View } from "react-native";
import PropTypes from "prop-types";
class DynamicTabViewScrollHeader extends React.Component {
  constructor(props) {
    super(props);
    this.defaultStyle = DynamicdefaultStyle;
    this.state = {
      selected: this.props.selectedTab
    };
  }

  _onPressHeader = index => {
    this.props.goToPage(index);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTab !== this.props.selectedTab) {
      this.setState({ selected: nextProps.selectedTab });
    }
  }

  _renderTitle = ({ item, index }) => {
    let isTabActive = index === this.state.selected;
    let fontWeight = isTabActive ? "bold" : "normal";
    return (
      <TouchableOpacity
        onPress={this._onPressHeader.bind(this, index)}
        style={[
          this.defaultStyle.tabItemContainer,
          { backgroundColor: this.props.headerBackgroundColor }
        ]}
        underlayColor={"#00000033"}
      >
        <View style={isTabActive?DynamicdefaultStyle.itemContainer:DynamicdefaultStyle.basesic}>
          <Image style={{height:30,width:30}} source={isTabActive?item.selectedIcon:item.icon}></Image>
          <Text
            style={[
              { fontWeight: fontWeight },
              this.defaultStyle.tabItemText,
              this.props.headerTextStyle,
              isTabActive?{color:'white'}:{color:'gray'}
            ]}
          >
            {item["title"]}
          </Text>
          {this._renderHighlight(isTabActive)}
        </View>
      </TouchableOpacity>
    );
  };

  _renderHighlight = showHighlight => {
    if (showHighlight) {
      return (
        <View
          style={[
            this.defaultStyle.highlight,
            {color:'white'},
            { backgroundColor: this.props.headerUnderlayColor }
          ]}
        />
      );
    } else {
      return (
        <View
          style={[{color:'gray'}]}
        />
      );
    }
  };

  scrollHeader = index => {
    this.headerView.scrollToIndex({ index, animated: true ,viewOffset:130});
  };

  render() {
    return (
      <FlatList
        horizontal
        alwaysBounceHorizontal={false}
        ref={headerView => {
          this.headerView = headerView;
        }}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        data={this.props.data}
        extraData={this.state}
        renderItem={this._renderTitle}
        style={[
          this.defaultStyle.headerStyle,
          { backgroundColor: this.props.headerBackgroundColor }
        ]}
      />
    );
  }
}

const DynamicdefaultStyle = {
  headerStyle: {},
  basesic:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'transparent'
  },
  itemContainer:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#409AEF',
    height:46,
    borderRadius:23,
    paddingHorizontal:5
  },
  tabItemText: {
    color: "white"
  },
  tabItemContainer: {
    overflow: "hidden",
    backgroundColor: "#555555",
    padding:8,
    justifyContent: "center",
    alignItems: "center"
  },
  highlight: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 5
  },
  noHighlight: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 5,
    color:'gray'
  }
};

DynamicTabViewScrollHeader.defaultProps = {
  selectedTab: 0,
  headerBackgroundColor: "#555555",
  headerUnderlayColor: "#00000033"
};

DynamicTabViewScrollHeader.propTypes = {
  goToPage: PropTypes.func.isRequired,
  selectedTab: PropTypes.number.isRequired,
  headerBackgroundColor: PropTypes.any,
  headerTextStyle: PropTypes.any,
  highlightStyle: PropTypes.any,
  noHighlightStyle: PropTypes.any,
  headerUnderlayColor: PropTypes.any
};

export default DynamicTabViewScrollHeader;
