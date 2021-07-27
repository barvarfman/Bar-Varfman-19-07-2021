import React, { useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {

    const [open, setOpen] = React.useState(false);
   
    // Open or close modal upon prop isOpen.
    useEffect(() => {
        if(props.isOpen.open){
            handleClickOpen();
        }else{
            handleClose();
        }
    }, [props.isOpen.open])

    const handleClickOpen = () => {
        setOpen(true);
    };

    // On close modal call setIsOpenFalse function in Home page.
    const handleClose = () => {
        props.setIsOpenFalse();
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                {/* set modal content */}
                <DialogTitle id="alert-dialog-slide-title">{props.isOpen.title}</DialogTitle>
                <DialogContent>
                </DialogContent>
            </Dialog>
        </div>
    );
}