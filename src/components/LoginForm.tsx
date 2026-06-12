import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Formik } from 'formik';
import { COLORS } from '../utils/colors';
import * as Yup from 'yup';
import CustomButton from './shared/CustomButton';

interface formFields{
    email:string;
    password:string;
}

const LoginForm = ({loginHandler}:{loginHandler:Function}) => {

  const [errors , setErrors] = useState(null) 

  const handleSubmitForm = async (values:formFields) => {
    console.log('Form Values:', values);
    const errors = await loginHandler(values);
    if(errors)
      setErrors(errors)
  };


  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .min(1, 'Minimum 1 characters')
      .required('Password is required'),
  });

  return (

      <Formik
        initialValues={{
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
          errors:ss,
          values,
        }) => (
          <>
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

            {errors &&
              <Text>{errors}</Text>
             }

            <CustomButton title='Submit' pressHandler={()=>{console.log(ss);handleSubmit()}} customStyles={styles.button}  />
          </>
        )}
      </Formik>
  );
};

export default LoginForm;

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