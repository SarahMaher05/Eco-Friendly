import React from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    Typography, 
    Box,
    useTheme
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useNavigate } from 'react-router-dom'; // 👈 التعديل 1: استيراد خطاف التوجيه

export default function LoginPromptModal({ open, handleClose }) {
    const theme = useTheme();
    const navigate = useNavigate(); // 👈 التعديل 2: تفعيل خطاف التوجيه

    // 🌟 دالة للانتقال لصفحة تسجيل الدخول
    const handleLogin = () => {
        handleClose(); // إغلاق المودال أولاً
        navigate('/login'); // التوجيه لصفحة تسجيل الدخول
    };

    // 🌟 دالة للانتقال لصفحة إنشاء حساب
    const handleSignUp = () => {
        handleClose(); // إغلاق المودال أولاً
        navigate('/signup'); // التوجيه لصفحة إنشاء حساب
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose} 
            aria-labelledby="login-prompt-title"
            maxWidth="xs"
            fullWidth
        >
            <Box sx={{ textAlign: 'center', p: 2 }}>
                <LockOpenIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 1 }} />
                <DialogTitle id="login-prompt-title" sx={{ p: 0, mb: 1, fontWeight: 700 }}>
                    Please Log In to Proceed
                </DialogTitle>
            </Box>
            
            <DialogContent sx={{ textAlign: 'center', pb: 1 }}>
                <Typography variant="body1" color="text.secondary" mb={2}>
                    You must be logged in to complete your purchase.
                </Typography>
                
                <Button 
                    variant="contained" 
                    onClick={handleLogin} // ✅ استخدام دالة التوجيه
                    fullWidth 
                    size="large" 
                    startIcon={<LockOpenIcon />}
                    sx={{ mb: 1.5 }}
                >
                    Log In to Your Account
                </Button>

                <Typography variant="body2" sx={{ mt: 2, color: theme.palette.text.primary }}>
                    Don't have an account yet?
                </Typography>
                
                <Button 
                    variant="outlined" 
                    onClick={handleSignUp} // ✅ استخدام دالة التوجيه
                    fullWidth 
                    size="large" 
                    startIcon={<PersonAddAltIcon />}
                    sx={{ mt: 1 }}
                >
                    Sign Up Now
                </Button>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center', pt: 1, pb: 2 }}>
                <Button onClick={handleClose} color="error" autoFocus>
                    Continue Shopping
                </Button>
            </DialogActions>
        </Dialog>
    );
}