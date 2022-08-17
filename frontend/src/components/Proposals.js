import { useState } from "react";
import { Link } from "react-router-dom";
import { truncate, useGlobalState, daysRemaining } from "../store";
import { payoutBeneficiary } from "../utils";
import { toast } from "react-toastify";
import { Button, Grid, Paper } from "@mui/material";
import { Box, Container } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import VisibilityIcon from "@mui/icons-material/Visibility";
const Proposals = () => {
    const [data] = useGlobalState("proposals");
    const [proposals, setProposals] = useState(data);
    const [selected, setSelected] = useState(1);
    const getAll = () => {
        setSelected(1);
        setProposals(data);
    };
    const getOpened = () => {
        setSelected(2);
        setProposals(
            data.filter(
                (proposal) =>
                    new Date().getTime() < Number(proposal.duration + "000")
            )
        );
    };

    const getClosed = () => {
        setSelected(3);
        setProposals(
            data.filter(
                (proposal) =>
                    new Date().getTime() > Number(proposal.duration + "000")
            )
        );
    };
    const handlePayout = (id) => {
        payoutBeneficiary(id).then((res) => {
            if (!!!res.code) {
                toast.success("Beneficiary successfully Paid Out!");
                window.location.reload();
            }
        });
    };

    return (
        <Box
            sx={{
                maxWidth: "60%",
                display: "flex",
                flexDirection: "column",
                margin: "auto",
            }}
        >
            <Container maxWidth="xs" sx={{ marginTop: 4 }}>
                <Button
                    variant={selected == 1 ? "contained" : "outlined"}
                    onClick={getAll}
                    sx={{ width: "33.3%", borderRadius: "4px 0 0 4px" }}
                >
                    All
                </Button>
                <Button
                    variant={selected == 2 ? "contained" : "outlined"}
                    color="success"
                    onClick={getOpened}
                    sx={{ width: "33.3%", borderRadius: "0 0 0 0" }}
                >
                    Open
                </Button>
                <Button
                    variant={selected == 3 ? "contained" : "outlined"}
                    color="error"
                    onClick={getClosed}
                    sx={{ width: "33.3%", borderRadius: "0 4px 4px 0" }}
                >
                    Closed
                </Button>
            </Container>

            <Paper elevation={2} sx={{ marginY: 2 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Created By</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Expires In</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {proposals.map((proposal) => (
                                <TableRow
                                    key={proposal.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {truncate(proposal.proposer, 4, 4, 11)}
                                    </TableCell>
                                    <TableCell>
                                        {proposal.title.substring(0, 80) + ".."}
                                    </TableCell>
                                    <TableCell>
                                        {new Date().getTime() >
                                        Number(proposal.duration + "000")
                                            ? "Expired"
                                            : daysRemaining(proposal.duration)}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={"/proposal/" + proposal.id}>
                                            <Button
                                                variant="contained"
                                                endIcon={<VisibilityIcon />}
                                            >
                                                View
                                            </Button>
                                        </Link>
                                        {new Date().getTime() >
                                        Number(proposal.duration + "000") ? (
                                            proposal.upvotes >
                                            proposal.downvotes ? (
                                                !proposal.paid ? (
                                                    <Button
                                                        onClick={() =>
                                                            handlePayout(
                                                                proposal.id
                                                            )
                                                        }
                                                    >
                                                        Payout
                                                    </Button>
                                                ) : (
                                                    <Button>Paid</Button>
                                                )
                                            ) : (
                                                <Button>Rejected</Button>
                                            )
                                        ) : null}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default Proposals;
