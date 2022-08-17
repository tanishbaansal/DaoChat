import Identicon from "react-identicons";
import moment from "moment";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { truncate } from "../store";
import { listVoters } from "../utils";
import { Box, Button, Card } from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const Voters = () => {
    const [voters, setVoters] = useState([]);
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [selected, setSelected] = useState("all");
    const timeAgo = (timestamp) => moment(Number(timestamp + "000")).fromNow();

    useEffect(() => {
        listVoters(id).then((res) => {
            setVoters(res);
            setData(res);
        });
    }, [id]);

    const getAll = () => {
        setSelected("all");
        setVoters(data);
    };

    const getAccepted = () => {
        setSelected("accept");
        setVoters(data.filter((vote) => vote.choosen));
    };

    const getRejected = () => {
        setSelected("reject");
        setVoters(data.filter((vote) => !vote.choosen));
    };

    return (
        <Box
            sx={{
                maxWidth: "60%",
                display: "flex",
                flexDirection: "column",
                margin: "auto",
                flexFlow: "wrap",
            }}
        >
            {/* <Card sx={{ p: 3, minWidth: 275 }}> */}
            <Button
                variant={selected == "all" ? "contained" : "outlined"}
                onClick={getAll}
                sx={{ marginRight: 2, marginY: 5, borderRadius: 10 }}
            >
                All
            </Button>
            <Button
                sx={{ marginRight: 2, marginY: 5, borderRadius: 10 }}
                variant={selected == "accept" ? "contained" : "outlined"}
                color="success"
                onClick={getAccepted}
            >
                Acceptees
            </Button>
            <Button
                sx={{ marginRight: 2, marginY: 5, borderRadius: 10 }}
                variant={selected == "reject" ? "contained" : "outlined"}
                color="error"
                onClick={getRejected}
            >
                Rejectees
            </Button>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Voter</TableCell>
                            <TableCell>Voted</TableCell>
                            <TableCell>Vote</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {voters.map((voter, i) => (
                            <TableRow
                                key={i}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {truncate(voter.voter, 4, 4, 11)}
                                </TableCell>
                                <TableCell>
                                    {timeAgo(voter.timestamp)}
                                </TableCell>
                                <TableCell>
                                    {" "}
                                    {voter.choosen ? (
                                        <Button variant="outlined">
                                            Accepted
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outlined"
                                            color="error"
                                        >
                                            Rejected
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* {voters.length >= 10 ? (
                        <button
                            aria-current="page"
                            className="rounded-full px-6 py-2.5 bg-blue-600
            font-medium text-xs leading-tight
            uppercase hover:bg-blue-700 focus:bg-blue-700
            focus:outline-none focus:ring-0 active:bg-blue-800
            transition duration-150 ease-in-out dark:text-gray-300
            dark:border dark:border-gray-500 dark:bg-transparent"
                        >
                            Load More
                        </button>
                    ) : null} */}
            {/* </Card> */}
        </Box>
    );
};

export default Voters;
