import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { raiseProposal } from "../utils";
import { setGlobalState, useGlobalState } from "../store";
import { toast } from "react-toastify";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DoneIcon from "@mui/icons-material/Done";
const CreateProposal = () => {
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
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [beneficiary, setBeneficiary] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description || !beneficiary || !amount) return;
        const proposal = { title, description, beneficiary, amount };

        raiseProposal(proposal).then((proposed) => {
            if (proposed) {
                toast.success("Proposal created, reloading in progress...");
                closeModal();
                window.location.reload();
            }
        });
    };

    const closeModal = () => {
        resetForm();
    };

    const resetForm = () => {
        setTitle("");
        setAmount("");
        setBeneficiary("");
        setDescription("");
    };

    return (
        <Box sx={style}>
            <Typography
                variant="h6"
                component="div"
                sx={{ textAlign: "center", flexGrow: 1 }}
            >
                Raise A Proposal
            </Typography>
            <TextField
                fullWidth
                id="outlined-basic"
                label="Title"
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
                sx={{ marginTop: 2 }}
            />
            <TextField
                fullWidth
                id="filled-basic"
                label="eg 2.5 Eth"
                placeholder="e.g 2.5 Eth"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                required
                type="number"
                sx={{ marginTop: 2 }}
            />
            <TextField
                fullWidth
                label="Beneficiary Address"
                name="beneficiary"
                placeholder="Beneficiary Address"
                onChange={(e) => setBeneficiary(e.target.value)}
                value={beneficiary}
                required
                sx={{ marginTop: 2 }}
            />
            <TextField
                fullWidth
                id="standard-basic"
                label="Description"
                name="description"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
                sx={{ marginTop: 2 }}
            />
            <Button
                sx={{ marginTop: 2, p: 1 }}
                fullWidth
                variant="contained"
                onClick={handleSubmit}
            >
                Submit Proposal <DoneIcon />
            </Button>
        </Box>
    );
};

export default CreateProposal;
