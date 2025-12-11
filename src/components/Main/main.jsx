import { Box, Stack, Container, Typography, useTheme } from '@mui/material';
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
import { useCart } from '../../context/CartContext.jsx'; 


// 💡 مصدر بيانات المنتجات المعدل (تم إضافة خاصية imageUrl)
const products = [
    { 
        id: 1, 
        title: "Eco-Friendly Bag", 
        category: "all", 
        price: 10.99, 
        rating: 4.5, 
        desc: "Durable, reusable bag made from organic cotton. Perfect for your sustainable shopping.",
        // 🛑 المسار المطلق لملف Eco-Friendly Bag.jpg (مفترض وجوده في public/images)
        imageUrl: "/images/Eco-FriendlyBag.jpg"
    },
    { 
        id: 2, 
        title: "Natural Organic Soap", 
        category: "organic", 
        price: 15.99, 
        rating: 5.0, 
        desc: "100% natural and vegan soap bar. Gentle on skin and planet.",
        // 🛑 استخدم اسم ملف الصورة الخاص بالمنتج الثاني (نفترض مسار مشابه للملفات التي تعمل لديك)
        imageUrl: "/images/organic-soap.jpeg" 
    },
    { 
        id: 3, 
        title: "Bamboo Toothbrush Set", 
        category: "plastic-free", 
        price: 8.50, 
        rating: 4.0, 
        desc: "A great alternative to plastic. Sustainable and biodegradable.",
        imageUrl: "/images/bamboo-brush.jpeg" 
    },
    { 
        id: 4, 
        title: "Organic Tea Blend", 
        category: "organic", 
        price: 12.00, 
        rating: 4.8, 
        desc: "Hand-picked organic tea leaves from local farms.",
        imageUrl: "/images/organic-tea.jpeg" 
    },
    { 
        id: 5, 
        title: "Solid Shampoo Bar", 
        category: "plastic-free", 
        price: 14.00, 
        rating: 4.2, 
        desc: "Zero-waste alternative to liquid shampoo. No plastic bottle needed.",
        imageUrl: "/images/shampoo-bar.jpeg" 
    },
    { 
        id: 6, 
        title: "Compostable Sponges (3-Pack)", 
        category: "all", 
        price: 7.99, 
        rating: 4.7, 
        desc: "Highly absorbent, fully compostable kitchen sponges.",
        imageUrl: "/images/compostable-sponges.jpeg" 
    },
    { 
        id: 7, 
        title: "Refillable Cleaning Spray", 
        category: "organic", 
        price: 18.00, 
        rating: 4.9, 
        desc: "Reusable bottle with a concentrate for non-toxic cleaning.",
        imageUrl: "/images/cleaning-spray.jpeg" 
    },
    { 
        id: 8, 
        title: "Recycled Notebook", 
        category: "plastic-free", 
        price: 9.50, 
        rating: 4.3, 
        desc: "High-quality paper made from 100% post-consumer waste.",
        imageUrl: "/images/recycled-notebook.jpeg" 
    },
    { 
        id: 9, 
        title: "Stainless Steel Straws (4)", 
        category: "all", 
        price: 6.99, 
        rating: 4.6, 
        desc: "A durable set of reusable metal straws for drinks.",
        imageUrl: "/images/metal-straws.jpeg" 
    },
    // ملاحظة: إذا كان المسار /images/OIP(4).jpeg هو الصورة الوحيدة التي تعمل لديك في الكود الأصلي، 
    // فهذا يعني أنك تحتاج إلى التأكد من أسماء الملفات في مجلد public/images/
];


export default function Main() {
    const [alignment, setAlignment] = useState('all');
    const { addToCart } = useCart();
    const theme = useTheme()

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };
    
    const handleAddToCartClick = (product) => {
        addToCart(product);
        console.log(`Featured Product "${product.title}" added to cart!`);
    };

    const filteredProducts = products.filter((item) => {
        if (alignment === 'all') {
            return true; 
        } else {
            return item.category === alignment; 
        }
    });


    return (
        <Container sx={{py: 9 }}>
            
            {/* جزء الفلترة والتوغل (Toggle) */}
            <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" fontWeight={700} color="text.primary">
                    Featured Products
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
                                    // 💡 استخدام المسار الديناميكي من item.imageUrl
                                    image={item.imageUrl} 
                                />

                                <CardContent>
                                    <Stack
                                        direction={"row"}
                                        justifyContent={"space-between"}
                                        alignItems={"center"}
                                    >
                                        <Typography gutterBottom variant='h6' component="div" sx={{ color: theme.palette.text.primary, fontWeight: 700 }}>
                                        {item.title}
                                        </Typography>

                                        <Typography variant='subtitle1' component="p" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
                                        ${item.price}
                                        </Typography>
                                    </Stack>

                                    <Typography variant='body2' color='text.secondary'>
                                        {item.desc}
                                    </Typography>
                                
                                </CardContent>
                                
                                <CardActions sx={{justifyContent: "space-between"}}>
                                    <Button 
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
                                    <Rating  
                                        precision={0.5} 
                                        name="read-only" 
                                        value={item.rating} 
                                        readOnly 
                                        sx={{ color: theme.palette.secondary.main }} 
                                    />
                                </CardActions>
                            </Card>
                    )
                    }
                )}
            </Stack>
        </Container>
    );
}