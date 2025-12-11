import React, { useState } from 'react';
import { Container, Drawer, IconButton, ListItem, Stack, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
// 💡 استيراد Link من react-router-dom
import { Link } from 'react-router-dom'; 

// ... بقية الاستيرادات ...
import MenuIcon from '@mui/icons-material/Menu';
import WindowIcon from '@mui/icons-material/Window';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';

// 🌿 أيقونات الفئات المستدامة الجديدة
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalFloristOutlinedIcon from '@mui/icons-material/LocalFloristOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import RecyclingOutlinedIcon from '@mui/icons-material/RecyclingOutlined'; 

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import CloseIcon from '@mui/icons-material/Close';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import Links from './Links'; 


const Header3 = () => {
    // ... (بقية الـ State والـ Handlers كما هي)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = useTheme();

    // 🟢 استخدام useState بدلاً من React.useState
    const [state, setState] = useState({ 
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor, open) =>
            (event) => {
                if (
                    event.type === 'keydown' &&
                    // 🛑 تصحيح الخطأ النحوي هنا
                    (event.key === 'Tab' || event.key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    return (
        <Container sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 5 }}>
            <Box>
                {/* 1. زر فئات المتجر (Categories Button) */}
                {/* ... (الكود الخاص بالزر كما هو) ... */}
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{
                        width: 222,
                        bgcolor: theme.palette.myColor.main, 
                        color: theme.palette.text.primary,
                        "&:hover": { bgcolor: theme.palette.myColor.dark }
                    }}
                >
                    <WindowIcon />

                    <Typography
                        sx={{
                            padding: "0",
                            textTransform: "capitalize",
                            mx: 1,
                        }} >
                        Shop By Categories
                    </Typography>
                    <Box flexGrow={1} />
                    <KeyboardArrowRightIcon />
                </Button>
                
                {/* 2. القائمة المنسدلة للفئات (Categories Menu) */}
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                        list: { 'aria-labelledby': 'basic-button' },
                    }} 
                    sx={{
                        ".MuiPaper-root": {
                            width: 222,
                            bgcolor: theme.palette.myColor.main 
                        }
                    }}
                >
                    {/* 🌿 تحديث فئات المنتجات */}
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <HomeOutlinedIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
                        </ListItemIcon>
                        <ListItemText> Zero Waste Home</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <LocalFloristOutlinedIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
                        </ListItemIcon>
                        <ListItemText> Organic & Natural</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <CheckroomOutlinedIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
                        </ListItemIcon>
                        <ListItemText> Sustainable Fashion</ListItemText>
                    </MenuItem>
                    
                    {/* 🟢 التعديل 1: ربط "Local Brands" في القائمة المنسدلة */}
                    <MenuItem 
                        onClick={handleClose}
                        component={Link} // استخدام Link من react-router-dom
                        to="/brands"     // المسار الجديد 
                    >
                        <ListItemIcon>
                            <StoreOutlinedIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
                        </ListItemIcon>
                        <ListItemText> Local Brands</ListItemText>
                    </MenuItem>
                    
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <RecyclingOutlinedIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
                        </ListItemIcon>
                        <ListItemText> Recycle & Earn</ListItemText>
                    </MenuItem>
                </Menu>
            </Box>
            
            {/* 3. روابط الملاحة الأفقية (لأجهزة سطح المكتب) */}
            {useMediaQuery('(min-width:1200px)') && (
                <Stack gap={4} direction={"row"} alignItems={"center"}>
                    {/* 💡 هنا نفترض أن مكون Links الداخلي موجه لـ React Router */}
                    <Links title={"Home"} path={"/"} /> 
                    <Links title={"Shop"} path={"/shop"} />
                    <Links title={"Recycle & Earn"} path={"/recycle-earn"} /> 
                    <Links title={"Local Brands"} path={"/brands"} /> {/* 🟢 تعديل المسار */}
                    <Links title={"Blog & Guides"} path={"/blog"} />
                    <Links title={"About Us"} path={"/about"} /> 
                </Stack>
            )}
        
            {/* 4. أيقونة القائمة (للموبايل) */}
            {useMediaQuery('(max-width:1200px)') && (
                <IconButton onClick={toggleDrawer("top", true)}>
                    <MenuIcon />
                </IconButton>
            )}

            {/* 5. شريط القائمة الجانبي (Drawer) */}
            <Drawer
                anchor={"top"}
                open={state["top"]}
                onClose={toggleDrawer("top", false)}
                sx={{ ".MuiPaper-root.css-1sozasi-MuiPaper-root-MuiDrawer-paper": { height: "100%" } }}
            >
                {/* 💡 يمكن تحديث محتوى Drawer ليعكس الروابط الجديدة والألوان */}
                <Box sx={{ width: 444, mx: "auto", mt: 6, position: "relative", pt: 10 }}>
                    <IconButton
                        onClick={toggleDrawer("top", false)}
                        sx={{ position: 'absolute', top: 10, right: 10 }}
                    >
                        <CloseIcon />
                    </IconButton>
                        
                    {/* 💡 تم تحديد المسار هنا لـ "Local Brands" في Drawer */}
                    {[
                        { mainLink: "Home", links: [{ title: "Shop All", path: "/shop-all" }, { title: "Sale", path: "/sale" }] },
                        { mainLink: "Eco Services", links: [{ title: "Recycle & Earn", path: "/recycle-earn" }, { title: "Eco Points", path: "/eco-points" }] },
                        { mainLink: "Discover", links: [{ title: "Local Brands", path: "/brands" }, { title: "Blog & Guides", path: "/blog" }] },
                        { mainLink: "About Us", links: [{ title: "Our Mission", path: "/mission" }, { title: "Contact", path: "/contact" }] },
                    ].map((item) => {
                        return (
                            <Accordion key={item.mainLink} elevation={0} sx={{ bgcolor: "initial", color: theme.palette.text.primary }}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />} 
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography component="span" fontWeight={700}>{item.mainLink}</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ py: 0 }}>
                                    <List sx={{ py: "0", my: "0" }} >
                                        {item.links.map((link) => {
                                            return (
                                                <ListItem key={link.title} sx={{ py: "0", my: "0" }} >
                                                    <ListItemButton 
                                                    component={Link} // استخدام Link من react-router-dom
                                                    to={link.path}      // استخدام المسار المحدد
                                                    onClick={toggleDrawer("top", false)} // إغلاق الدرج عند النقر
                                                >
                                                        <ListItemText primary={link.title} />
                                                    </ListItemButton>
                                                </ListItem>
                                            )
                                        })}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}
                </Box>
            </Drawer>
        </Container>
    );
}
export default Header3;