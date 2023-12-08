import React, { Fragment } from "react";
import {
    Dialog,
    DialogContent,
  } from "@mui/material";
import UpdatePost from "./UpdatePost";

const UpdatePostDialog = ({open,onClose,postId,image,title,description}) => {
 
  return (
    <Fragment>
      <Dialog open={open} onClose={onClose} PaperProps={{ style: { minWidth: '80vw', minHeight: '80vh' } }}>
        <DialogContent>
          <UpdatePost postId={postId} image={image} titled={title} desc={description} />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default UpdatePostDialog;
