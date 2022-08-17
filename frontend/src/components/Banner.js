import { setGlobalState, useGlobalState } from "../store";
import { performContribute } from "../utils";
import { toast } from "react-toastify";
import { Container } from "@mui/system";
import { useState } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InfoIcon from "@mui/icons-material/Info";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import {
    Backdrop,
    Box,
    Divider,
    Fade,
    Grid,
    Modal,
    Paper,
    Stack,
    TextField,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CelebrationIcon from "@mui/icons-material/Celebration";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateProposal from "./CreateProposal";
import Chat from "./Chat";
import { createNewGroup, joinGroup } from "../utils/CometChat";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
const Banner = () => {
    const navigator = useNavigate();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    function handleClick() {
        setLoading(true);
    }
    const [isStakeholder] = useGlobalState("isStakeholder");
    const [proposals] = useGlobalState("proposals");
    const [connectedAccount] = useGlobalState("connectedAccount");
    const [currentUser] = useGlobalState("currentUser");
    const [balance] = useGlobalState("balance");
    const [mybalance] = useGlobalState("mybalance");
    const [globalchat, setGlobalChat] = useState(false);
    const [amount, setAmount] = useState("");
    let buttonWidth = "";
    if (isStakeholder && currentUser) {
        buttonWidth = "33.33%";
    } else {
        buttonWidth = "50%";
    }

    const handleClose = () => setOpen(false);
    const onPropose = () => {
        if (!isStakeholder) return;
        setOpen(true);
    };

    const onContribute = () => {
        if (!!!amount || amount == "") {
            toast.warn("Please fill out the contribution amount", {
                autoClose: 2000,
            });
            return;
        }
        toast.info("Contribution in progress...");

        performContribute(amount).then((bal) => {
            if (!!!bal.message) {
                setGlobalState("balance", Number(balance) + Number(bal));
                setGlobalState("mybalance", Number(mybalance) + Number(bal));

                toast.success("Contribution received");
                setAmount("");
            }
        });
    };

    const startChat = () => {
        joinGroup(`pid_${-1}`).then((res) => {
            if (!!res) {
                navigator(`/chat/${`pid_${-1}`}`);
                console.log("Success joining: ", res);
            } else {
                console.log("Error Joining Group: ", res);
            }
        });
    };
    const onGlobalChat = () => {
        toast("Starting Global Chat...", { autoClose: 1000 });
        globalchat
            ? startChat()
            : createNewGroup(`pid_${-1}`, "Global Chat").then((group) => {
                  if (!!!group.code) {
                      toast.success("Global Chat Created successfully!");
                      startChat();
                      setGlobalChat(true);
                  } else {
                      setGlobalChat(true);
                      startChat();
                  }
              });
    };
    const opened = () =>
        proposals.filter(
            (proposal) =>
                new Date().getTime() < Number(proposal.duration + "000")
        ).length;

    return (
        <Box
            sx={{
                maxWidth: "60%",
                display: "flex",
                flexDirection: "column",
                margin: "auto",
                marginTop: 4,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Paper
                    elevation={2}
                    sx={{
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        px: 4,
                        borderRadius: "4px 0 0 4px",
                        marginY: 2,
                    }}
                >
                    <Typography variant="h2" component="div">
                        <AutoGraphIcon fontSize="large" />
                    </Typography>
                </Paper>
                <Paper
                    elevation={2}
                    sx={{
                        flexFlow: "column",
                        width: "100%",
                        display: "flex",
                        borderRadius: "0px 4px 4px 0px",
                        p: 2,
                        marginY: 2,
                    }}
                >
                    <Typography variant="h5" sx={{ pb: 2 }} component="div">
                        {opened()} Proposal{opened() == 1 ? "" : "s"} Currenly
                        Opened
                    </Typography>
                    <Typography variant="body2">
                        DAO Balance: <strong>{balance} Eth</strong> <br />
                        Your contributions:{" "}
                        <span>
                            <strong>{mybalance} Eth</strong>
                            {isStakeholder
                                ? ", and you are now a stakeholder 😊"
                                : null}
                        </span>
                    </Typography>
                </Paper>
            </Box>

            <Paper elevation={2} sx={{ my: 4 }}>
                {isStakeholder ? null : (
                    <Button
                        variant="text"
                        fullWidth
                        sx={{
                            backgroundColor: "#1976d2",
                            p: 2,
                            color: "#fff",
                            "&:hover": { backgroundColor: "#0754a1" },
                            borderRadius: "4px 4px 0px 0px",
                        }}
                        endIcon={<PeopleOutlineIcon />}
                    >
                        Contribute upto 0.1ETH to become a stakeholder of
                        DaoChat
                    </Button>
                )}
                <Grid sx={{ p: 2 }}>
                    <Grid item xs>
                        <Typography variant="body2"></Typography>
                        <TextField
                            fullWidth
                            label="Eth to contribute to Dao eg. 2 Eth"
                            type="number"
                            onChange={(e) => setAmount(e.target.value)}
                            value={amount}
                            variant="standard"
                            sx={{ marginY: 2 }}
                        />
                    </Grid>
                </Grid>

                <Button
                    variant="contained"
                    type="button"
                    sx={{
                        width: buttonWidth,
                        p: 2,

                        lineHeight: 1,
                        borderRadius: "0",
                    }}
                    onClick={onContribute}
                    endIcon={<AttachMoneyIcon />}
                >
                    Contribute
                </Button>

                {currentUser &&
                currentUser.uid == connectedAccount.toLowerCase() ? (
                    isStakeholder ? (
                        <Button
                            variant="contained"
                            type="submit"
                            color="error"
                            sx={{
                                width: buttonWidth,
                                p: 2,
                                lineHeight: 1,
                                borderRadius: "0",
                            }}
                            onClick={onGlobalChat}
                            endIcon={<ChatBubbleOutlineIcon />}
                        >
                            DAO Global Chat
                        </Button>
                    ) : (
                        <Button
                            variant="text"
                            type="submit"
                            color="error"
                            sx={{
                                width: buttonWidth,
                                lineHeight: 1,
                                borderRadius: "0",
                            }}
                            disabled
                            endIcon={<ChatBubbleOutlineIcon />}
                        >
                            DAO Chat (Only For StakeHolders)
                        </Button>
                    )
                ) : (
                    <Chat
                        style={{
                            width: buttonWidth,
                            p: 2,
                            lineHeight: 1,
                            borderRadius: "0 0 0px 0px",
                        }}
                    />
                )}
                {isStakeholder ? (
                    <>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{
                                width: buttonWidth,
                                p: 2,
                                borderRadius: "0",
                                lineHeight: 1,
                            }}
                            onClick={onPropose}
                            endIcon={<PeopleOutlineIcon />}
                        >
                            Add Proposal
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                        >
                            <Fade in={open}>
                                <Box>
                                    <CreateProposal />
                                </Box>
                            </Fade>
                        </Modal>
                    </>
                ) : null}
            </Paper>
        </Box>
    );
};

export default Banner;
