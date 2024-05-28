import React from 'react';
import JobRunsTable from "@/components/job/JobRunsTable";
import JobHeader from "@/components/job/JobHeader";

function Page({params, searchParams}) {

    return (
        <div>
            <JobHeader  jobId={params.jobId}/>

            <JobRunsTable jobId={params.jobId}/>
        </div>
    );
}

export default Page;
