import React, { useState, useEffect } from "react";
import InfoCube from "./InfoCube";

const JobCounter = () => {
    const [totalJobs, setTotalJobs] = useState(null);
    const [totalUsers, setTotalUsers] = useState(null);
    const [jobsError, setJobsError] = useState(null);
    const [usersError, setUsersError] = useState(null);

    // Fetch total jobs
    useEffect(() => {
        const fetchTotalJobs = async () => {
            try {
                const res = await fetch(`http://toolbox.talapas.uoregon.edu:5000/api/total_jobs?nocache=${Date.now()}`, {
                    headers: {
                        "X-API-Key": process.env.REACT_APP_CPU_COUNT_API_KEY
                    }
                });
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                setTotalJobs(data.total_jobs);
                setJobsError(null);
            } catch (err) {
                console.error("Error fetching total jobs:", err);
                setJobsError(err.message);
            }
        };

        fetchTotalJobs();
        const interval = setInterval(fetchTotalJobs, 10000);
        return () => clearInterval(interval);
    }, []);

    // Fetch total users
    useEffect(() => {
        const fetchTotalUsers = async () => {
            try {
                const res = await fetch(`http://toolbox.talapas.uoregon.edu:5000/api/total_users?nocache=${Date.now()}`, {
                    headers: {
                        "X-API-Key": process.env.REACT_APP_CPU_COUNT_API_KEY
                    }
                });
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                setTotalUsers(data.total_users);
                setUsersError(null);
            } catch (err) {
                console.error("Error fetching total users:", err);
                setUsersError(err.message);
            }
        };

        fetchTotalUsers();
        const interval = setInterval(fetchTotalUsers, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
		<div style={{ display: "flex", gap: "20px" }}>
            <InfoCube title="Total Jobs" value={totalJobs} error={jobsError} />
            <InfoCube title="Total Live Users" value={totalUsers} error={usersError} />
        </div>
    );
};

export default JobCounter;

