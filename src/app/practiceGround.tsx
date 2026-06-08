import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Problem , Answer, states} from '../types'
import Question from '../components/Question'
import Answers from '../components/Answers'
import { ActivityIndicator, IconButton  as UIButton} from 'react-native-paper'
import CustomButton from '../components/CustomButton'
import { COLORS } from '../utils/colors'
import { useQuery } from '@tanstack/react-query'
import { getProblems, postAttempt } from '../api/getData'
import { useLocalSearchParams } from 'expo-router';
import { getRandomProblems } from '../utils/helpers'
import { useAuth } from '../hooks/useAuth'

const practiceGround = () => {

    const {category }  = useLocalSearchParams<{category:string}>();

    const query = useQuery({
      queryKey:["problems",category],
      queryFn:()=>getProblems(category)
    })

    const {data,error,isLoading} = query
    const [problems,setProblems] = useState<Problem[]>([])
    const [problemNumber,setProblemNumber] = useState(0);
    const [selected,setSelected] = useState(-1);
    const [status,setStatus] = useState<states[]>([])
    const [attempted,setAttempted] = useState<Boolean>(false);

    useEffect(()=>{
      // console.log("IN")
      if(data)
		    if(!category)
			     setProblems(getRandomProblems(data))
		   else
			   setProblems(data)
    },[data])

    const {user} = useAuth()
    const problem = problems.length ? problems[problemNumber] : null;


    useLayoutEffect(()=>{
      if(problem)
        setStatus(problem.answers.map(()=>states.unselected));
    },[problem])


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
      {
        isLoading || !problem ? 
          <ActivityIndicator animating={true} color={COLORS.primary} /> 
          :
          error ? 
            <Text style={{fontSize:24,color:COLORS.danger,fontWeight:"bold"}}>{error?.message}</Text>
          :
          (
            <>
              { category ?
                  <Text style={styles.header}>#{problem.pNumber} - <Text style={{color:COLORS.primary}}>{category}</Text></Text>
                :
                <Text style={styles.header}>#{problemNumber+1}</Text>
              }
			  { problem.topic &&
                  <Text style={{color:COLORS.textMuted,fontSize:20}}>{problem.topic}</Text>
              }
              <Question statement={problem!.statement}/>
              <Answers key={`${problem._id}`} answers={problem.answers} status={status} selected={[selected,selectedHandler]}/>
              <View style={styles.footer}>
                <UIButton iconColor={COLORS.primary} size={24} icon="arrow-left" disabled={problemNumber===0} onPress={()=>{backwardHandler()}} />
                <CustomButton customStyles={styles.button} title="Submit" pressHandler={submitHandler} />
                <UIButton iconColor={COLORS.primary} size={24} icon="arrow-right" disabled={problemNumber===problems.length-1} onPress={()=>{forwardHandler()}} />
              </View>
            </>
          )
      }
      
    </View>
  )
}

export default practiceGround

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
  }
})