import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Formik } from 'formik';
import CustomButton from './CustomButton';
import { COLORS } from '../utils/colors';
import * as Yup from 'yup';

interface formFields{
    name:string;
    email:string;
    password:string;
}


const RegisterForm = ({registerHandler}:{registerHandler:Function}) => {
  const handleSubmitForm = (values:formFields) => {
    console.log('Form Values:', values);
    registerHandler(values);
  };

  const validationSchema = Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
      password: Yup.string()
        .min(1, 'Minimum 6 characters')
        .required('Password is required'),
    });

  return (

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        onSubmit={handleSubmitForm}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
        }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />

            <CustomButton title='Submit' pressHandler={handleSubmit} customStyles={styles.button}  />
            {/* <C
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable> */}
          </>
        )}
      </Formik>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({

  input: {
    borderWidth: 1,
    borderColor:  COLORS.border,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor:COLORS.surface,
    color:COLORS.text,
    fontSize:16,
  },
  button: {
    padding: 14,
    marginTop: 12,
    width:"50%",
    marginHorizontal:"auto",
    fontSize:20
  },
});