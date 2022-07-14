import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const getData = (URL,setJobsCreated, setJobsData) => {
        fetch(URL)
          .then((response) => response.json())
          .then((responseJson) => {
            const msg = "Cast to Number failed for value \"kRNclBZYNDP65NqEQqpbOYqAJ3z2\" (type string) at path \"recruiterId\" for model \"Jobs\"";
              if (responseJson.length === 0 || responseJson.message === msg){ 
                  setJobsCreated(false);
              }
              else {
                    setJobsCreated(true);
                setJobsData(responseJson);
              }
          })
          .then(() => {
            return true
          })
          .catch((error) => {
            console.error(error);
          });
}
export const getMostViewesJobs = (setMostViewedJobs, setMostViewedJobsState) => {
  const URL = "https://worketzy.herokuapp.com/api/jobs";
  fetch(URL)
    .then((response) => response.json())
    .then((responseJson) => {
      const msg =
        'Cast to Number failed for value "kRNclBZYNDP65NqEQqpbOYqAJ3z2" (type string) at path "recruiterId" for model "Jobs"';
      if (responseJson.length === 0 || responseJson.message === msg) {
        console.log(responseJson);
      } else {
        const sorted = responseJson.sort(
          (a, b) => b.jobInfo.numberofViews - a.jobInfo.numberofViews
        );
        setMostViewedJobs(sorted.map((job) =>job));
        setMostViewedJobsState(true);
      }
    })
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.error(error);
    });
};
export const mostApplied = (setMostAppliedJobs, setMostAppliedJobsState) => {
  const URL = "https://worketzy.herokuapp.com/api/jobs";
  fetch(URL)
    .then((response) => response.json())
    .then((responseJson) => {
      const msg =
        'Cast to Number failed for value "kRNclBZYNDP65NqEQqpbOYqAJ3z2" (type string) at path "recruiterId" for model "Jobs"';
      if (responseJson.length === 0 || responseJson.message === msg) {
        console.log(responseJson);
      } else {
        const sorted = responseJson.sort(
          (a, b) =>
            b.jobInfo.peopleApplied.length - a.jobInfo.peopleApplied.length
        );
        setMostAppliedJobs(
          sorted.map((job) => job)
        );
        setMostAppliedJobsState(true);
      }
    })
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.error(error);
    });
};
export const recommendedJobs = (
  userPreferedJobs,
  userRecommendedJobs,
  setUserRecommendedJobs,
  setUserRecommendedJobsState
) => {
  const a = []
  userPreferedJobs.map((job, index) => {
    const URL =
      "https://worketzy.herokuapp.com/api/jobs/jobTitle/" +
      userPreferedJobs[index];
    fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        const msg =
          'Cast to Number failed for value "kRNclBZYNDP65NqEQqpbOYqAJ3z2" (type string) at path "recruiterId" for model "Jobs"';
        if (responseJson.length === 0 || responseJson.message === msg) {
          console.log(responseJson);
        } else {
          a.push(responseJson);
          const merge = [].concat(...a)
          setUserRecommendedJobs(merge);
        }
      })
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.error(error);
      });
    });
  setUserRecommendedJobsState(true);
};


const styles = StyleSheet.create({})