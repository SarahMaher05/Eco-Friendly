import { Box, Typography, Container, useTheme, Stack } from '@mui/material'; 
// 💡 تم استبدال Grid بـ Stack
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LensOutlinedIcon from '@mui/icons-material/LensOutlined'; // تم استبدال GrainOutlinedIcon بهذا
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined'; 
import React from 'react';

// 🌿 بيانات الأعمدة
const impactData = [
    { icon: CheckCircleOutlineIcon, title: "Time Well-Spent", description: "Everything on our site is vetted through our 5-Pillar Sourcing Methodology, and our Community Experience team is always here to help through chat, call, or email." },
    { icon: LocalShippingOutlinedIcon, title: "Free Shipping for $75+", description: "We want sustainability to be more accessible. That's why every order over $75 ships free, and all orders always ship carbon-neutral." },
    { icon: LensOutlinedIcon, title: "Best-In-Class Brands", description: "We've built a community of truly earth-conscious brands, dedicated to offering sustainable, quality products without compromises to our planet." },
    { icon: SpaOutlinedIcon, title: "Furthering Your Impact", description: "Every order you make directly benefits our communities and environment through our Certified B Corp and 1% for the Planet membership." },
];

const ImpactSection = () => {
    const theme = useTheme();

    return (
        <Box 
            sx={{ 
                py: 8, 
                bgcolor: theme.palette.mode === 'light' ? '#F9F8F5' : theme.palette.myColor.main 
            }}
        >
            <Container maxWidth="lg">
                
                {/* 💡 استخدمنا Stack بدلاً من Grid: نرتب العناصر في صف أفقي (row) */}
                <Stack 
                    // الترتيب: عمودي على الشاشات الصغيرة، أفقي على الشاشات المتوسطة والكبيرة
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={4} 
                    alignItems="flex-start" 
                    justifyContent="space-between" 
                    flexWrap="wrap" // للسماح للعناصر بالنزول لصف جديد إذا ضاقت الشاشة جداً
                >
                    {impactData.map((item, index) => (
                        <Box 
                            key={index}
                            sx={{
                                // تحديد العرض لضمان 4 عناصر في صف واحد على الشاشات الكبيرة (md)
                                width: { xs: '100%', sm: '48%', md: '22%' }, 
                                textAlign: 'center', 
                                p: 2,
                            }}
                        >
                            
                            {/* الأيقونة */}
                            <item.icon sx={{ fontSize: 48, color: '#6C9F94', mb: 2 }} />
                            
                            {/* العنوان */}
                            <Typography variant="h6" fontWeight={600} mb={1} color={theme.palette.text.primary}>
                                {item.title}
                            </Typography>
                            
                            {/* الوصف */}
                            <Typography variant="body2" color={theme.palette.text.secondary} sx={{ lineHeight: 1.6 }}>
                                {item.description}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
};

export default ImpactSection;