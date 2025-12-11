import React, { useState } from 'react'; // 💡 استيراد useState 
import { 
    Box, 
    Container, 
    Typography, 
    Button, 
    Stack, 
    Divider,
    IconButton,
    useTheme,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

// استيراد خطافات الـ Context
import { useCart } from '../context/CartContext.jsx'; 
import { useAuth } from '../context/AuthContext.jsx'; // 👈 التعديل 1: استيراد AuthContext

// استيراد المكون المنبثق
import LoginPromptModal from '../components/LoginPromptModal.jsx'; // 👈 التعديل 2: استيراد المودال


export default function ShoppingCartPage() { 
    const theme = useTheme();
    // جلب الدوال والمتغيرات من CartContext
    const { 
        cartItems, 
        removeFromCart, 
        increaseQuantity, 
        decreaseQuantity, 
        cartTotal,
        cartCount 
    } = useCart();

    // 💡 جلب حالة تسجيل الدخول من AuthContext
    const { isLoggedIn } = useAuth(); 

    // 💡 حالة للتحكم في ظهور النافذة المنبثقة
    const [isModalOpen, setIsModalOpen] = useState(false); 


    // دالة لمعالجة زيادة الكمية
    const handleIncrease = (id) => {
        increaseQuantity(id); 
    };

    // دالة لمعالجة نقص الكمية
    const handleDecrease = (id) => {
        decreaseQuantity(id);
    };

    // دالة لمعالجة الحذف
    const handleRemove = (id) => {
        removeFromCart(id);
    };

    // 🌟 دالة معالجة الضغط على زر الدفع (التحقق من تسجيل الدخول)
    const handleProceedToCheckout = () => {
        if (isLoggedIn) {
            // إذا كان المستخدم مسجلاً، ينتقل لصفحة الدفع الفعلية
            alert("Redirecting to Checkout..."); 
            // يمكن استخدام useNavigate هنا: navigate('/checkout'); 
        } else {
            // إذا لم يكن مسجلاً، نفتح النافذة المنبثقة
            setIsModalOpen(true);
        }
    };

    // إغلاق النافذة المنبثقة
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    // ----------------------------------------------------
    // عرض رسالة السلة الفارغة
    // ----------------------------------------------------

    if (cartItems.length === 0) {
        return (
            <Container sx={{ pt: 15, pb: 10, textAlign: 'center' }}>
                <ShoppingBasketIcon sx={{ fontSize: 80, color: theme.palette.text.secondary }} />
                <Typography variant="h4" sx={{ mt: 3, mb: 1 }}>
                    Your Basket is Empty
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={4}>
                    Looks like you haven't added anything to your cart yet.
                </Typography>
                <Button variant="contained" color="primary" href="/shop/all">
                    Start Shopping
                </Button>
            </Container>
        );
    }

    // ----------------------------------------------------
    // عرض السلة المليئة
    // ----------------------------------------------------

    return (
        <Container sx={{ pt: 15, pb: 10 }}>
            <Typography variant="h3" fontWeight={700} mb={4} color="primary.dark">
                Your Shopping Basket ({cartCount})
            </Typography>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="flex-start">
                
                {/* 📝 1. جدول المنتجات (الجانب الأيسر - 70%) */}
                <Box sx={{ flex: 3, width: { xs: '100%', md: '70%' } }}>
                    <TableContainer component={Paper} elevation={3}>
                        <Table aria-label="shopping cart table">
                            <TableHead>
                                <TableRow sx={{ bgcolor: theme.palette.grey[100] }}>
                                    <TableCell>Product</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="right">Subtotal</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems.map((item) => (
                                    <TableRow key={item.id} hover>
                                        
                                        {/* عمود المنتج */}
                                        <TableCell component="th" scope="row">
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <img 
                                                    src={item.imageUrl} 
                                                    alt={item.title} 
                                                    style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: '4px' }}
                                                />
                                                <Box>
                                                    <Typography variant="body1" fontWeight={600}>
                                                        {item.title}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        ID: {item.id}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </TableCell>

                                        {/* عمود السعر */}
                                        <TableCell align="center">${item.price.toFixed(2)}</TableCell>

                                        {/* عمود الكمية (مع الأزرار) */}
                                        <TableCell align="center">
                                            <Stack direction="row" alignItems="center" justifyContent="center">
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => handleDecrease(item.id)}
                                                >
                                                    <RemoveIcon fontSize="inherit" />
                                                </IconButton>
                                                <TextField
                                                    size="small"
                                                    value={item.quantity}
                                                    sx={{ width: 45, mx: 0.5, '& input': { textAlign: 'center', p: 0.5 } }}
                                                    inputProps={{ readOnly: true }}
                                                />
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => handleIncrease(item.id)}
                                                >
                                                    <AddIcon fontSize="inherit" />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>

                                        {/* عمود المجموع الفرعي */}
                                        <TableCell align="right">
                                            <Typography fontWeight={600}>
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </Typography>
                                        </TableCell>

                                        {/* عمود الحذف */}
                                        <TableCell align="center">
                                            <IconButton 
                                                color="error" 
                                                onClick={() => handleRemove(item.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                {/* 💳 2. ملخص السلة والدفع (الجانب الأيمن - 30%) */}
                <Box sx={{ flex: 1, width: { xs: '100%', md: '30%' } }}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h5" fontWeight={700} mb={3}>
                            Order Summary
                        </Typography>

                        <Stack spacing={1.5} mb={3}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography>Subtotal ({cartCount} items)</Typography>
                                <Typography fontWeight={600}>${cartTotal.toFixed(2)}</Typography>
                            </Stack>
                            
                            <Stack direction="row" justifyContent="space-between">
                                <Typography>Shipping</Typography>
                                <Typography fontWeight={600} color="success.main">FREE</Typography>
                            </Stack>
                            
                            <Divider sx={{ my: 1 }} />

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="h6" fontWeight={700}>Total</Typography>
                                {/* المجموع النهائي */}
                                <Typography variant="h6" fontWeight={700} color="primary.dark">
                                    ${cartTotal.toFixed(2)} 
                                </Typography>
                            </Stack>
                        </Stack>
                        
                        <Button 
                            variant="contained" 
                            color="primary" 
                            fullWidth 
                            size="large"
                            onClick={handleProceedToCheckout} // 👈 التعديل 3: استدعاء دالة التحقق
                        >
                            Proceed to Checkout
                        </Button>
                    </Paper>
                </Box>

            </Stack>
            
            {/* 💡 التعديل 4: إضافة المكون المنبثق */}
            <LoginPromptModal 
                open={isModalOpen} 
                handleClose={handleCloseModal} 
            />
            
        </Container>
    );
}