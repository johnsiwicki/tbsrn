/**
 * Listing SCREEN
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

/* ==============================
  Initialise App
  =============================== */
  // React
  import React, { Component } from 'react';
  import {
    StyleSheet,
    View,
    ListView,
    Alert,
    RefreshControl,
  } from 'react-native';

  // App Globals
  import AppStyles from '../styles.ios';
  import AppConfig from '../config.ios';
  import AppUtil from '../util.ios';

  // App Components
  import ListRow from '../components/list.row.ios';

  // Pages / Screens
  import Screen from './soon.ios'; 

/* ==============================
  Listing
  =============================== */

  var ListViewExample = React.createClass({

  	/**
      * Sets initial state (before JSON retrieved)
      */
  	getInitialState: function() {
  		return {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        isRefreshing: false,
      };
  	},

  	/**
      * Executes after all modules have been loaded
      */
  	componentDidMount: function() {
  	  // Fetch Data
      this._fetchData();
  	},

    /**
      * Executes after all modules have been loaded
      */
    _fetchData: function() {
      var self = this;

      self.setState({ isRefreshing: false });

        fetch("https://api.teambasementsystems.com/newsletters/", {method: "GET"})
          .then((response) => response.json())
          .then((responseData) => {
          
                 console.log(responseData.title);
       
          })
          .done();



      // self.setState({
      //   dataSource: self.state.dataSource.cloneWithRows(responseData),
      //   isRefreshing: false,
      // });

    },


    /**
      * Each Row Item
      */
    _renderRow: function(data) {
      return (
        <ListRow title={data.title.toString()}
          onPress={()=>{
            this.props.navigator.push({
              title: data.title,
              component: Screen,
              index: 2,
              navigator: this.props.navigator,
            });
          }} />
      );
    },

    /**
      * Do Render
      */
    render: function() {
      return (
        <View style={[AppStyles.container]}>
          <ListView
            initialListSize={8}
            automaticallyAdjustContentInsets={false}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            contentContainerStyle={styles.container} 
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._fetchData}
                tintColor={AppConfig.primaryColor} />
            } />
        </View>
      );
    }
  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
    container: {
      paddingBottom: AppConfig.tabBarHeight,
    },
  });

/* ==============================
  Done!
  =============================== */
  module.exports = ListViewExample;
  module.exports.details = {
    title: 'ListViewExample'
  };