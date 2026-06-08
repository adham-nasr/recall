import { StyleSheet, Text, View } from "react-native";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { COLORS } from "../utils/colors";
import AuthLayout from "../layouts/AuthLayout";


const login = () => {

    const {login} = useAuth();

    return (
      <AuthLayout type="login">
            <LoginForm loginHandler={login} />
      </AuthLayout>
    );
} 

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    padding: 20,
    backgroundColor: COLORS.bg
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 50,
    marginTop:50,
    textAlign: 'center',
    color: COLORS.text
  },
  form:{
    backgroundColor:'beige',
    width:"90%",
    marginBottom:40,
  },
  link:{
    color:COLORS.primary,
    fontSize:20,
    fontWeight:"bold"
  }

});