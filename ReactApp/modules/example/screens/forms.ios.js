/**
 * Form SCREEN
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
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
  } from 'react-native';

  // App Globals
  import AppStyles from '../../../styles.ios';
  // import AppConfig from '../../../config.ios';
  import AppUtil from '../../../util.ios';
  import AppDB from '../../../db.ios';

  // Module Globals
  // import ModuleConfig from '../config.ios';
  // import ModuleStyles from '../styles.ios';

  // 3rd Party Components
  import FormValidation from 'tcomb-form-native';

  // Components
  import Button from '../../../components/button.ios';

/* ==============================
  Form
  =============================== */
  var Form = React.createClass({
    /**
      * Sets initial state
      */
    getInitialState: function() {
      // Email Validation
      var valid_email = FormValidation.refinement(
        FormValidation.String, function (email) {
          var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
          return re.test(email);
        }
      );

      // Password Validation - Must be 6 chars long
      var valid_password = FormValidation.refinement(
        FormValidation.String, function (password) {
          if(password.length < 6) return false;
          return true;
        }
      );

      return {
        show_save_msg: false,
        form_fields: FormValidation.struct({
          Email: valid_email,
          Password: valid_password,
 
        }),
        empty_form_values: {
          Email: '',
          Password: '',
        },
        form_values: {},
        options: {
          fields: {
            Email: { error: 'Please enter a valid email' },
            Password: {
              error: 'Your new password must be more than 6 characters', 
              type: 'password',
            } 
          }
        },
      };
    },
        //save our inputs into state
        userEmailTextChanged: function(text){
            this.setState({userEmail: text});
          },
          passwordTextChanged: function(text){
            this.setState({ passwordText: text});
          },
 
        //send our data to the server
     logInPost: function(URL,parameters){
          
          var email = encodeURIComponent(this.state.userEmail);
          var password = encodeURIComponent(this.state.passwordText);

          console.log(email);
          console.log(password);

          return fetch('https://api.teambasementsystems.com/tbsauth/', { 
            method: "POST", 
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'email=' + email + '&password=' + password,
            })
            .then(response => response.json())
            .then((responseData) => {
              console.log(responseData);
              return responseData;  
              AsyncStorage.setItem("myKey", "My value here");
          });
        },
     


    /**
      * RENDER
      */
    render: function() {
      var Form = FormValidation.form.Form;
      var _this = this;

      return (
        <ScrollView automaticallyAdjustContentInsets={false} 
          style={[AppStyles.container]}
          contentContainerStyle={[AppStyles.containerCentered, styles.container]}>
          <View style={[AppStyles.paddingHorizontal]}>

            {this.state.show_save_msg && this.state.form_values.First_name != '' ?
              <View>
                <View style={[AppStyles.msg]}>
                  <Text style={[AppStyles.baseText, AppStyles.msg_text]}>Saved</Text>
                </View>

                <View style={AppStyles.spacer_20} />
              </View>
            : null}

            <Text style={[AppStyles.baseText, AppStyles.h3, AppStyles.centered]}>
              {this.state.form_values.First_name == '' ? "Sign Up" : "Log In"}
            </Text>

            <Text style={[AppStyles.baseText, AppStyles.p, AppStyles.centered]}>
              This page saves your input to the local DB.
            </Text>
            
            <View style={AppStyles.spacer_20} />

           <TextInput
              style={styles.textInput}
              value={_this.state.userEmail}
              onChangeText={_this.userEmailTextChanged}
              secureTextEntry={false}
              onSubmitEditing={_this.onSubmitEditingUsername}
               placeholder="Email"
            >
            </TextInput>
            <TextInput
              style={styles.textInput}
              value={_this.state.passwordText}
              onChangeText={_this.passwordTextChanged}
              secureTextEntry={true}
              onSubmitEditing={_this.onSubmitEditingPassword}
              placeholder="password"
            >
            </TextInput>
 
          </View>

          <View style={[AppStyles.grid_row]}>
            <View style={[AppStyles.grid_twoThirds, AppStyles.paddingLeft]}>
              <View style={AppStyles.spacer_15} />
              </View>

             <View style={[AppStyles.grid_third, AppStyles.paddingRight]}>
             </View>
          </View>

          <View style={AppStyles.hr} />

          <View style={[AppStyles.paddingHorizontal]}>
            <Button
              text={'Sign In'}
              onPress={this.logInPost} />
          </View>

        </ScrollView>
      );
    },

  });

/* ==============================
  Styles
  =============================== */
  var styles = StyleSheet.create({
    container: {
      paddingTop: 15,
      paddingBottom: 20,
      justifyContent: 'center',
      alignItems: 'stretch',
    },
    textInput:{
    height:50,
    fontSize:15,
    color:'black',
    borderColor: '#9E9E9E',
    borderWidth: 1,
    marginLeft:20,
    marginTop:20,
    marginRight:20,
  },
  });

/* ==============================
  Done!
  =============================== */
  module.exports = Form;
  module.exports.details = {
    title: 'Form'
  };