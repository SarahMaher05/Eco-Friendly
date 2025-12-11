import React from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Paper, 
    Grid, 
    Button, 
    Stack, 
    Divider,
    TextField,
    FormControlLabel,
    Checkbox,
    useTheme
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom'; // 👈 التعديل 1: استيراد خطاف التوجيه

// استيراد Contexts
import { useCart } from '../context/CartContext.jsx'; 
import { useAuth } from '../context/AuthContext.jsx'; 

// استيراد مكون الحماية
import ProtectedRoute from '../components/Auth/ProtectedRoute.jsx'; 


function CheckoutContent() {
    const theme = useTheme();
    const navigate = useNavigate(); // 👈 التعديل 2: تفعيل خطاف التوجيه
    
    // جلب بيانات المستخدم الحالي من AuthContext
    const { currentUser } = useAuth();
    // جلب بيانات السلة من CartContext
    const { cartItems, cartTotal } = useCart();
    
    // محاكاة لبعض الرسوم (يمكن أن تتغير)
    const shippingCost = 0.00; 
    const taxRate = 0.05; // 5% ضريبة
    
    const taxAmount = cartTotal * taxRate;
    const finalTotal = cartTotal + shippingCost + taxAmount;
    
    // دالة معالجة الدفع
    const handlePlaceOrder = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty. Cannot place an order.");
            return;
        }
        
        // 🚀 التعديل 3: التوجيه لصفحة تأكيد الطلب
        navigate('/order-confirmation'); 
        
        // ملاحظة: إفراغ السلة يتم الآن داخل OrderConfirmationPage في useEffect
    };

    return (
        <Container sx={{ pt: 15, pb: 10 }}>
            <Typography variant="h3" fontWeight={700} mb={4} color="primary.dark">
                Secure Checkout
            </Typography>

            <Grid container spacing={4}>
                {/* 📝 1. عمود تفاصيل الشحن والدفع (اليسار) */}
                <Grid item xs={12} md={7}>
                    <Stack spacing={4}>
                        
                        {/* 🚚 قسم معلومات الشحن */}
                        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                            <Typography variant="h5" fontWeight={600} mb={3} color="primary.dark">
                                1. Shipping Information
                            </Typography>
                            
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Full Name" fullWidth required defaultValue={currentUser?.fullName || ''} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Email" fullWidth required defaultValue={currentUser?.email || ''} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Address Line 1" fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Address Line 2 (Optional)" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField label="City" fullWidth required />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField label="State/Province" fullWidth required />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField label="Zip/Postal Code" fullWidth required />
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* 💳 قسم معلومات الدفع */}
                        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                            <Typography variant="h5" fontWeight={600} mb={3} color="primary.dark">
                                2. Payment Method
                            </Typography>

                            <TextField label="Card Number" fullWidth required sx={{ mb: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Expiration Date (MM/YY)" fullWidth required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="CVV" fullWidth required />
                                </Grid>
                            </Grid>
                            <FormControlLabel
                                control={<Checkbox defaultChecked color="primary" />}
                                label="Save payment information for next time"
                                sx={{ mt: 1 }}
                            />
                        </Paper>
                        
                        {/* 📜 قسم المراجعة والموافقة */}
                        <Box mt={2}>
                            <FormControlLabel
                                control={<Checkbox required color="primary" />}
                                label="I agree to the Terms and Conditions"
                            />
                        </Box>

                    </Stack>
                </Grid>

                {/* 📋 2. عمود ملخص الطلب (اليمين) */}
                <Grid item xs={12} md={5}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, position: 'sticky', top: 100 }}>
                        <Typography variant="h5" fontWeight={700} mb={3}>
                            Order Summary
                        </Typography>
                        
                        {/* قائمة المنتجات المختصرة */}
                        <Stack spacing={1} mb={3} maxHeight={300} overflow="auto">
                            {cartItems.map((item) => (
                                <Stack key={item.id} direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography variant="body2" sx={{ maxWidth: '70%' }}>
                                        {item.title} (x{item.quantity})
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </Typography>
                                </Stack>
                            ))}
                            <Divider sx={{ my: 1 }} />
                        </Stack>
                        
                        {/* تفاصيل الأسعار */}
                        <Stack spacing={1.5} mb={3}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography>Subtotal</Typography>
                                <Typography fontWeight={600}>${cartTotal.toFixed(2)}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography>Shipping</Typography>
                                <Typography fontWeight={600} color="success.main">
                                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                                </Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography>Tax ({taxRate * 100}%)</Typography>
                                <Typography fontWeight={600}>${taxAmount.toFixed(2)}</Typography>
                            </Stack>
                            
                            <Divider sx={{ my: 1 }} />

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="h5" fontWeight={700}>Total Payable</Typography>
                                <Typography variant="h5" fontWeight={700} color="primary.dark">
                                    ${finalTotal.toFixed(2)}
                                </Typography>
                            </Stack>
                        </Stack>
                        
                        <Button 
                            variant="contained" 
                            color="primary" 
                            fullWidth 
                            size="large"
                            onClick={handlePlaceOrder}
                            startIcon={<CheckCircleOutlineIcon />}
                            disabled={cartItems.length === 0}
                        >
                            Place Order
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

// 👈 التعديل الرئيسي: استخدام ProtectedRoute لحماية المحتوى
export default function CheckoutPage() {
    return (
        <ProtectedRoute>
            <CheckoutContent />
        </ProtectedRoute> 
    );
}