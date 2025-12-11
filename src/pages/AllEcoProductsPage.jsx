import { Box, Stack, Container, Typography, useTheme, IconButton } from '@mui/material';
import React, { useState } from 'react'; 
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import Rating from '@mui/material/Rating';
// 🛑 استيراد مكونات الـ Modal/Dialog
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';

// استيراد خطاف السلة
import { useCart } from '../context/CartContext.jsx'; 

// 💡 مصدر بيانات المنتجات (تم إضافة معلومات تفصيلية إضافية: origin, material, notes)
const products = [
    { id: 1, title: "Eco-Friendly Bag", category: "all", price: 10.99, rating: 4.5, desc: "Durable, reusable bag made from organic cotton. Perfect for your sustainable shopping.", origin: 'Bangladesh', material: 'Organic Jute', notes: 'Washable, reusable, and biodegradable. Supports fair-trade practices.', imageUrl: "/images/Eco-FriendlyBag.jpg" },
    { id: 2, title: "Natural Organic Soap", category: "organic", price: 15.99, rating: 5.0, desc: "100% natural and vegan soap bar. Gentle on skin and planet.", origin: 'Local Farm (Egypt)', material: 'Olive Oil Base, Essential Oils', notes: 'Cruelty-free, plastic-free packaging, suitable for sensitive skin.', imageUrl: "/images/organic-soap.jpeg" },
    { id: 3, title: "Bamboo Toothbrush Set", category: "plastic-free", price: 8.50, rating: 4.0, desc: "A great alternative to plastic. Sustainable and biodegradable.", origin: 'China', material: 'Moso Bamboo', notes: 'BPA-free bristles, recommended by dentists for gentle cleaning.', imageUrl: "/images/bamboo-brush.jpeg" },
    { id: 4, title: "Organic Tea Blend", category: "organic", price: 12.00, rating: 4.8, desc: "Hand-picked organic tea leaves from local farms.", origin: 'India', material: 'Assam Tea, Cardamom', notes: 'Compostable tea bags, high in antioxidants, certified organic.', imageUrl: "/images/organic-tea.jpeg" },
    { id: 5, title: "Solid Shampoo Bar", category: "plastic-free", price: 14.00, rating: 4.2, desc: "Zero-waste alternative to liquid shampoo. No plastic bottle needed.", origin: 'Germany', material: 'Natural Oils, Coconut Extracts', notes: 'Concentrated formula, travel friendly, lasts up to 80 washes.', imageUrl: "/images/shampoo-bar.jpeg" },
    { id: 6, title: "Compostable Sponges (3-Pack)", category: "all", price: 7.99, rating: 4.7, desc: "Highly absorbent, fully compostable kitchen sponges.", origin: 'USA', material: 'Plant Cellulose', notes: 'Long-lasting and highly absorbent, replaces 15 rolls of paper towels.', imageUrl: "/images/compostable-sponges.jpeg" },
    { id: 7, title: "Refillable Cleaning Spray", category: "organic", price: 18.00, rating: 4.9, desc: "Reusable bottle with a concentrate for non-toxic cleaning.", origin: 'UK', material: 'Non-Toxic Plant Extracts, Lavender Scent', notes: 'Refill pouches available, streak-free formula, safe for children and pets.', imageUrl: "/images/cleaning-spray.jpeg" },
    { id: 8, title: "Recycled Notebook", category: "plastic-free", price: 9.50, rating: 4.3, desc: "High-quality paper made from 100% post-consumer waste.", origin: 'Egypt', material: '100% Recycled Paper', notes: 'Soy-based ink, spiral bound with recycled metal, 150 pages.', imageUrl: "/images/recycled-notebook.jpeg" },
    { id: 9, title: "Stainless Steel Straws (4)", category: "all", price: 6.99, rating: 4.6, desc: "A durable set of reusable metal straws for drinks.", origin: 'Vietnam', material: 'Food-Grade Stainless Steel', notes: 'Includes cleaning brush, perfect for travel and cold beverages.', imageUrl: "/images/metal-straws.jpeg" },
];


// 🛑 استقبال خاصية البحث (searchTerm) الممررة من App.jsx
export default function AllEcoProductsPage({ searchTerm }) { 
    const [alignment, setAlignment] = useState('all'); 
    const theme = useTheme();
    
    // 🛑 الحالة الجديدة للبوب أب
    const [selectedProduct, setSelectedProduct] = useState(null);

    // جلب دالة الإضافة إلى السلة
    const { addToCart } = useCart(); 

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    // دالة الإضافة إلى السلة (تستخدم addToCart من Context)
    const handleAddToCartClick = (product) => {
        addToCart(product);
        console.log(`Product "${product.title}" added to cart!`);
    };
    
    // 🛑 دالة فتح البوب أب
    const handleViewDetailsClick = (product) => {
        setSelectedProduct(product);
    };

    // 🛑 دالة إغلاق البوب أب
    const handleCloseDetails = () => {
        setSelectedProduct(null);
    };
    
    // منطق الفلترة المزدوجة (حسب الفئة وكلمة البحث)
    const filteredProducts = products.filter((item) => {
        // 1. فلترة حسب الفئة (Category Filter)
        const categoryMatch = alignment === 'all' || item.category === alignment;

        // 2. فلترة حسب نص البحث (Search Term Filter)
        const searchLower = (searchTerm || '').toLowerCase().trim();

        // إذا كان حقل البحث فارغاً، نعتبره متطابقاً، وإلا يتم البحث في العنوان والوصف
        const searchMatch = !searchLower || 
            item.title.toLowerCase().includes(searchLower) ||
            item.desc.toLowerCase().includes(searchLower);

        // يجب أن يتطابق كلا الشرطين
        return categoryMatch && searchMatch; 
    });


    return (
        <Box>
            <Box sx={{ pt: { xs: '100px', sm: '120px', md: '150px' }, mt: '-1px' }} /> 
            
            <Container sx={{py: 9 }}>
                
                {/* جزء الفلترة والتوغل (Toggle) */}
                <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="center" mb={4}>
                    <Typography variant="h4" fontWeight={700} color="text.primary">
                        Shop All Sustainable Products
                    </Typography>
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="product category filter"
                        sx={{ mt: { xs: 2, md: 0 } }}
                    >
                        <ToggleButton value="all" sx={{ textTransform: 'none' }}>All</ToggleButton>
                        <ToggleButton value="organic" sx={{ textTransform: 'none' }}>Organic</ToggleButton>
                        <ToggleButton value="plastic-free" sx={{ textTransform: 'none' }}>Plastic-Free</ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
                
                {/* 🛑 رسالة لا توجد نتائج */}
                {filteredProducts.length === 0 && (
                    <Typography 
                        variant="h6" 
                        color="text.secondary" 
                        textAlign="center" 
                        mt={4} 
                        sx={{ border: `1px solid ${theme.palette.divider}`, p: 2, borderRadius: 1 }}
                    >
                        No products found matching "{searchTerm}" in the selected category.
                    </Typography>
                )}

                {/* عرض الكروت */}
                <Stack 
                    direction={"row"} 
                    flexWrap={"wrap"} 
                    justifyContent={"space-between"} 
                    gap={2} 
                >
                    {filteredProducts.map((item) => {
                        return(
                
                            <Card 
                                key={item.id} 
                                sx={{ 
                                    width: { xs: "100%", sm: "48%", md: "32%" }, 
                                    mt: 6, 
                                    ":hover .MuiCardMedia-root": { rotate: "1deg" ,scale: "1.1", transition: "0.35s"},
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    alt={item.title}
                                    height="277"
                                    // استخدام item.imageUrl
                                    image={item.imageUrl} 
                                />
                                
                                <CardContent>
                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} mb={1}>
                                        <Typography variant="h6" fontWeight={500} color="text.primary">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="h6" fontWeight={700} color="primary.dark">
                                            ${item.price.toFixed(2)}
                                        </Typography>
                                    </Stack>

                                    <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1 }}>
                                        {item.desc}
                                    </Typography>

                                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Rating name="read-only" value={item.rating} readOnly precision={0.5} size="small" />
                                        <Typography variant="caption" color="text.disabled">
                                            Category: {item.category.toUpperCase()}
                                        </Typography>
                                    </Stack>
                                </CardContent>


                                <CardActions sx={{justifyContent: "space-between"}}>
                                    <Button 
                                        // استخدام الدالة التي تستدعي addToCart
                                        onClick={() => handleAddToCartClick(item)}
                                        sx={{
                                            textTransform: "capitalize",
                                            color: theme.palette.primary.main, 
                                            "&:hover": { backgroundColor: theme.palette.myColor.main } 
                                        }}
                                        size="large"
                                    >
                                        <AddShoppingCartOutlinedIcon sx={{mr: 1}} fontSize='small' />
                                        Add to Cart 
                                    </Button>
                                    {/* 🛑 التعديل: استدعاء دالة فتح البوب أب وتمرير المنتج الحالي */}
                                    <Button 
                                        onClick={() => handleViewDetailsClick(item)}
                                        size="large" 
                                        sx={{ textTransform: "capitalize" }}
                                    >
                                        View Details
                                    </Button>
                                </CardActions>
                            </Card>
                        )
                    }
                    )}
                </Stack>

            </Container>
            
            {/* 🛑 مكون البوب أب/الديالوغ (Modal/Dialog Component) */}
            {selectedProduct && (
                <Dialog 
                    open={Boolean(selectedProduct)} 
                    onClose={handleCloseDetails}
                    maxWidth="sm"
                    fullWidth
                    sx={{ '& .MuiDialog-paper': { borderRadius: '12px' } }}
                >
                    {/* 1. رأس البطاقة المنبثقة */}
                    <DialogTitle sx={{ 
                        m: 0, 
                        p: 2, 
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.contrastText,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        {selectedProduct.title} - Full Details
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseDetails}
                            sx={{
                                color: theme.palette.primary.contrastText,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    
                    {/* 2. محتوى البطاقة المنبثقة */}
                    <DialogContent dividers sx={{ p: 3 }}>
                        
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                            {/* صورة المنتج */}
                            <Box sx={{ minWidth: { sm: 150 }, mb: { xs: 2, sm: 0 } }}>
                                <img 
                                    src={selectedProduct.imageUrl} 
                                    alt={selectedProduct.title} 
                                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }} 
                                />
                            </Box>

                            {/* تفاصيل المنتج الإضافية */}
                            <Box>
                                <Typography variant="body1" color="text.secondary" gutterBottom>
                                    {selectedProduct.desc}
                                </Typography>

                                <Stack spacing={1} mt={2}>
                                    <Typography variant="body1" fontWeight={700} color="text.primary">
                                        ⭐ Rating: <Rating name="read-only" value={selectedProduct.rating} readOnly precision={0.5} size="small" /> ({selectedProduct.rating})
                                    </Typography>
                                    <Typography variant="body1" fontWeight={700}>
                                        🌍 Origin: <span style={{ fontWeight: 400 }}>{selectedProduct.origin}</span>
                                    </Typography>
                                    <Typography variant="body1" fontWeight={700}>
                                        🔬 Material: <span style={{ fontWeight: 400 }}>{selectedProduct.material}</span>
                                    </Typography>
                                    <Typography variant="body1" fontWeight={700} color="primary.main">
                                        💡 Extra Notes: <span style={{ fontWeight: 400, color: theme.palette.text.secondary }}>{selectedProduct.notes}</span>
                                    </Typography>
                                </Stack>

                                <Button 
                                    onClick={() => { handleAddToCartClick(selectedProduct); handleCloseDetails(); }}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddShoppingCartOutlinedIcon />}
                                    sx={{ mt: 3, textTransform: 'capitalize' }}
                                >
                                    Add to Cart - ${selectedProduct.price.toFixed(2)}
                                </Button>
                            </Box>
                        </Stack>
                    </DialogContent>
                </Dialog>
            )}

        </Box>
    );
}