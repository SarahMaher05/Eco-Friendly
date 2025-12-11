// تم إضافة Stack إلى الاستيرادات
import { Box, Button, Typography, Container, Grid, Link as MuiLink, useTheme, Stack } from '@mui/material';
import React from 'react';
// 💡 استيراد Link من react-router-dom
import { Link } from 'react-router-dom';
// 💡 استيراد أيقونات التواصل الاجتماعي
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
    const theme = useTheme();

    // 🟢 تعريف الألوان الجديدة بناءً على الثيم
    const footerBgColor = theme.palette.mode === 'light' ? theme.palette.myColor.main : theme.palette.bg.main;
    const linkColor = theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.primary.light;

    return (
        <Box
            sx={{
                bgcolor: footerBgColor, 
                py: 6,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                color: theme.palette.text.primary, // تحديد لون النص الأساسي
            }}
        >
            <Container>
                <Grid container spacing={4} justifyContent="space-between">
                    
                    {/* 1. عمود حول المتجر (About) */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight={700} mb={2} color={theme.palette.primary.main}>
                            Eco-Store
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: theme.palette.text.secondary }}>
An environmentally friendly product sales platform aimed at facilitating a green and sustainable lifestyle.                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <FacebookIcon sx={{ color: linkColor, '&:hover': { color: theme.palette.secondary.main } }} />
                            <TwitterIcon sx={{ color: linkColor, '&:hover': { color: theme.palette.secondary.main } }} />
                            <InstagramIcon sx={{ color: linkColor, '&:hover': { color: theme.palette.secondary.main } }} />
                        </Stack>
                    </Grid>

                    {/* 2. الروابط البيئية (Recycling & Rewards) */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight={700} mb={2}>
Environmental services                        </Typography>
                        <Stack spacing={1}>
                            <MuiLink href="/recycling" color="inherit" underline="none" sx={{ '&:hover': { color: linkColor } }}>
Recycling request ♻️                            </MuiLink>
                            <MuiLink href="/rewards" color="inherit" underline="none" sx={{ '&:hover': { color: linkColor } }}>
Environmental Rewards Points                            </MuiLink>
                            <MuiLink href="/faq" color="inherit" underline="none" sx={{ '&:hover': { color: linkColor } }}>
Frequently Asked Questions                            </MuiLink>
                        </Stack>
                    </Grid>

                    {/* 3. استكشف (Content & Local Brands) */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight={700} mb={2}>
                            Discover
                        </Typography>
                        <Stack spacing={1}>
                            <MuiLink 
                                component={Link}
                                to="/brands"
                                color="inherit" 
                                underline="none" 
                                sx={{ '&:hover': { color: linkColor } }}
                            >
Local Brands              
              </MuiLink>
                            
                            {/* 🟢 التعديل: ربط مدونة ونصائح بيئية بـ /blog */}
                            <MuiLink 
                                component={Link} 
                                to="/blog" 
                                color="inherit" 
                                underline="none" 
                                sx={{ '&:hover': { color: linkColor } }}
                            >
Environmental blog and tips                            </MuiLink>

                            <MuiLink href="/shipping" color="inherit" underline="none" sx={{ '&:hover': { color: linkColor } }}>
Shipping for sustainability                            </MuiLink>
                        </Stack>
                    </Grid>

                    {/* 4. معلومات الاتصال (Contact Info) */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight={700} mb={2}>
                             Contact Us
                        </Typography>
                        <Typography variant="body2" color="inherit">
                            Email: contact@ecostore.com
                        </Typography>
                        <Typography variant="body2" color="inherit">
                            Phone: +000 123 4567
                        </Typography>
                    </Grid>
                </Grid>

                {/* 📌 حقوق النشر (Copyright Footer) */}
                <Box sx={{ mt: 5, borderTop: `1px solid ${theme.palette.text.secondary}40`, pt: 3, textAlign: 'center' }}>
                    <Typography
                        color={theme.palette.text.secondary}  
                        variant='body2'
                    >
                        © {new Date().getFullYear()} Eco-Store. All rights reserved. 
                        Designed by 
                        <Button
                            sx={{
                                mx: 0.5,
                                fontSize: "14px",
                                textTransform: "capitalize",
                                color: theme.palette.secondary.main, // لون مميز لاسم المصمم
                            }}
                            variant='text'
                        >
                            DEPI
                        </Button>
                    </Typography>
                </Box>

            </Container>
        </Box>
    );
}