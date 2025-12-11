import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, useTheme } from '@mui/material';

// 🌿 بيانات وهمية للعلامات التجارية (يمكنك استبدالها ببيانات حقيقية لاحقاً)
const dummyBrands = [
    { id: 1, name: "Eco-Wear Textiles", logo: '/images/brand-logo-1.png', category: "Apparel", description: "Specializing in organic fabrics and sustainable cotton" },
    { id: 2, name: "Terra Clean", logo: '/images/brand-logo-2.png', category: "Home Goods", description: "Household cleaning solutions free from harmful chemicals" },
    { id: 3, name: "Bamboo Life", logo: '/images/brand-logo-3.png', category: "Personal Care", description: "Personal care products made entirely from bamboo wood" },
    { id: 4, name: "Green Tech Gear", logo: '/images/brand-logo-4.png', category: "Accessories", description: "Electronic accessories made from recycled materials" },
];

// 🎨 مكون بطاقة العلامة التجارية الفردية
const BrandCard = ({ brand }) => {
    const theme = useTheme();
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 2 }}>
            
            {/* 🛑 تم إلغاء الـ padding لملء الحيز بالكامل */}
            <Box 
                sx={{ 
                    // ارتفاع مناسب ليظهر الكارد بشكل احترافي
                    height: 180, 
                    width: '100%', 
                    overflow: 'hidden', 
                    display: 'block', 
                    bgcolor: theme.palette.grey[50] 
                }}
            >
                <CardMedia
                    component="img"
                    image={brand.logo}
                    alt={`${brand.name} logo`}
                    // 🛑 ضمان ملء 100% من الحاوية الأم
                    sx={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' // لملء الحيز مع الاقتصاص إذا لزم الأمر
                    }}
                />
            </Box>

            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography gutterBottom variant="h5" component="div" fontWeight={600} color="#386358">
                    {brand.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                    {brand.category}
                </Typography>
                <Typography variant="body2" color="text.primary">
                    {brand.description}
                </Typography>
            </CardContent>
            
            
        </Card>
    );
};


// 📄 المكون الرئيسي للصفحة
export default function BrandsPage() {
    return (
       <Box sx={{ py: 8, bgcolor: (theme) => theme.palette.bg.main }}>
            <Container maxWidth="lg">
                
                {/* العنوان الرئيسي */}
                <Typography 
                    variant="h3" 
                    fontWeight={700} 
                    color="#386358" 
                    textAlign="center" 
                    mb={2}
                >
                    Discover all brands 
                </Typography>
                <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    textAlign="center" 
                    mb={6}
                >
                   We only work with the best brands that are committed to sustainability and social responsibility
                </Typography>
                
                {/* شبكة عرض العلامات التجارية */}
                <Grid container spacing={4}>
                    {dummyBrands.map(brand => (
                        <Grid item key={brand.id} xs={12} sm={6} md={4} lg={3}>
                            <BrandCard brand={brand} />
                        </Grid>
                    ))}
                </Grid>

               
            </Container>
        </Box>
    );
}