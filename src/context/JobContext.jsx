import React, { createContext, useContext, useState } from 'react';
import { mockJobs } from '../data/mockJobs';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(mockJobs);
  const [applications, setApplications] = useState([]);

  const addJob = (newJob) => {
    setJobs([...jobs, { ...newJob, id: Date.now() }]);
  };

  const applyToJob = (jobId, professionalId) => {
    setApplications([...applications, {
      id: Date.now(),
      jobId,
      professionalId,
      status: 'pending',
      appliedAt: new Date()
    }]);
  };

  const updateJobStatus = (jobId, status) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status } : job
    ));
  };

  return (
    <JobContext.Provider value={{
      jobs,
      applications,
      addJob,
      applyToJob,
      updateJobStatus
    }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext); 