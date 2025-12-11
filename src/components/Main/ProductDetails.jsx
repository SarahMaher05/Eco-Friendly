import { AddShoppingCartOutlined, CheckCircleOutline, LocalFloristOutlined, NaturePeopleOutlined } from '@mui/icons-material'
import {Box, Typography, Stack, Button, useTheme, Chip, Rating } from '@mui/material'
import PublicIcon from '@mui/icons-material/Public';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import React from 'react'

// 🌿 شارات المنتج البيئي (قد تحتاجين لتحديثها بناءً على خصائص المنتج)
const ecoBadges = [
    { label: "Plastic-Free", icon: <CheckCircleOutline sx={{ color: "white !important" }} /> },
    { label: "Organic", icon: <LocalFloristOutlined sx={{ color: "white !important" }} /> },
    { label: "Vegan", icon: <NaturePeopleOutlined sx={{ color: "white !important" }} /> },
];

// المكون يستقبل props: product, onAddToCart, onClose
export default function ProductDetails({ product, onAddToCart, onClose }) {
    const theme = useTheme();

    // 🚨 تأكد من وجود المنتج قبل العرض (تمت إعادته)
    if (!product) {
        return <Box p={4}><Typography variant="h6">Loading product details...</Typography></Box>;
    }

    // 🌟 وظيفة الإضافة إلى السلة
    const handleAddToCart = () => {
        onAddToCart(product); // استدعاء دالة الإضافة إلى السلة من Context
        onClose(); // إغلاق النافذة بعد الإضافة
    };

    return (
        <Box sx={{
            p: 4, // إضافة padding للنافذة المنبثقة
            display: "flex", 
            alignItems: "flex-start", // محاذاة العناصر للأعلى
            gap: 3, // زيادة الفجوة قليلاً
            flexDirection: {xs: "column", sm: "row"}}}>

            {/* 1. قسم الصورة الرئيسية والمعرض الفرعي */}
            <Box sx={{display: "flex", flexDirection: 'column', alignItems: 'center'}}>
                <img 
                    width={400} 
                    src="src\images\OIP(5).jpeg" // يمكن تغيير هذا ليصبح product.image 
                    alt={product.title} 
                />
                
                {/* صور المعرض الفرعي */}
                {/* ملاحظة: يجب أن تكون مسارات هذه الصور ديناميكية من بيانات المنتج */}
                <Stack sx={{justifyContent: {xs: "center", sm: "left"}}} direction={"row"} gap={1} my={2}>
                    {["src/images/OIP(6).jpeg", "src/images/OIP(5).jpeg"].map((item) => {
                        return(
                            <img 
                                style={{ 
                                    borderRadius: 3, 
                                    border: `2px solid ${theme.palette.divider}`, 
                                    cursor: "pointer",
                                }} 
                                height={100} 
                                width={90} 
                                key={item}
                                src={item}
                                alt="" 
                            />        
                        )
                    }
                    )}
                </Stack>
            </Box>

            {/* 2. قسم التفاصيل ووظائف المتجر */}
            <Box sx={{textAlign: {xs: "center", sm: "left"}, flexGrow: 1}}>
                {/* اسم المنتج ديناميكيًا */}
                <Typography variant='h5' sx={{ color: theme.palette.text.primary, fontWeight: 700 }}>
                    {product.title} 
                </Typography>
                
                {/* السعر والتقييم */}
                <Stack direction={"row"} alignItems={"center"} spacing={2} sx={{justifyContent: {xs: "center", sm: "left"}}}>
                    <Typography my={0.4} fontSize={"22px"} color={theme.palette.secondary.main} variant='h5'>
                        ${product.price}
                    </Typography>
                    <Rating precision={0.5} value={product.rating} readOnly size="small" />
                </Stack>


                {/* 🌿 شارات الاستدامة (Eco Badges) */}
                {/* ملاحظة: يمكنك فلترة هذه الشارات بناءً على خصائص المنتج (مثل product.category) */}
                <Stack direction={"row"} gap={1} my={1} sx={{justifyContent: {xs: "center", sm: "left"}}}>
                    {ecoBadges.map((badge) => (
                        <Chip
                            key={badge.label}
                            label={badge.label}
                            icon={badge.icon}
                            sx={{ 
                                bgcolor: theme.palette.primary.main, 
                                color: "white",
                                fontWeight: 600,
                                '& .MuiChip-icon': {
                                    color: 'white !important', 
                                }
                            }}
                        />
                    ))}
                </Stack>

                {/* الوصف */}
                <Typography variant='body1' color='text.secondary'>
                    {product.desc}
                </Typography>
                
                {/* تفاصيل الخامة والاستيراد (التي طلبتيها) */}
                <Box sx={{ my: 3, p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, textAlign: 'left' }}>
                    <Typography variant='h6' fontWeight={600} mb={1}>
                        ♻️ Product Specifications
                    </Typography>
                    <Stack direction="column" spacing={1}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <PublicIcon color="action" fontSize="small" />
                            <Typography variant="body2">
                                **Source/Origin:** {product.origin || 'Ethically Sourced (Global)'}
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <LocalShippingIcon color="action" fontSize="small" />
                            <Typography variant="body2">
                                **Material:** {product.material || 'Organic Cotton, Bamboo'}
                            </Typography>
                        </Stack>
                        <Typography variant="body2" mt={1}>
                            **Sustainability Notes:** {product.notes || 'Plastic-free packaging, carbon-neutral shipping.'}
                        </Typography>
                    </Stack>
                </Box>
                
                {/* 🌿 زر الشراء (Add to Cart) */}
                <Button
                    onClick={handleAddToCart} // 🌟 استدعاء وظيفة الإضافة
                    sx={{
                        mb: {xs: 1, sm: 0 } ,
                        textTransform: "capitalize",
                        bgcolor: theme.palette.primary.main,
                        "&:hover": { bgcolor: theme.palette.primary.dark }
                    }}
                    variant='contained'
                >
                    <AddShoppingCartOutlined sx={{mr: 1}} fontSize='small'></AddShoppingCartOutlined>
                    Add to Cart
                </Button>

            </Box>
        
        </Box>
    )
}