import moment from "moment";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getGroup, createNewGroup, joinGroup } from "../utils/CometChat";
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
} from "recharts";
import { getProposal, voteOnProposal } from "../utils";
import { useGlobalState } from "../store";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chat from "./Chat";

const ProposalDetails = () => {
    const { id } = useParams();
    const navigator = useNavigate();
    const [proposal, setProposal] = useState(null);
    const [group, setGroup] = useState(null);
    const [data, setData] = useState([]);
    const [isStakeholder] = useGlobalState("isStakeholder");
    const [connectedAccount] = useGlobalState("connectedAccount");
    const [currentUser] = useGlobalState("currentUser");

    useEffect(() => {
        retrieveProposal();
        getGroup(`pid_${id}`).then((group) => {
            if (!!!group.code) setGroup(group);
            console.log(group);
        });
    }, [id]);

    const retrieveProposal = () => {
        getProposal(id).then((res) => {
            setProposal(res);
            setData([
                {
                    name: "Voters",
                    Acceptees: res?.upvotes,
                    Rejectees: res?.downvotes,
                },
            ]);
        });
    };

    const onVote = (choice) => {
        if (new Date().getTime() > Number(proposal.duration + "000")) {
            toast.warning("Proposal expired!");
            return;
        }

        voteOnProposal(id, choice).then((res) => {
            if (!!!res.code) {
                toast.success("Voted successfully!");
                window.location.reload();
            }
        });
    };

    const daysRemaining = (days) => {
        const todaysdate = moment();
        days = Number((days + "000").slice(0));
        days = moment(days).format("YYYY-MM-DD");
        days = moment(days);
        days = days.diff(todaysdate, "days");
        return days == 1 ? "1 day" : days + " days";
    };

    const onEnterChat = () => {
        toast("Entering Proposal Chat...", { autoClose: 500 });
        if (group.hasJoined) {
            navigator(`/chat/${`pid_${id}`}`);
        } else {
            joinGroup(`pid_${id}`).then((res) => {
                if (!!res) {
                    navigator(`/chat/${`pid_${id}`}`);
                    console.log("Success joining: ", res);
                } else {
                    console.log("Error Joining Group: ", res);
                }
            });
        }
    };

    const onCreateGroup = () => {
        createNewGroup(`pid_${id}`, proposal.title).then((group) => {
            if (!!!group.code) {
                toast.success("Group created successfully!");
                setGroup(group);
            } else {
                console.log("Error Creating Group: ", group);
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
                marginTop: 5,
            }}
        >
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {proposal?.title}
                    </Typography>

                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        This proposal is to payout{" "}
                        <strong>{proposal?.amount} Eth</strong> and currently
                        have{" "}
                        <strong>
                            {proposal?.upvotes + proposal?.downvotes} votes
                        </strong>{" "}
                        and will expire in{" "}
                        <strong>{daysRemaining(proposal?.duration)}</strong>
                    </Typography>
                    <Typography
                        sx={{ fontSize: 14, marginBottom: 6 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        <strong>Description - </strong>
                        {proposal?.description}
                    </Typography>
                    <BarChart width={400} height={300} data={data}>
                        <XAxis dataKey="name" stroke="#8884d8" />
                        <YAxis />
                        <Tooltip
                            wrapperStyle={{
                                width: 100,
                                backgroundColor: "#ccc",
                            }}
                        />
                        <Legend
                            width={100}
                            wrapperStyle={{
                                top: 40,
                                right: 20,
                                backgroundColor: "#f5f5f5",
                                border: "1px solid #d5d5d5",
                                borderRadius: 3,
                                lineHeight: "40px",
                            }}
                        />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Bar dataKey="Acceptees" fill="#1976d2" barSize={30} />
                        <Bar dataKey="Rejectees" fill="#d32f2f" barSize={30} />
                    </BarChart>

                    {isStakeholder ? (
                        <>
                            <Button
                                sx={{ margin: "0 1em 0 0" }}
                                variant="outlined"
                                onClick={() => onVote(true)}
                            >
                                Accept
                            </Button>
                            <Button
                                sx={{ margin: "0 1em 0 0" }}
                                variant="outlined"
                                color="error"
                                onClick={() => onVote(false)}
                            >
                                Reject
                            </Button>

                            {currentUser &&
                            currentUser.uid.toLowerCase() ==
                                proposal?.proposer.toLowerCase() &&
                            !group ? (
                                <Button
                                    color="success"
                                    sx={{ margin: "0 1em 0 0" }}
                                    variant="outlined"
                                    onClick={onCreateGroup}
                                >
                                    Create Chat Group
                                </Button>
                            ) : null}
                        </>
                    ) : null}

                    {currentUser &&
                    currentUser.uid.toLowerCase() ==
                        connectedAccount.toLowerCase() &&
                    !!!group?.code &&
                    group != null ? (
                        <Button
                            sx={{ margin: "0 1em 0 0", px: 3 }}
                            variant="contained"
                            onClick={onEnterChat}
                        >
                            Proposal Discussion
                        </Button>
                    ) : (
                        <Chat />
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default ProposalDetails;
