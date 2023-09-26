import {
    CardMedia,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import React, { Fragment, useEffect } from "react";

function ViewProdectDescription({ description }) {
    const productDescription = description;

    return (
        <Fragment>
            <DialogContent>
                <Typography variant="h5">{productDescription}</Typography>
            </DialogContent>
        </Fragment>
    );
}

export default ViewProdectDescription;
