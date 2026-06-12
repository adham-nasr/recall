import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { paths, practiceCriteria, practiceCriterias } from '../utils/constants'
import { RadioButton } from 'react-native-paper'
import { COLORS } from '../utils/colors'
import { useRouter } from 'expo-router'
import CustomButton from '../components/shared/CustomButton'

type args = {
    modalVisible:boolean,
    setModalVisible:React.Dispatch<React.SetStateAction<boolean>>,
    category:string|null
}
const CategoryModal = ({modalVisible,setModalVisible,category}:args) => {
    const [val,setVal] = useState<practiceCriteria>(practiceCriterias.ALL)
    
    const router = useRouter();
    const pressHandler = ()=>{
        setModalVisible(false);
        router.navigate({pathname:paths.PRACTICE_GROUND as any,params:{criteria:val,category:category||""}});
    }

  return (
    <View style={styles.container}>
      <Modal
          animationType="slide"
          transparent={false}
          backdropColor={"hsla(0,0,0,0.7)"}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text style={styles.modalText}>Choose your prefered problemSet</Text>
                <RadioButton.Group onValueChange={value => setVal(value as practiceCriteria)} value={val}>
                        <RadioButton.Item labelStyle={styles.label} label="All problems" value={practiceCriterias.ALL} />
                        <RadioButton.Item labelStyle={styles.label} label="problems Not attempted" value={practiceCriterias.UNATTEMPTED} />
                        <RadioButton.Item labelStyle={styles.label} label="problems Not solved" value={practiceCriterias.UNSOLVED} />
                    </RadioButton.Group>
                    <View style={styles.buttonView}>
                        <CustomButton customStyles={styles.button} title='cancel' pressHandler={()=>{setModalVisible(false)}} bgColor={COLORS.surface2} textStyles={{color:COLORS.primary700}} />
                        <CustomButton customStyles={styles.button} title='continue' pressHandler={pressHandler}/>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
  )
}

export default CategoryModal

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignContent:"center",
    },
    modalView: {
        borderRadius: 20,
        margin:20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent:"center",
        alignContent:"center",
                backgroundColor:COLORS.surface

    },
    modalText:{
        fontSize:20,
        color:COLORS.text,
        marginBottom:20,
        textAlign:"center"
    },
    buttonView:{
        flexDirection:"row",
        marginVertical:30,
        justifyContent:"space-around",
        width:"100%"
    },
    centeredView:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",

    },
    button:{
        width:"40%"
    },
    label:{
        fontSize:16,
        color:COLORS.text,
        marginRight:30
    }
})