import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeView from '../../Components/CustomComponents/safeView';

const JobList = () => {
      const CardCarouselDetails = [
        {
          id: 1,
          CardTitle: "Popular Jobs",
          image:
            "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
          description: "lorem epsium tnen jpojpsd joined",
          jobList: [
            {
              id: 1,
              image:
                "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
              description: "lorem epsium tnen jpojpsd joined",
              jobTitle: "UI/UX Designer",
              jobSalary: "$100000",
            },
            {
              id: 2,
              image:
                "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
              description: "lorem epsium tnen dfdssddfdsf joined",
              jobTitle: "Web developer",
              jobSalary: "$300000",
            },
            {
              id: 3,
              image:
                "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80",
              description: "lorem epsium tnen adfsdfsfsf joined",
              jobTitle: "App developer",
              jobSalary: "$400000",
            },
          ],
        },
      ];
  return (
    <SafeView>
      <Text>jobList</Text>
    </SafeView>
  )
}

export default JobList

const styles = StyleSheet.create({})