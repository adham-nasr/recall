import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { COLORS } from '../utils/colors'
import { ActivityIndicator, IconButton  as UIButton} from 'react-native-paper'
import Question from './Question'
import Answers from './Answers'
import { Problem, states } from '../types'
import { useAuth } from '../hooks/useAuth'
import { postAttempt } from '../api/getData'
import { getCategoryTextColor } from '../utils/helpers'
import CustomButton from './shared/CustomButton'


interface args {
    problem:Problem;
    problemNumber:number;
    problemsSize:number;
    category:string;
    setProblemNumber:React.Dispatch<React.SetStateAction<number>>;
    topicChangeHandler:Function
}
const PracticeGround = ({problem ,problemNumber,problemsSize,category, setProblemNumber,topicChangeHandler}:args) => {

    const initalStates = problem.answers.map(()=>states.unselected);

    const [selected,setSelected] = useState(-1);
    const [status,setStatus] = useState<states[]>(initalStates)
    const [attempted,setAttempted] = useState<Boolean>(false);

    const {user} = useAuth()


    const selectedHandler = (ind:number)=>{
      setSelected(ind);
    }
    const submitHandler = ()=>{
      if(selected!==-1)
      {
        const temp = status.map((state,ind)=>{
          if(ind===selected)
          {
            const state = problem?.answers[ind].isCorrect ? true : false;
            if(problem && user && !attempted)
              postAttempt(user.token,problem._id,state)
            return problem?.answers[ind].isCorrect ? states.correct : states.wrong
          }
          return state
        })
        setStatus(temp);
        setAttempted(true);
      }
    }
    const forwardHandler = () =>{
      setSelected(-1);
      setProblemNumber(val=>val+1);

    }
    const backwardHandler = () =>{
      setSelected(-1);
      setProblemNumber(val=>val-1);
    }

    return (

    <View style={styles.container}>
          { category ?
              <Text style={styles.header}>#{problem.pNumber} - <Text style={{color:getCategoryTextColor(category)}}>{category}</Text></Text>
            :
            <Text style={styles.header}>#{problemNumber+1}</Text>
          }
		  { problem.topic &&
              <View style={styles.topicView}>
                  <View>
                    <UIButton iconColor={COLORS.primary} size={30} icon="skip-previous"  disabled={problemNumber===0} onPress={()=>{topicChangeHandler(-1)}} />
                    {/* <Text>Previous Topic</Text> */}
                  </View>
                  <Text style={styles.topicText}>{problem.topic}</Text>
                  <View>
                    <UIButton iconColor={COLORS.primary} size={30} icon="skip-next"  disabled={problemNumber=== problemsSize-1 } onPress={()=>{topicChangeHandler(1)}} />
                    {/* <Text>Next Topic</Text> */}
                  </View>
              </View>
          }
          <Question category={category} statement={problem!.statement}/>
          <Answers key={`${problem._id}`} answers={problem.answers} status={status} selected={[selected,selectedHandler]}/>
          <View style={styles.footer}>
            <UIButton iconColor={COLORS.primary} size={24} icon="arrow-left" disabled={problemNumber===0} onPress={()=>{backwardHandler()}} />
            <CustomButton customStyles={styles.button} title="Submit" pressHandler={submitHandler} />
            <UIButton iconColor={COLORS.primary} size={24}  icon="arrow-right" disabled={problemNumber=== problemsSize-1 } onPress={()=>{forwardHandler()}} />
          </View>
      
    </View>
  )
}

export default PracticeGround

const styles = StyleSheet.create({
  container: {
    flex:10,
    alignItems:"center",
    backgroundColor:COLORS.bg,
    padding:20,
  },
  header:{
    fontSize:30,
    fontWeight:"bold",

  },
  topicView:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    width:"100%"
  },
  footer:{
    maxHeight:"10%",
    flex:3,
    marginBottom:10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around",
    width:"100%"
  },
  button:{
    width:"50%"
  },
  topicText:{
    color:COLORS.textMuted,
    fontSize:20,
    flex:1,
    textAlign:'center'
  }
})