import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import ForumIcon from "@mui/icons-material/Forum";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { connectWallet } from "../utils";
import { useGlobalState, truncate } from "../store";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link } from "react-router-dom";
const theme = createTheme({
    palette: {
        neutral: {
            main: "#fff",
            contrastText: "#1976d2",
        },
    },
});
const Header = () => {
    const [connectedAccount] = useGlobalState("connectedAccount");

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link to={"/"}>
                        {" "}
                        <ForumIcon sx={{ paddingRight: 2 }} />
                    </Link>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        <Link to={"/"}>DaoChat</Link>
                    </Typography>
                    <ThemeProvider theme={theme}>
                        {connectedAccount ? (
                            <Button color="neutral" variant="contained">
                                <PersonOutlineIcon sx={{ paddingRight: 1 }} />
                                {truncate(connectedAccount, 4, 4, 11)}
                            </Button>
                        ) : (
                            <Button
                                color="neutral"
                                variant="contained"
                                onClick={connectWallet}
                            >
                                <AccountBalanceWalletIcon
                                    sx={{ paddingRight: 1 }}
                                />
                                Connect Wallet
                            </Button>
                        )}
                    </ThemeProvider>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default Header;
