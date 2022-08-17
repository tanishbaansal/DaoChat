import { FaTimes } from "react-icons/fa";
import { loginWithCometChat, signInWithCometChat } from "../utils/CometChat";
import { setGlobalState, useGlobalState } from "../store";
import { toast } from "react-toastify";
import { Box, Button, Typography } from "@mui/material";

const ChatLogin = () => {
    const [loginModal] = useGlobalState("loginModal");
    const [connectedAccount] = useGlobalState("connectedAccount");

    const handleSignUp = () => {
        signInWithCometChat(connectedAccount, connectedAccount).then((user) => {
            if (!!!user.code) {
                toast.success("Account created, now click the login button.");
            } else {
                toast.error(user.message);
            }
        });
    };

    const handleLogin = () => {
        loginWithCometChat(connectedAccount).then((user) => {
            if (!!!user.code) {
                setGlobalState("currentUser", user);
                toast.success("Logged in successful!");
                closeModal();
            } else {
                toast.error(user.message);
            }
        });
    };

    const closeModal = () => {
        setGlobalState("loginModal", "scale-0");
    };
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 300,
        bgcolor: "#fff",
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };
    return (
        <Box sx={style}>
            <Typography
                variant="h6"
                component="div"
                sx={{ textAlign: "center", flexGrow: 1 }}
            >
                Once you login, you will be enabled to chat with other
                stakeholders to make a well-informed voting.
            </Typography>

            <Button
                sx={{ marginTop: 2, p: 1 }}
                fullWidth
                variant="contained"
                onClick={handleLogin}
            >
                Login
            </Button>
            <Button
                sx={{ marginTop: 2, p: 1 }}
                fullWidth
                variant="contained"
                onClick={handleSignUp}
            >
                Create Account
            </Button>
        </Box>
    );
};

export default ChatLogin;
