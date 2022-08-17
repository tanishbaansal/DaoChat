import { Box, Button, Fade, Modal } from "@mui/material";
import React, { useState } from "react";
import ChatLogin from "./ChatLogin";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
const Chat = (props) => {
    const [login, setLogin] = useState(false);
    return (
        <>
            <Modal open={login} closeAfterTransition>
                <Fade in={login}>
                    <Box>
                        <ChatLogin />
                    </Box>
                </Fade>
            </Modal>
            {login ? (
                <Button
                    variant="contained"
                    type="submit"
                    color="error"
                    sx={props.style}
                    endIcon={<ChatBubbleOutlineIcon />}
                    disabled
                >
                    Login Chat
                </Button>
            ) : (
                <>
                    <Button
                        variant="contained"
                        type="submit"
                        color="error"
                        sx={props.style}
                        endIcon={<ChatBubbleOutlineIcon />}
                        onClick={() => setLogin(true)}
                    >
                        Login Chat
                    </Button>
                </>
            )}
        </>
    );
};

export default Chat;
