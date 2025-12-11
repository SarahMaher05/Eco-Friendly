import React from 'react';
import { Box, Typography, Container, Breadcrumbs, Link as MuiLink, useTheme, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// الصورة الخلفية للبانر (تحتاجين لوضع صورة مناسبة في مجلد public/images)
const BANNER_IMAGE_URL = '/images/baby-products-banner.jpg'; 

export default function BabyProductsBlog() {
    const theme = useTheme();

    const bannerStyle = {
        height: { xs: '40vh', md: '60vh' },
        width: '100%',
        backgroundImage: `url(${BANNER_IMAGE_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        p: { xs: 3, md: 5 },
    };
    
    const textStyle = { 
        color: 'white', 
        zIndex: 1 
    };

    return (
        <Box>
            
            {/* 🟢 ضروري لضمان ظهور المحتوى أسفل الـ Header الثابت */}
            <Box 
                sx={{ 
                    pt: { xs: '150px', sm: '180px', md: '200px' },
                    mt: '-1px' 
                }} 
            /> 

            {/* 1. Main Banner */}
            <Box sx={bannerStyle}>
                
                {/* Overlay */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.3)', 
                    zIndex: 0,
                }} />

                <Container 
                    maxWidth="lg" 
                    sx={{ textAlign: 'left', pb: { xs: 1, md: 3 } }} 
                >
                    {/* Breadcrumbs */}
                    <Breadcrumbs 
                        aria-label="breadcrumb" 
                        sx={{ mb: 2, ...textStyle }}
                        separator=">"
                    >
                        <MuiLink component={Link} to="/" color="inherit" underline="hover" sx={{ color: 'lightgray' }}>
                            Home
                        </MuiLink>
                        <MuiLink component={Link} to="/blog" color="inherit" underline="hover" sx={{ color: 'lightgray' }}>
                            Blog
                        </MuiLink>
                        <Typography color="white" fontWeight={600}>
                            Sustainable Baby Products
                        </Typography>
                    </Breadcrumbs>

                    {/* Main Title */}
                    <Typography 
                        variant="h3" 
                        component="h1" 
                        fontWeight={700}
                        sx={{ ...textStyle, mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}
                    >
                        Best Sustainable and Natural Baby Products for New Parents
                    </Typography>

                    {/* Short Description */}
                    <Typography 
                        variant="h6" 
                        sx={{ ...textStyle, opacity: 0.9, fontSize: { xs: '1rem', md: '1.25rem' } }}
                    >
                        A curated selection of eco-friendly, non-toxic essentials that prioritize your baby's health and the planet's future.
                    </Typography>

                </Container>
            </Box>

            {/* 2. Content Body */}
            <Container 
                maxWidth="md" 
                sx={{ py: 8, textAlign: 'left' }} 
            >
                
                {/* 2.1 Introduction */}
                <Typography variant="body1" paragraph sx={{ mt: 0, color: theme.palette.text.primary, lineHeight: 1.8 }}>
                    Navigating the world of baby products can be overwhelming, especially when you are committed to sustainability. Many conventional items contain plastics and chemicals that are harmful. Choosing natural and sustainable alternatives is a vital step toward reducing your family's environmental footprint.
                </Typography>
                
                {/* 2.2 Key Categories */}
                <Typography variant="h4" fontWeight={700} color={theme.palette.primary.main} mt={6} mb={3} sx={{ textAlign: 'left' }}>
                    Essential Sustainable Baby Categories
                </Typography>
                
                {/* Diapers & Wipes */}
                <Box component="section" sx={{ mb: 5 }}>
                    <Typography variant="h5" fontWeight={700} color={theme.palette.text.primary} mb={2} sx={{ textAlign: 'left' }}>
                        Diapers and Wipes
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary, lineHeight: 1.8 }}>
                        The most significant waste source for new parents. Consider these planet-friendly solutions:
                    </Typography>
                    <List sx={{ textAlign: 'left' }}>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                <FavoriteIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Cloth Diapers: Reusable, durable, and significantly reduce landfill waste." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                <FavoriteIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Bamboo Wipes: Biodegradable and made from natural, fast-growing fiber." />
                        </ListItem>
                    </List>
                </Box>
                
                {/* Clothing & Fabric */}
                <Box component="section" sx={{ mb: 5 }}>
                    <Typography variant="h5" fontWeight={700} color={theme.palette.text.primary} mb={2} sx={{ textAlign: 'left' }}>
                        Clothing and Fabric
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary, lineHeight: 1.8 }}>
                        Baby clothes should be soft, non-toxic, and ethically sourced.
                    </Typography>
                    <List sx={{ textAlign: 'left' }}>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                <FavoriteIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Organic Cotton: Ensures no harsh pesticides touched the fabric or your baby’s skin." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                <FavoriteIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Natural Dyes: Look for clothing colored with vegetable or mineral-based dyes." />
                        </ListItem>
                    </List>
                </Box>
                
                {/* 2.3 Conclusion and Call to Action */}
                <Box sx={{ mt: 6, p: 4, bgcolor: theme.palette.primary.light, borderRadius: 2 }}>
                    <Typography variant="h6" fontWeight={700} color={theme.palette.primary.dark} mb={2} sx={{ textAlign: 'left' }}>
                        Start Building Your Sustainable Registry
                    </Typography>
                    <Typography variant="body1" color={theme.palette.text.primary} sx={{ textAlign: 'left' }}>
                        We stock a wide range of certified organic and sustainable baby products. Visit our store to shop all the essentials!
                    </Typography>
                </Box>
                
            </Container>
        </Box>
    );
}