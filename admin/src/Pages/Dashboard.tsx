import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import { Grid, Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: 20
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    counter: {
        fontSize: 20,
        fontWeight: 700,
        color: 'black',
        transition: '0.8s ease-out',
        transitionProperty:'background-color, color, opacity'
    },
    counterTitle: {
        fontSize: 22
    }
}));


const Dashboard = (props: any) => {
    const classes = useStyles();

    const statistics = useSelector((state: any) => state.statistics);

    return (
        <div className={classes.root}>
           ROOT
        </div>
    );
};


export default Dashboard;