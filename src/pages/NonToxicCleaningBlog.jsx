import React from 'react';
import { Box, Typography, Container, Breadcrumbs, Link as MuiLink, useTheme, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
// تم إبقاء هذه الأيقونات كجزء من تصميم القائمة وليست إيموجي نصي
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning'; 

// Image URL: Ensure this path is correct, e.g., in your public folder
const BANNER_IMAGE_URL = '/images/full-cleaning-products-banner.jpg'; 

export default function NonToxicCleaningBlog() {
    const theme = useTheme();

    // Banner Style (Unchanged)
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
    
    // Text Style (Unchanged)
    const textStyle = { 
        color: 'white', 
        zIndex: 1 
    };

    return (
        <Box>
            
            {/* Header Fix: Ensure content starts below sticky/fixed headers */}
            {/* Adjust this value (e.g., 200px) based on the combined height of your Header components */}
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
                            Your Room-By-Room Guide...
                        </Typography>
                    </Breadcrumbs>

                    {/* Main Title */}
                    <Typography 
                        variant="h3" 
                        component="h1" 
                        fontWeight={700}
                        sx={{ ...textStyle, mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}
                    >
                        Your Room-By-Room Guide To Non-Toxic Cleaning Products
                    </Typography>

                    {/* Short Description */}
                    <Typography 
                        variant="h6" 
                        sx={{ ...textStyle, opacity: 0.9, fontSize: { xs: '1rem', md: '1.25rem' } }}
                    >
                        Your handy guide to the best non-toxic cleaning products for every room in your home. Learn about toxic ingredients and shop natural alternatives, all in one place.
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
                    In our pursuit of a healthier, more sustainable living environment, non-toxic cleaning products are the first step. Conventional products are often filled with harsh chemicals that not only affect indoor air quality but also harm public health and water systems when disposed of.
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: theme.palette.text.primary, lineHeight: 1.8 }}>
                    This guide aims to simplify the transition, offering effective, sustainable, and natural alternatives for every corner of your home.
                </Typography>
                
                {/* 2.2 Toxic Ingredients to Avoid */}
                <Box sx={{ my: 4, p: 3, bgcolor: theme.palette.myColor.light, borderRadius: 2 }}>
                    <Typography variant="h5" fontWeight={700} color={theme.palette.secondary.dark} mb={2} sx={{ textAlign: 'left' }}>
                        Three Toxic Ingredients to Avoid Immediately
                    </Typography>
                    <Grid container spacing={2}>
                        {['Phthalates', 'Chlorine Bleach', 'Ammonia'].map((item, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Box display="flex" alignItems="center"> 
                                    {/* تم إبقاء أيقونة التحذير كجزء من التصميم وليس إيموجي */}
                                    <WarningIcon sx={{ color: theme.palette.error.main }} /> 
                                    <Typography variant="subtitle1" fontWeight={600} ml={1}>
                                        {item}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                
                <Typography variant="h4" fontWeight={700} color={theme.palette.primary.main} mt={6} mb={3} sx={{ textAlign: 'left' }}>
                    The Room-By-Room Cleaning Guide
                </Typography>
                
                {/* 2.3 Kitchen */}
                <Box component="section" sx={{ mb: 5 }}>
                    <Typography variant="h5" fontWeight={700} color={theme.palette.text.primary} mb={2} sx={{ textAlign: 'left' }}>
                        The Kitchen
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary, lineHeight: 1.8 }}>
                        The kitchen is the heart of the home, so its cleaning products must be food-safe.
                    </Typography>
                    <List sx={{ textAlign: 'left' }}>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                <CheckCircleIcon color="success" />
                            </ListItemIcon>
                            <ListItemText primary="Surface Cleaner: Use white vinegar or a plant-based multi-purpose cleaner." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                <CheckCircleIcon color="success" />
                            </ListItemIcon>
                            <ListItemText primary="Dish Soap Alternative: Biodegradable dish soap that is gentle on hands and the planet." />
                        </ListItem>
                    </List>
                </Box>
                
                {/* 2.4 Bathroom */}
                <Box component="section" sx={{ mb: 5 }}>
                    <Typography variant="h5" fontWeight={700} color={theme.palette.text.primary} mb={2} sx={{ textAlign: 'left' }}>
                        The Bathroom
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary, lineHeight: 1.8 }}>
                        Humidity and bacteria require strong cleaning power, but this can be achieved without harsh chemicals.
                    </Typography>
                    <List sx={{ textAlign: 'left' }}>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                <CheckCircleIcon color="success" />
                            </ListItemIcon>
                            <ListItemText primary="Toilet Cleaner: Use baking soda and vinegar for deep cleaning and odor removal." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                <CheckCircleIcon color="success" />
                            </ListItemIcon>
                            <ListItemText primary="Glass & Mirror Cleaner: A mixture of water and vinegar, or an ammonia-free glass cleaner." />
                        </ListItem>
                    </List>
                </Box>
                
                {/* 2.5 Conclusion and Call to Action */}
                <Box sx={{ mt: 6, p: 4, bgcolor: theme.palette.primary.light, borderRadius: 2 }}>
                    <Typography variant="h6" fontWeight={700} color={theme.palette.primary.dark} mb={2} sx={{ textAlign: 'left' }}>
                        Ready to make the switch?
                    </Typography>
                    <Typography variant="body1" color={theme.palette.text.primary} sx={{ textAlign: 'left' }}>
                        All the non-toxic products we recommend are available in our shop section. Start your journey towards a healthier home today!
                    </Typography>
                </Box>
                
            </Container>
        </Box>
    );
}