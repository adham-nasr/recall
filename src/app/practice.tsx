import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Problem , Answer, states} from '../types'
import Question from '../components/Question'
import Answers from '../components/Answers'
import { ActivityIndicator, IconButton  as UIButton} from 'react-native-paper'
import { COLORS } from '../utils/colors'
import { useQuery } from '@tanstack/react-query'
import { getProblems, postAttempt } from '../api/getData'
import { useLocalSearchParams } from 'expo-router';
import { changeTopic, getRandomProblems } from '../utils/helpers'
import { useAuth } from '../hooks/useAuth'
import PracticeGround from '../components/PracticeGround'
import { practiceCriteria } from '../utils/constants'
import { useFetchProblems } from '../hooks/useFetchProblems'

const practice = () => {

    const {category , criteria }  = useLocalSearchParams<{category:string,criteria?:practiceCriteria}>();

    // const query = useQuery({
    //   queryKey:["problems",category,criteria],
    //   queryFn:()=>getProblems(category,criteria)
    // })

    // const {data,error,isLoading} = query
    // const [problems,setProblems] = useState<Problem[]>([])
    // const [problemNumber,setProblemNumber] = useState(0);

    const {data,error,isLoading} = useFetchProblems({category,criteria})
    const [problems,setProblems] = useState<Problem[]>([])
    const [problemNumber,setProblemNumber] = useState(0);


    useEffect(()=>{
      if(data)
		    if(!category)
			     setProblems(getRandomProblems(data))
		   else
			   setProblems(data)
    },[data])

    const problem = problems.length ? problems[problemNumber] : null;

    const topicChangeHandler = (dir:number)=>{
        const index = changeTopic(problems,problemNumber,dir)
        if(index!==-1)
          setProblemNumber(index);
    }

    if(isLoading)
      return (
        <View style={{flex:1}}>
          <ActivityIndicator size={30} animating={true} color={COLORS.primary} />
        </View>
    ) 
    if(error || !problem)
      return <Text style={{fontSize:24,color:COLORS.danger,fontWeight:"bold"}}>{error?.message}</Text>
    return(
      <PracticeGround key={problem._id} problem={problem} problemNumber={problemNumber} problemsSize={problems.length} setProblemNumber={setProblemNumber} category={category} topicChangeHandler={topicChangeHandler} />
    )


}

export default practice

