import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../utils/colors'
import { Link } from 'expo-router'
import { paths } from '../utils/constants'

const AuthLayout = ({children,type}:{children:any,type:"login"|"register"}) => {
  const [title , redirection , lin ,href] = type==="login" 
  ? 
    ["Welcome Back" , "Don't have an account?" , "Sign up" , paths.REGISTER as "/register"] 
  : 
    ["Start Practicing" , "Already have an account?" , "Log in" , paths.LOGIN as "/login"]
    return (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.form}>
          {children}
        </View>
        <Text style={{fontSize:18}}>{redirection} <Link href={href} style={styles.link}>{lin} </Link> </Text>
      </View>
  )
}

export default AuthLayout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:"center",
    padding: 20,
    backgroundColor: COLORS.bg
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 50,
    textAlign: 'center',
    color: COLORS.text
  },
  form:{
    backgroundColor:'beige',
    width:"95%",
    marginBottom:40,
  },
  link:{
    color:COLORS.primary,
    fontSize:20,
    fontWeight:"bold"
  }

});