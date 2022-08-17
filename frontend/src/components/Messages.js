import Identicon from "react-identicons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { truncate, useGlobalState } from "../store";
import { getMessages, sendMessage, CometChat } from "../utils/CometChat";
import { Avatar, Button, ListItemText, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import LogoutIcon from "@mui/icons-material/Logout";
const Messages = ({ gid }) => {
    const navigator = useNavigate();
    const [connectedAccount] = useGlobalState("connectedAccount");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessages(gid).then((msgs) => {
            if (!!!msgs.code)
                setMessages(msgs.filter((msg) => msg.category == "message"));
        });
        listenForMessage(gid);
    }, [gid]);

    const listenForMessage = (listenerID) => {
        CometChat.addMessageListener(
            listenerID,
            new CometChat.MessageListener({
                onTextMessageReceived: (message) => {
                    setMessages((prevState) => [...prevState, message]);
                    scrollToEnd();
                },
            })
        );
    };

    const handleMessage = (e) => {
        e.preventDefault();
        sendMessage(gid, message).then((msg) => {
            if (!!!msg.code) {
                setMessages((prevState) => [...prevState, msg]);
                setMessage("");
                scrollToEnd();
            }
        });
    };
    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
        };
    }

    const scrollToEnd = () => {
        const elmnt = document.getElementById("messages-container");
        elmnt.scrollTop = elmnt.scrollHeight;
    };

    const dateToTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        let strTime = hours + ":" + minutes + " " + ampm;
        return strTime;
    };

    return (
        <Box
            sx={{
                width: 400,

                height: 600,
                margin: "auto",
                marginTop: 10,
            }}
        >
            <Card
                elevation={8}
                sx={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "space-between",
                    height: "600px",
                    borderRadius: "2px 2px 0 0",
                }}
            >
                <CardContent sx={{ p: 0 }}>
                    <List
                        sx={{
                            width: "100%",
                        }}
                    >
                        {messages.map((message, i) => (
                            <>
                                <ListItem
                                    sx={{
                                        px: 4,
                                    }}
                                    key={i}
                                    alignItems="flex-start"
                                >
                                    <ListItemAvatar>
                                        <AccountCircleIcon
                                            color="disabled"
                                            fontSize="large"
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={message.text}
                                        secondary={
                                            <>
                                                <Typography
                                                    sx={{
                                                        display: "inline",
                                                        paddingRight: 2,
                                                        color: "GrayText",
                                                    }}
                                                    component="span"
                                                    variant="body2"
                                                >
                                                    {message.sender.uid.toLowerCase() !=
                                                    connectedAccount.toLowerCase() ? (
                                                        <span>
                                                            {"@" +
                                                                truncate(
                                                                    message
                                                                        .sender
                                                                        .uid,
                                                                    4,
                                                                    4,
                                                                    11
                                                                )}
                                                        </span>
                                                    ) : (
                                                        "@you"
                                                    )}
                                                </Typography>
                                                {dateToTime(
                                                    new Date(
                                                        message.sentAt * 1000
                                                    )
                                                )}
                                            </>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="fullWidth" component="li" />
                            </>
                        ))}
                    </List>
                </CardContent>
                <form onSubmit={handleMessage}>
                    <CardActions>
                        <TextField
                            fullWidth
                            sx={{ my: 2 }}
                            placeholder="Hello There"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            label="Write a message ..."
                            variant="outlined"
                        />
                    </CardActions>
                    <Button
                        sx={{
                            p: 2,
                            width: "50%",
                            background: "#f6f6f6",
                            color: "#d32f2f",
                            "&:hover": { color: "#fff" },
                            borderRadius: "0 0 2px 2px",
                        }}
                        color="error"
                        variant="contained"
                        onClick={() =>
                            gid.substr(4) === "-1"
                                ? navigator("/")
                                : navigator(`/proposal/${gid.substr(4)}`)
                        }
                        endIcon={<LogoutIcon />}
                    >
                        Exit Chat
                    </Button>
                    <Button
                        sx={{
                            p: 2,
                            width: "50%",
                            borderRadius: "0 0 2px 2px",
                        }}
                        variant="contained"
                        type="submit"
                        endIcon={<SendIcon />}
                    >
                        Send
                    </Button>
                </form>
            </Card>
        </Box>
    );
};

export default Messages;
