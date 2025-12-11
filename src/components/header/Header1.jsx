

import { useContext, useState } from "react";
import { Stack } from "@mui/material";

// 🛑 التأكد من أن المسار صحيح لملف theme.jsx
import { ColorModeContext } from "../../theme"; 
import {
  Box,
  Container,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import {
  DarkModeOutlined,
  ExpandMore,
  LightModeOutlined,
} from "@mui/icons-material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const options = [
  'AR',
  'EN',

];

const Header1 = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{
      // 🟢 استخدام لون الخلفية من الثيم بدلاً من اللون الثابت
      bgcolor: theme.palette.bg.main, 
      py: "4px",
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4,

    }}>
      <Container>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography
            sx={{
              mr: 2,
              p: "3px 10px",
              // 🟢 استخدام لون الثيم الثانوي (الأخضر الدافئ) لشارة HOT
              bgcolor: theme.palette.secondary.main, 
              fontSize: "10px",
              fontWeight: "bold",
              color: "#fff",
              borderRadius: "12px",
            }}
            variant="body2"
          > HOT
          </Typography>

          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "300",
              color: "#fff",
            }}
            variant="body2"
          > Free Express Shipping
          </Typography>


          <Box flexGrow={1} />


          <div>
            {theme.palette.mode === "light" ? (
              <IconButton
                onClick={() => {
                  localStorage.setItem(
                    "mode",
                    theme.palette.mode === "dark" ? "light" : "dark"
                  );
                  colorMode.toggleColorMode();
                }}
                color="inherit"
              >
                <LightModeOutlined sx={{ fontSize:"16px", color: "#fff" }} />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  localStorage.setItem(
                    "mode",
                    theme.palette.mode === "dark" ? "light" : "dark"
                  );
                  colorMode.toggleColorMode();
                }}
                color="inherit"
              >
                <DarkModeOutlined sx={{ fontSize:"16px" }} />
              </IconButton>
            )}
          </div>

          <List
            component="nav"
            aria-label="Device settings"
            sx={{ p: 0, m: 0, }}
          >
            <ListItem

              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-label="when device is locked"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickListItem}
              sx={{ "&:hover": { cursor: "pointer" }, px: 1 }}
            >
              <ListItemText

                sx={{ ".MuiTypography-root": { fontSize: "10px", } }}
                secondary={options[selectedIndex]}
              />
              <ExpandMore sx={{ fontSize: "16px", color: "#fff" }} />
            </ListItem>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            
              MenuListProps={{
                "aria-labelledby": "lock-button",
                role: "listbox",
              
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                sx={{ fontsize: "11px", p: "3px 10px", minHeight: "10px" }}
                key={option}

                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
          <TwitterIcon
            sx={{
              fontSize: "16px",
              color: "#fff",
              mx: 1,
            }}
          />
          <FacebookIcon
            sx={{
              fontSize: "16px",
              color: "#fff",
              mx: 1,
            }}
          />
          <InstagramIcon
            sx={{
              fontSize: "16px",
              color: "#fff",
            }}
          />

        </Stack>
      </Container>


    </Box>
  );
};
export default Header1;