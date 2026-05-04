import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Problem , Answer, states} from '../types'
import Question from '../components/Question'
import Answers from '../components/Answers'
import { ActivityIndicator, IconButton  as UIButton} from 'react-native-paper'
import CustomButton from '../components/CustomButton'
import { COLORS } from '../colors'
import { useQuery } from '@tanstack/react-query'
import { getAllProblems, getData } from './api/getData'
import { useLocalSearchParams } from 'expo-router';
import { getRandomProblems } from '../utils'

const practiceGround = () => {

    // const problems:Problem[] = [{
    //     id:1,
    //     statement:"Which of the following is not an operating system?",
    //     category:"Operating Systems",
    //     explanation:"Youtube is not an operating system.",
    //     answers:[
    //         {id:1,content:"Youtube",isCorrect:true},
    //         {id:2,content:"Windows",isCorrect:false},
    //         {id:3,content:"Mac",isCorrect:false},
    //         {id:4,content:"Linux",isCorrect:false},
    //     ]
    //   } ,

    //   {
    //     id:2,
    //     statement:"which of the following is true",
    //     category:"DSA",
    //     answers:[
    //         {id:1,content:"Linked list is a linear data structure",isCorrect:true},
    //         {id:2,content:"Stack is a linear data structure",isCorrect:false},
    //         {id:3,content:"Queue is a linear data structure",isCorrect:false},
    //         {id:4,content:"Tree is a linear data structure",isCorrect:false},
    //     ],
    //     explanation:"Linked list is a linear data structure"
    //   },

    //   {
    //     id:3,
    //     statement:"Encapsulation is the process of",
    //     category:"OOP",
    //     answers:[
    //         {id:1,content:"Hiding of data",isCorrect:true},
    //         {id:2,content:"Hiding of methods",isCorrect:false},
    //         {id:3,content:"Hiding of variables",isCorrect:false},
    //         {id:4,content:"Hiding of classes",isCorrect:false}, 
    //     ],
    //     explanation:"Encapsulation means the binding of data members and member functions of a class into a single unit."
    //   },

    //   {
    //     id:4,
    //     statement:"Which of the following is not a data structure?",
    //     category:"DSA",
    //     answers:[
    //         {id:1,content:"Queue",isCorrect:false},
    //         {id:2,content:"Stack",isCorrect:false},
    //         {id:3,content:"Linked list",isCorrect:true},
    //         {id:4,content:"Tree",isCorrect:false},
    //     ],
    //     explanation:"Linked list is a linear data structure"
    //   },
    // ]
    const query = useQuery({
      queryKey:["data"],
      queryFn:getData
    })

    const {data,error,isLoading} = query
    const [problems,setProblems] = useState<Problem[]>([])
    const [problemNumber,setProblemNumber] = useState(0);
    const [selected,setSelected] = useState(-1);
    const [status,setStatus] = useState<states[]>([])


    const {category }  = useLocalSearchParams<{category:string}>();



    useEffect(()=>{
      console.log("IN")
      if(data)
      {
        if(category && typeof category === "string")
          setProblems(data[category].problems)
        else
        {
          setProblems(getRandomProblems(data))
        }
      }
    },[data])

    
    const problem = problems.length ? problems[problemNumber] : null;

    console.log("_-----------------------------")
    console.log("isLoading")
    console.log(isLoading)
    console.log("data")
    console.log(data)
    console.log("problems")
    console.log(problems)
    console.log(problem)
    console.log("____________")
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
            return problem?.answers[ind].isCorrect ? states.correct : states.wrong
          return state
        })
        setStatus(temp);
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
                  <Text style={styles.header}>#{problem.id} - <Text style={{color:COLORS.primary}}>{category}</Text></Text>
                :
                <Text style={styles.header}>#{problemNumber+1}</Text>
              }
              <Question statement={problem!.statement}/>
              <Answers key={`${problem.id}`} answers={problem.answers} status={status} selected={[selected,selectedHandler]}/>
              <View style={styles.footer}>
                <UIButton iconColor={COLORS.primary} size={24} icon="arrow-left" disabled={problemNumber===0} onPress={()=>{backwardHandler()}} />
                <CustomButton width={"50%"} title="Submit" pressHandler={submitHandler} />
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
    fontSize:26,
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
  }
})