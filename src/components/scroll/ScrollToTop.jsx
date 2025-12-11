import React from 'react';
import { Fab, Zoom, useScrollTrigger, useTheme } from '@mui/material'; // 💡 استيراد useTheme
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'; 

export default function ScrollToTop() {
    const theme = useTheme(); // 💡 استخدام الثيم هنا
    
    return (
        <Zoom in={useScrollTrigger({threshold : 100} )}>
            <Fab  
                onClick={() => {
                    window.scrollTo(0, 0);
                }}
                variant="extended"
                size="small" 
                sx={{
                    position: "fixed",
                    bottom: 33, 
                    right: 33,
                    // 🌿 تأكيد اللون الأخضر الأساسي
                    bgcolor: theme.palette.primary.main, 
                    color: "white", 
                    "&:hover": {
                        bgcolor: theme.palette.primary.dark, // لون أغمق عند التحويم
                    }
                }}
                aria-label="scroll back to top"
                // 💡 إزالة color="primary" واستخدام sx بدلاً منه لمرونة أكبر
            > 
                    <KeyboardArrowUpIcon fontSize="medium" /> 
            </Fab>
        </Zoom>
    );
}