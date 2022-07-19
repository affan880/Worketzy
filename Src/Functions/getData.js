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
        console.log("No Jobs");
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
      if (responseJson === null ||responseJson.length === 0 || responseJson.message === msg) {
        console.log("No Jobs");
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
          console.log("No data");
        } else {
          a.push(responseJson);
          const merge = [].concat(...a)
          setUserRecommendedJobs(merge)
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
export const savedJobsData = (JobsData, setAllSavedJobs, setRefreshing) => {
  let a = [];
  JobsData.map((job, index) => {
    const URL =
      "https://worketzy.herokuapp.com/api/jobs/recruiter/" +
      job.recruiterId +
      "/" +
      job.jobsUniqueId;
    fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        const msg =
          'Cast to Number failed for value "kRNclBZYNDP65NqEQqpbOYqAJ3z2" (type string) at path "recruiterId" for model "Jobs"';
        if (responseJson.length === 0 || responseJson.message === msg) {
          console.log(responseJson);
        } else {
          a.push(responseJson);
          const merge = [].concat(...a);
          setAllSavedJobs(merge);
          setRefreshing(false);
        }
      })
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.error(error);
      });
  });
  a.length = 0;
};

export const peopleApplied = (applications, setApplications, setIsLoading, setData) => {
  console.log("here")
  let a = [];
  fetch("https://worketzy.herokuapp.com/api/jobs/b7OY7UZ8THfevRx1yd9FbfwnzQ53")
    .then((response) => response.json())
    .then((responseJson) => {
      responseJson.map((res, index) => {
        res.jobInfo.peopleApplied.map(
          (user) => (
            user.userId !== undefined
              ? a.push({ id: user.userId, jobTitle: res.jobInfo.jobTitle })
              : null,
            setApplications([...new Set(a)]),
            console.log(applications)
          )
        );
      });
    });
  a.length = 0;
}



const styles = StyleSheet.create({})