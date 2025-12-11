import { Box, Stack, Container, Typography, useTheme, Grid, Chip } from '@mui/material';
import React, { useState } from 'react'; // إزالة Dialog و IconButton من الاستيراد
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import Rating from '@mui/material/Rating';
// 🛑 إزالة CloseIcon و ProductDetails
// import CloseIcon from '@mui/icons-material/Close'; 
// import ProductDetails from '../components/Main/ProductDetails.jsx'; 
import { useCart } from '../context/CartContext.jsx'; // 🌟 استيراد الخطاف الجديد

// 💡 بيانات وهمية (Mock Data) للمنتجات المخفضة
const saleProducts = [
    { id: 101, title: "Bamboo Fiber Towel Set", category: "plastic-free", originalPrice: 35.00, salePrice: 24.50, discount: 30, rating: 4.5, desc: "Ultra-soft and quick-drying bamboo towels, now 30% off." },
    { id: 102, title: "Zero-Waste Lunch Box", category: "all", originalPrice: 25.00, salePrice: 15.00, discount: 40, rating: 4.8, desc: "Stainless steel lunch box with dividers. 40% discount for a limited time." },
    { id: 103, title: "Organic Cotton T-Shirt", category: "organic", originalPrice: 40.00, salePrice: 32.00, discount: 20, rating: 4.2, desc: "Ethically sourced organic cotton T-shirt." },
    { id: 104, title: "Recycled Glass Water Bottle", category: "plastic-free", originalPrice: 18.00, salePrice: 12.60, discount: 30, rating: 4.6, desc: "Durable and stylish bottle made from recycled glass." },
    { id: 105, title: "Aromatherapy Essential Oil Diffuser", category: "organic", originalPrice: 45.00, salePrice: 36.00, discount: 20, rating: 4.9, desc: "Natural wood diffuser for essential oils." },
    { id: 106, title: "Compostable Trash Bags (Large)", category: "all", originalPrice: 12.00, salePrice: 8.40, discount: 30, rating: 4.3, desc: "Strong, fully compostable trash bags." },
];


export default function SustainableSalesPage() {
    const [alignment, setAlignment] = useState('all'); 
    const theme = useTheme();
    
    // 🛑 إزالة حالة الـ Dialog: const [open, setOpen] = React.useState(false);

    const { addToCart } = useCart(); // 🌟 استخدام الخطاف

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    // 🛑 إزالة handleClickOpen و handleClose

    // 🌟 دالة الإضافة إلى السلة الجديدة
    const handleAddToCartClick = (product) => {
        addToCart(product);
        console.log(`Sale Product "${product.title}" added to cart!`);
    };

    // منطق الفلترة
    const filteredProducts = saleProducts.filter((item) => {
        if (alignment === 'all') {
            return true; 
        } else {
            return item.category === alignment; 
        }
    });

    return (
        <Box>
            {/* Fix: تعويض ارتفاع الهيدر الثابت */}
            <Box sx={{ pt: { xs: '100px', sm: '120px', md: '150px' }, mt: '-1px' }} /> 
            
            <Container sx={{py: 9 }}>
                
                {/* ... (العنوان وأزرار الفلترة) ... */}
                
                <Stack 
                    direction={"row"} 
                    flexWrap={"wrap"} 
                    justifyContent={"space-between"} 
                    gap={2} 
                >
                    <Grid container spacing={4} sx={{ mt: 2 }}>
                        {filteredProducts.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.id}>
                                <Card 
                                    elevation={4}
                                    sx={{ 
                                        height: '100%',
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        ":hover .MuiCardMedia-root": { rotate: "1deg" ,scale: "1.1", transition: "0.35s"},
                                    }}
                                >
                                    {/* ... (Card Media and Content) ... */}
                                    <Box sx={{ position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            alt={item.title}
                                            height="277"
                                            image="src\images\OIP(4).jpeg" 
                                        />
                                        <Chip 
                                            label={`${item.discount}% OFF`} 
                                            color="error" 
                                            sx={{ position: 'absolute', top: 10, left: 10, fontWeight: 'bold' }} 
                                        />
                                    </Box>

                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant='h6' component="div" sx={{ color: theme.palette.text.primary, fontWeight: 700 }}>
                                        {item.title}
                                        </Typography>

                                        <Typography variant='body2' color='text.secondary'>
                                            {item.desc}
                                        </Typography>
                                    </CardContent>
                                    
                                    <CardActions sx={{justifyContent: "space-between", px: 2, pb: 2}}>
                                        <Stack direction="column">
                                            <Typography variant='body2' sx={{ textDecoration: 'line-through', color: theme.palette.text.secondary }}>
                                                ${item.originalPrice.toFixed(2)}
                                            </Typography>
                                            <Typography variant='h5' component="p" sx={{ color: theme.palette.error.main, fontWeight: 700 }}>
                                                ${item.salePrice.toFixed(2)}
                                            </Typography>
                                        </Stack>
                                        
                                        <Button 
                                            // 🌟 تغيير الدالة من handleClickOpen إلى دالة الإضافة للسلة
                                            onClick={() => handleAddToCartClick(item)}
                                            sx={{
                                                textTransform: "capitalize",
                                                color: theme.palette.error.main, // استخدام لون التخفيض
                                                "&:hover": { backgroundColor: theme.palette.myColor.main } 
                                            }}
                                            size="large"
                                        >
                                            <AddShoppingCartOutlinedIcon sx={{mr: 1}} fontSize='small' />
                                            Add to Cart 
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>

                {/* 🛑 تم حذف مكون الـ Dialog بالكامل من هنا */}
            </Container>
        </Box>
    );
}