

import React from 'react';
import { ExpandMore } from '@mui/icons-material';
// 💡 استيراد Link من react-router-dom
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, List, ListItem, ListItemButton, ListItemText, useTheme } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// 🌿 البيانات الديناميكية للقوائم المنسدلi)
const dropDownData = {
    "Recycle & Earn": {
        dropdown: [
            { primary: "Schedule Pickup", link: "/recycle/schedule" },
            { primary: "Eco-Points Balance", link: "/rewards/balance" },
           
        ], 
        path: "/recycle" 
    },
    "Blog & Guides": {
        dropdown: [
          
            { primary: "Eco-Living Tips", link: "/blog" }, 
            { primary: "Meet Local Brands", link: "/local-brands" },
        ], 
        path: "/blog"
    },
    "Shop": {
        dropdown: [
            { primary: "All Eco Products", link: "/shop/all" },
            { primary: "Sustainable Sales", link: "/shop/sale" },
         
        ],
        path: "/shop"
    },
    "About Us": {
        dropdown: [
            { primary: "Our Green Mission", link: "/about/mission" },
            { primary: "Contact & Support", link: "/contact" },
        ],
        path: "/about"
    },
    // الروابط التي لا تحتاج قائمة منسدلة (تم تعريف المسار هنا)
    "Home": { dropdown: [], path: "/" },
    "Local Brands": { dropdown: [], path: "/brands" }, // 🟢 المسار المطلوب لإصلاح المشكلة السابقة
};

function Links({ title }) {
    const theme = useTheme();
    
    const linkData = dropDownData[title] || { dropdown: [], path: '#' };
    const data = linkData.dropdown;
    const path = linkData.path; 
    
    const hasDropdown = data.length > 0;
    
    // 💡 دالة لتطبيق ألوان الـ Hover
    const hoverStyles = {
        color: theme.palette.primary.main,
        '& .MuiListItemButton-root:hover': {
            bgcolor: theme.palette.myColor.main,
        }
    };
    
    // 🟢 المحتوى الذي سيتم تغليفه بالـ Link أو الـ Box
    const Content = (
        <React.Fragment>
            {/* 1. نص الرابط */}
            <Typography variant="body1" 
                sx={{
                    fontWeight: hasDropdown ? 500 : 400,
                    color: theme.palette.text.primary,
                    "&:hover": { color: theme.palette.primary.main }
                }}
            >
                {title}
            </Typography>
            
            {/* 2. أيقونة ExpandMore */}
            {hasDropdown && (
                <ExpandMore sx={{ 
                    fontSize: "16px", 
                    ml: 1, 
                    color: theme.palette.text.secondary,
                    "&:hover": { color: theme.palette.primary.main }
                }} />
            )}
        </React.Fragment>
    );

    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                // 💡 سطر التحكم في إظهار القائمة المنسدلة عند التحويم (Hover)
                "&:hover .show-when-hover": { display: hasDropdown ? "block" : "none" },
            }}
        >
            {/* 🟢 الشرط: إذا لم يكن هناك قائمة منسدلة، نغلف بـ Link ليتصرف كزر توجيه */}
            {!hasDropdown ? (
                <Link to={path} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    {Content}
                </Link>
            ) : (
                // إذا كان هناك قائمة منسدلة، نستخدم المحتوى بدون Link للحفاظ على خاصية التحويم للـ Box
                Content
            )}
            
            {/* 3. القائمة المنسدلة (Dropdown Menu) */}
            {hasDropdown && (
                <Box
                    className="show-when-hover"
                    sx={{
                        position: "absolute",
                        top: "100%",
                        minWidth: "170px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "none", // يجب أن تكون مخفية افتراضياً
                        zIndex: 20,
                    }}
                >
                    <Paper sx={{ mt: 2, ...hoverStyles }}>
                        <List>
                            {data.map((item) => (
                                <ListItem 
                                    key={item.primary} 
                                    disablePadding
                                >
                                    <ListItemButton 
                                        // 💡 استخدام component={Link} و to={item.link} للتوجيه
                                        component={Link} 
                                        to={item.link}
                                        sx={{ 
                                            color: theme.palette.text.primary,
                                            textDecoration: 'none'
                                        }}
                                    >
                                        <ListItemText primary={item.primary} />
                                        {item.nested && <KeyboardArrowRightIcon fontSize="small" />}
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Box>
            )}
        </Box>
    );
}

export default Links;