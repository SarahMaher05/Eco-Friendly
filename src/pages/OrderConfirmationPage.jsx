// src/pages/OrderConfirmationPage.jsx (الكود المصحح للحلقة اللانهائية)

import React, { useEffect } from 'react';
import { 
    Container, Typography, Box, Paper, Button, Stack, useTheme 
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; 

// دالة توليد رقم الطلب (نستخدمها لمرة واحدة في التهيئة)
const generateOrderNumber = () => {
    return 'ECO-' + Math.floor(100000 + Math.random() * 900000);
};

export default function OrderConfirmationPage() {
    const theme = useTheme(); 
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    // جلب clearCart
    const { clearCart } = useCart(); 

    // توليد رقم الطلب لمرة واحدة فقط باستخدام دالة التهيئة (وهذا يحل مشكلة العد المستمر)
    const [orderNumber] = React.useState(generateOrderNumber); 
    
    // 💡 حالة بسيطة لتتبع ما إذا تم إفراغ السلة بالفعل
    const [isCartCleared, setIsCartCleared] = React.useState(false); 

    useEffect(() => {
        // 🚨 التعديل الرئيسي لحل الحلقة اللانهائية:
        // 1. استخدام isCartCleared للتأكد من التنفيذ مرة واحدة.
        // 2. حذف clearCart من مصفوفة الاعتماديات إذا لم تكن مغلفة بـ useCallback.
        
        if (currentUser && !isCartCleared) {
            clearCart();
            setIsCartCleared(true); // نؤشر إلى أنه تم التنفيذ
        }
        
    // 🛑 نستخدم قاعدة ESLint للسماح بحذف clearCart من الاعتماديات هنا
    // إذا كنت تستخدم ESLint، قد تحتاج لتعطيل القاعدة لهذا السطر:
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [currentUser, isCartCleared]); 
    // ملاحظة: إذا قمت بتغليف clearCart بـ useCallback في Context، يمكنك إضافتها هنا.

    // إذا لم يكن هناك مستخدم مسجل الدخول، نعيده إلى الصفحة الرئيسية
    if (!currentUser) {
        return <Navigate to="/" replace />;
    }

    return (
        <Container maxWidth="sm" sx={{ pt: 15, pb: 10 }}>
            <Paper elevation={4} sx={{ p: 5, borderRadius: 3, textAlign: 'center' }}>
                
                <CheckCircleIcon sx={{ fontSize: 80, color: '#4CAF50', mb: 3 }} />
                
                <Typography variant="h3" fontWeight={700} color="#4CAF50" mb={2}>
                    Order Confirmed!
                </Typography>
                
                <Typography variant="h6" color="text.primary" mb={1}>
                    Thank you, **{currentUser.fullName || 'Valued Customer'}**!
                </Typography>
                
                <Typography variant="body1" color="text.secondary" mb={4}>
                    Your order **{orderNumber}** has been successfully placed and is now being processed.
                </Typography>
                
                <Box sx={{ bgcolor: theme.palette.mode === 'dark' ? '#1e2832' : '#f5f5f5', p: 2, borderRadius: 1, mb: 4 }}>
                    <Typography variant="body2" fontWeight={600}>
                        A confirmation email has been sent to: {currentUser.email}
                    </Typography>
                </Box>

                <Stack spacing={2} direction="column" alignItems="center">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="large" 
                        component={Link}
                        to="/"
                    >
                        Continue Shopping
                    </Button>
                    <Button 
                        variant="text" 
                        color="secondary" 
                        onClick={() => navigate('/rewards/balance')}
                    >
                        View Your Eco-Points Balance
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
}