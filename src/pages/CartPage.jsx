import React from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Button, 
    Stack, 
    useTheme, 
    IconButton, 
    Paper, 
    Divider 
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext.jsx'; 

export default function CartPage() {
    const theme = useTheme();
    
    // 🌟 استخراج كل الدوال والمتغيرات اللازمة
    const { 
        cartItems, 
        removeItemFromCart, 
        updateItemQuantity, 
        getTotalPrice, 
        clearCart 
    } = useCart(); 

    // 💡 لحساب المجموع الفرعي (سعر الوحدة * الكمية)
    const calculateSubtotal = (item) => {
        // تأكدي من التعامل مع originalPrice أو salePrice إذا كنت تستخدمينه
        const price = item.salePrice ? item.salePrice : item.price;
        return (price * item.quantity).toFixed(2);
    };

    const total = getTotalPrice().toFixed(2); // استخدام دالة getTotalPrice

    if (cartItems.length === 0) {
        return (
            <Box sx={{ pt: { xs: '100px', sm: '120px', md: '150px' } }}>
                <Container sx={{ py: 15, textAlign: 'center', minHeight: '60vh' }}>
                    <ShoppingCartOutlinedIcon sx={{ fontSize: 80, color: theme.palette.text.secondary, mb: 2 }} />
                    <Typography variant="h4" sx={{ color: theme.palette.text.primary, mb: 1 }}>
                        Your Shopping Cart is Empty
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={4}>
                        Start adding your sustainable essentials!
                    </Typography>
                    <Button variant="contained" color="primary" href="/">
                        Return to Shop
                    </Button>
                </Container>
            </Box>
        );
    }

    return (
        <Box>
            {/* تعويض ارتفاع الهيدر الثابت */}
            <Box sx={{ pt: { xs: '100px', sm: '120px', md: '150px' }, mt: '-1px' }} /> 
            
            <Container sx={{ py: 9 }}>
                <Typography variant="h4" sx={{ color: theme.palette.text.primary, fontWeight: 700, mb: 4 }}>
                    <ShoppingCartOutlinedIcon fontSize='large' sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Your Shopping Cart ({cartItems.length} Unique Items)
                </Typography>
                
                <Stack 
                    direction={{ xs: 'column', md: 'row' }} 
                    spacing={4}
                >
                    {/* عمود المنتجات المفصل */}
                    <Box sx={{ flexGrow: 1 }}>
                        {cartItems.map((item) => (
                            <Paper key={item.id} elevation={2} sx={{ mb: 3, p: 2 }}>
                                <Stack 
                                    direction={{ xs: 'column', sm: 'row' }} 
                                    spacing={2} 
                                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                                >
                                    {/* 1. الصورة والاسم */}
                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
                                        <Box 
                                            component="img"
                                            src="src\images\OIP(4).jpeg" // استخدمي الصورة المناسبة أو الوهمية
                                            alt={item.title}
                                            sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
                                        />
                                        <Box>
                                            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                                                {item.title}
                                            </Typography>
                                            {/* عرض السعر الأصلي أو سعر التخفيض */}
                                            {item.originalPrice && item.salePrice ? (
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography variant="body2" sx={{ textDecoration: 'line-through', color: theme.palette.text.secondary }}>
                                                        ${item.originalPrice.toFixed(2)}
                                                    </Typography>
                                                    <Typography variant="body1" color="error" fontWeight={700}>
                                                        ${item.salePrice.toFixed(2)}
                                                    </Typography>
                                                </Stack>
                                            ) : (
                                                <Typography variant="body1" color="primary" fontWeight={700}>
                                                    ${item.price.toFixed(2)}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Stack>

                                    {/* 2. التحكم بالكمية */}
                                    <Stack 
                                        direction="row" 
                                        alignItems="center" 
                                        spacing={1} 
                                        sx={{ 
                                            border: `1px solid ${theme.palette.divider}`, 
                                            borderRadius: 1, 
                                            width: { xs: '100%', sm: 'auto' } 
                                        }}
                                    >
                                        <IconButton 
                                            size="small" 
                                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                        <Typography sx={{ minWidth: 20, textAlign: 'center' }}>
                                            {item.quantity}
                                        </Typography>
                                        <IconButton 
                                            size="small" 
                                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                        >
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </Stack>

                                    {/* 3. المجموع الفرعي والحذف */}
                                    <Stack 
                                        direction="row" 
                                        alignItems="center" 
                                        justifyContent="space-between"
                                        sx={{ width: { xs: '100%', sm: 150 } }}
                                    >
                                        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                                            ${calculateSubtotal(item)}
                                        </Typography>
                                        <IconButton 
                                            color="error" 
                                            onClick={() => removeItemFromCart(item.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            </Paper>
                        ))}
                        
                        <Button 
                            color="error" 
                            onClick={clearCart} 
                            startIcon={<DeleteIcon />}
                            sx={{ mt: 2 }}
                        >
                            Clear All Items
                        </Button>
                    </Box>

                    {/* عمود ملخص الطلب (Order Summary) */}
                    <Box sx={{ width: { xs: '100%', md: 350 } }}>
                        <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: '150px' }}> {/* ثابتة في العرض الكبير */}
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                                Order Summary
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            
                            <Stack direction="row" justifyContent="space-between" mb={1}>
                                <Typography variant="body1">Subtotal:</Typography>
                                <Typography variant="body1">${total}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" mb={2}>
                                <Typography variant="body1">Shipping:</Typography>
                                <Typography variant="body1" color="success.main">FREE</Typography>
                            </Stack>
                            
                            <Divider sx={{ mb: 2 }} />

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="h6" fontWeight={700}>Total:</Typography>
                                <Typography variant="h6" fontWeight={700} color="primary">
                                    ${total}
                                </Typography>
                            </Stack>

                            <Button 
                                variant="contained" 
                                color="primary" 
                                fullWidth 
                                sx={{ mt: 3, py: 1.5 }}
                            >
                                Proceed to Checkout
                            </Button>
                        </Paper>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}