import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    grid: {
        backgroundColor: "#E4F0EE",
        display: "flex",
        justifyContent: "space-between",
    },
    imgGrid: {
        height: "80vh",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    span: {
        color: "#F85F46",
    },
    typography: {
        padding: theme.spacing(3, 0),
    },
    innerGrid: {
        margin: theme.spacing(0, 10),
        padding: theme.spacing(3, 0),
    },
    submitButton: {
        backgroundColor: "#F85F46",
        color: "#fff",
        borderRadius: "20px",
    },
    root: {
        maxWidth: theme.spacing(40),
        margin: theme.spacing(4, 1),
    },
    gridImage: {
        display: "flex",
        padding: theme.spacing(2, 2),
        justifyContent: "center",
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(0, -5),
            flexDirection: "column",
        },
    },
    gridDesc: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    productContainer: {
        margin: theme.spacing(10, 0),
    },
    productCard: {
        maxWidth: theme.spacing(40),
        margin: theme.spacing(4, 3),
    },
    productImage: {
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    },
    productButton: {
        border: "1px solid #F85F46",
        borderRadius: theme.spacing(10),
        color: "#F85F46",
    },
    subscribe: {
        backgroundColor: "#E4F0EE",
        padding: theme.spacing(10, 0, 5, 0),
    },
}));

export default useStyles;
