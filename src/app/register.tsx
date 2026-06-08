import { StyleSheet, Text, View } from "react-native";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { COLORS } from "../utils/colors";
import RegisterForm from "../components/RegisterForm";
import { Link } from "expo-router";
import AuthLayout from "../layouts/AuthLayout";


const register = () => {

    const {register} = useAuth();

    return(
      <AuthLayout type="register">
          <RegisterForm registerHandler={register} />
      </AuthLayout>
    );
} 

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
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

});