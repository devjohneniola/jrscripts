import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    submitButton: {
        backgroundColor: "#F85F46",
        // padding: theme.spacing(2, 0),
        margin: theme.spacing(2, 0),
        color: "#fff",
        "&:hover": {
            backgroundColor: "#F85F46",
        },
    },
    text: {
        textAlign: "center",
        margin: theme.spacing(3, 0, 8, 0),
    },
    form: {
        margin: theme.spacing(0, 10),
        [theme.breakpoints.down("md")]: {
            margin: theme.spacing(0),
        },
    },
    passwordreset: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: theme.spacing(5, 0),
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
        },
    },
    avatar: {
        border: "1px solid #F85F46",
        width: theme.spacing(15),
        height: theme.spacing(15),
        backgroundColor: "#fff",
        margin: theme.spacing(5, 0),
    },
    personicon: {
        color: "#A9A9A9",
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    password: {
        display: "flex",
        alignItems: "center",
        color: "#92532F",
    },
    lockAvatar: {
        backgroundColor: "#fef7ed",
        margin: theme.spacing(0, 2, 0, 0),
    },
    lockIcon: {
        color: "#92532F",
    },
    addressList: {
        display: "flex",
    },
}));

export default useStyles;
