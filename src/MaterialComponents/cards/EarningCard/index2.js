import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";

import { FaCodeBranch } from "react-icons/fa";
import GetAppTwoToneIcon from "@material-ui/icons/GetAppOutlined";
import FileCopyTwoToneIcon from "@material-ui/icons/FileCopyOutlined";
import PictureAsPdfTwoToneIcon from "@material-ui/icons/PictureAsPdfOutlined";
import ArchiveTwoToneIcon from "@material-ui/icons/ArchiveOutlined";
// info: {light: '#64b5f6', main: '#2196f3', dark: '#1976d2', contrastText: '#fff'}
// mode: "dark"
// orange: {light: '#fbe9e7', main: '#ffab91', dark: '#d84315'}
// primary: {200: '#90caf9', 800: '#1565c0', light: '#e3f2fd', main: '#2196f3', dark: '#1e88e5', contrastText: '#fff'}
// purple: {200: '#b39ddb', 800: '#4527a0', light: '#ede7f6', main: '#673ab7', dark: '#5e35b1'}
// secondary: {200: '#b39ddb', 800: '#4527a0', light: '#ede7f6', main: '#673ab7', dark: '#5e35b1', contrastText: '#fff'}
// success: {light: '#b9f6ca',
const useStyles = makeStyles((theme) => {
  console.log(theme["palette"]);
  let palette = "orange";
  return {
    card: {
      backgroundColor: "#b42e04",
      color: "#fff",
      overflow: "hidden",
      position: "relative",
      "&:after": {
        content: '""',
        position: "absolute",
        width: "210px",
        height: "210px",
        backgroundColor: theme.palette[palette].dark,
        borderRadius: "50%",
        top: "-85px",
        right: "-95px",
        [theme.breakpoints.down("xs")]: {
          top: "-105px",
          right: "-140px",
        },
      },
      "&:before": {
        content: '""',
        position: "absolute",
        width: "210px",
        height: "210px",
        backgroundColor: theme.palette[palette].dark,
        borderRadius: "50%",
        top: "-125px",
        right: "-15px",
        opacity: 0.7,
        [theme.breakpoints.down("xs")]: {
          top: "-155px",
          right: "-70px",
        },
      },
    },
    content: {
      padding: "20px !important",
    },
    avatar: {
      ...theme.typography.commonAvatar,
      ...theme.typography.largeAvatar,
      backgroundColor: theme.palette[palette].dark,
      marginTop: "8px",
    },
    avatarRight: {
      ...theme.typography.commonAvatar,
      ...theme.typography.mediumAvatar,
      backgroundColor: theme.palette[palette].main,
      color: theme.palette[palette][200],
      zIndex: 1,
    },
    cardHeading: {
      fontSize: "2.125rem",
      fontWeight: 500,
      marginRight: "8px",
      marginTop: "18px",
      marginBottom: "8px",
    },
    subHeading: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: theme.palette[palette][200],
    },
    avatarCricle: {
      cursor: "pointer",
      ...theme.typography.smallAvatar,
      backgroundColor: theme.palette[palette][200],
      color: theme.palette[palette].dark,
    },
    circleIcon: {
      transform: "rotate3d(1, 1, 1, 45deg)",
    },
    menuItem: {
      marginRight: "14px",
      fontSize: "1.25rem",
    },
  };
});

const EarningCard = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Grid container direction="column">
          <Grid item>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Avatar variant="rounded" className={classes.avatar}>
                  <FaCodeBranch className="anticon anticon-dashboard" />
                </Avatar>
              </Grid>
              <Grid item>
                {/* <Avatar
                  variant="rounded"
                  className={classes.avatarRight}
                  aria-controls="menu-earning-card"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreHorizIcon fontSize="inherit" />
                </Avatar> */}
                <Menu
                  id="menu-earning-card"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  variant="selectedMenu"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <GetAppTwoToneIcon
                      fontSize="inherit"
                      className={classes.menuItem}
                    />{" "}
                    Import Card
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <FileCopyTwoToneIcon
                      fontSize="inherit"
                      className={classes.menuItem}
                    />{" "}
                    Copy Data
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <PictureAsPdfTwoToneIcon
                      fontSize="inherit"
                      className={classes.menuItem}
                    />{" "}
                    Export
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ArchiveTwoToneIcon
                      fontSize="inherit"
                      className={classes.menuItem}
                    />{" "}
                    Archive File
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Typography className={classes.cardHeading}>
                  {props.data}
                </Typography>
              </Grid>
              {/* <Grid item>
                <Avatar className={classes.avatarCricle}>
                  <ArrowUpwardIcon
                    fontSize="inherit"
                    className={classes.circleIcon}
                  />
                </Avatar>
              </Grid> */}
            </Grid>
          </Grid>
          <Grid item>
            <Typography className={classes.subHeading}>
              {props.label}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EarningCard;
