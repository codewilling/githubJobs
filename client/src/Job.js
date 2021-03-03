import React from 'react';
import { Typography, Paper } from '@material-ui/core';

export default function Job({ job, onClick}) {


    return (
        <Paper onClick={onClick} className='job'>
            <div>
                <Typography variant='h4'>{job.title}</Typography>
                <Typography variant='h6'>{job.company}</Typography>
                <Typography>{job.location}</Typography>
            </div>
            <div>
                <Typography>{job.created_at.split(' ').splice(0, 3).join(' ')}</Typography>
            </div>
        </Paper>
    )
}