

import Badge from "@mui/material/Badge";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'; 
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { ExpandMore } from '@mui/icons-material';
import ListItem from '@mui/material/ListItem';
import { Container, Stack, Typography, IconButton } from "@mui/material"; 
import { styled, alpha, InputBase, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// 🌟 الاستيرادات الجديدة والمهمة للربط بالسلة والتوجيه (Router) وحالة المستخدم
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx'; 
import { useAuth } from '../../context/AuthContext.jsx'; 

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Search = styled('div')(({ theme }) => ({
  flexGrow: 0.4,
  position: 'relative',
  borderRadius: "22px", 
  border: `1px solid ${theme.palette.primary.main}`, 
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1), 
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '266px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '330px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary, 
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

// 🌿 تحديث فئات البحث
const options = [
  'All Eco Products',
  'Plastic-Free',
  'Organic Skincare',
  'Sustainable Clothing',
];

// 🛑 استقبال الخاصية onSearchChange من المكون الأب
const Header2 = ({ onSearchChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0); 
  const open = Boolean(anchorEl);

    // 🌟 استخدام حالة السلة وحساب العدد الكلي
    const { cartItems } = useCart();
    // حساب العدد الإجمالي للكميات في السلة
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0); 

    // 👤 جلب حالة المستخدم
    const { currentUser } = useAuth(); 
    const userPath = currentUser ? "/profile" : "/login"; 
    
    // 🛑 دالة معالجة البحث - تستدعي الدالة الممررة من App.jsx
    const handleSearchChange = (event) => {
        if (onSearchChange) {
            onSearchChange(event.target.value);
        }
    };


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

  const theme = useTheme();

  return (
    <Container sx={{ my: 3, display: "flex", justifyContent: "space-between" }}>
      {/* 🌿 الشعار (Logo) */}
      <Stack alignItems={"center"}>
        <ShoppingCartOutlinedIcon sx={{ color: theme.palette.primary.main, fontSize: 35 }} /> 
        <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 700 }}> 
          Eco-Store
        </Typography>
      </Stack>

      {/* شريط البحث (Search Bar) */}
      <Search sx={{
        borderRadius: "22px",
        display: "flex",
        justifyContent: "space-between"
      }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search Eco Products..." 
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleSearchChange} // 🛑 ربط دالة معالجة التغيير
        />
        <div>
          <List
            component="nav"
            aria-label="Device settings"
            sx={{
              bgcolor: theme.palette.myColor?.main, 
              borderBottomLeftRadius: 22,
              borderTopRightRadius: 22,
              p: "0",
            }}
          >
            <ListItem
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-label="when device is locked"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickListItem}
            >
              <ListItemText
                sx={{ width: 93, textAlign: "center", "&:hover": { cursor: "pointer" } }}
                secondary={options[selectedIndex]}
              />
              <ExpandMore sx={{ fontSize: "16px" }} />
            </ListItem>
          </List>

          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                'aria-labelledby': 'lock-button',
                role: 'listbox',
              },
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                sx={{ fontSize: "13px" }}
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Search>

      {/* 🌿 أدوات المستخدم (User Tools) */}
      <Stack direction={"row"} alignItems={"center"}>
        <IconButton aria-label="wishlist">
          <FavoriteBorderOutlinedIcon sx={{ color: theme.palette.text.primary }} />
        </IconButton>

        <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}> 
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={totalItems} color="secondary"> 
              <ShoppingCartIcon sx={{ color: theme.palette.text.primary }}/> 
            </StyledBadge>
          </IconButton>
        </Link>

        <Link to={userPath} style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton>
            <PersonOutlineOutlinedIcon sx={{ color: theme.palette.text.primary }} />
          </IconButton>
        </Link>
      </Stack>
    </Container>
  );
};

export default Header2;