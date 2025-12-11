import React from 'react';
import { Box, Typography, Container, Breadcrumbs, Link as MuiLink, useTheme, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets'; 
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// الصورة الخلفية للبانر (استبدلي بالمسار الصحيح لصورة مناسبة)
const BANNER_IMAGE_URL = '/images/pet-products-banner.jpg'; 

export default function PetProductsBlog() {
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
    
    const textStyle = { 
        color: 'white', 
        zIndex: 1 
    };

    return (
        <Box>
            
            {/* Header Fix: Ensure content starts below sticky/fixed headers */}
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
                            Sustainable Pet Products
                        </Typography>
                    </Breadcrumbs>

                    {/* Main Title */}
                    <Typography 
                        variant="h3" 
                        component="h1" 
                        fontWeight={700}
                        sx={{ ...textStyle, mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}
                    >
                        15 Natural and Sustainable Pet Products For Every Conscious Pet Parent
                    </Typography>

                    {/* Short Description */}
                    <Typography 
                        variant="h6" 
                        sx={{ ...textStyle, opacity: 0.9, fontSize: { xs: '1rem', md: '1.25rem' } }}
                    >
                        Explore 15 sustainable pet products that support your furry friend's well-being while protecting the planet. From dog shampoo to catnip toys, we have it all!
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
                    As pet ownership grows, so does the environmental impact of our pets' essentials. Many conventional toys are made from harmful plastics, and grooming products contain harsh chemicals. Switching to sustainable pet care is a crucial way to care for both your pet and the environment.
                </Typography>
                
                {/* 2.2 Key Categories */}
                <Typography variant="h4" fontWeight={700} color={theme.palette.primary.main} mt={6} mb={3} sx={{ textAlign: 'left' }}>
                    Top Categories for Eco-Friendly Pets
                </Typography>
                
                {/* Waste Management */}
                <Box component="section" sx={{ mb: 5 }}>
                    <Typography variant="h5" fontWeight={700} color={theme.palette.text.primary} mb={2} sx={{ textAlign: 'left' }}>
                        1. Waste Management
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary, lineHeight: 1.8 }}>
                        Dealing with pet waste doesn't have to mean contributing plastic to landfills.
                    </Typography>
                    <List sx={{ textAlign: 'left' }}>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                <CheckCircleIcon color="success" />
                            </ListItemIcon>
                            <ListItemText primary="Compostable Poop Bags: Look for bags certified compostable, made from plant starches." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                <CheckCircleIcon color="success" />
                            </ListItemIcon>
                            <ListItemText primary="Natural Litter: Choose cat litter made from recycled paper, wood pellets, or corn." />
                        </ListItem>
                    </List>
                </Box>
                
                {/* Toys and Accessories */}
                <Box component="section" sx={{ mb: 5 }}>
                    <Typography variant="h5" fontWeight={700} color={theme.palette.text.primary} mb={2} sx={{ textAlign: 'left' }}>
                        2. Toys and Accessories
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary, lineHeight: 1.8 }}>
                        Keep playtime fun and safe with non-toxic, durable materials.
                    </Typography>
                    <List sx={{ textAlign: 'left' }}>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                <CheckCircleIcon color="success" />
                            </ListItemIcon>
                            <ListItemText primary="Hemp and Jute Toys: Naturally durable and biodegradable alternatives to synthetic rope." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                <CheckCircleIcon color="success" />
                            </ListItemIcon>
                            <ListItemText primary="Recycled Materials: Toys made from reclaimed ocean plastics or recycled bottles." />
                        </ListItem>
                    </List>
                </Box>
                
                {/* Grooming and Wellness */}
                <Box component="section" sx={{ mb: 5 }}>
                    <Typography variant="h5" fontWeight={700} color={theme.palette.text.primary} mb={2} sx={{ textAlign: 'left' }}>
                        3. Grooming and Wellness
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary, lineHeight: 1.8 }}>
                        Ensure your pet's skin and coat are treated with gentle, natural formulas.
                    </Typography>
                    <List sx={{ textAlign: 'left' }}>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                <CheckCircleIcon color="success" />
                            </ListItemIcon>
                            <ListItemText primary="Natural Shampoos: Formulas free of parabens, phthalates, and synthetic fragrances." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                <CheckCircleIcon color="success" />
                            </ListItemIcon>
                            <ListItemText primary="Bamboo Brushes: Grooming tools made from fast-growing, sustainable bamboo." />
                        </ListItem>
                    </List>
                </Box>
                
                {/* 2.3 Conclusion and Call to Action */}
                <Box sx={{ mt: 6, p: 4, bgcolor: theme.palette.primary.light, borderRadius: 2 }}>
                    <Typography variant="h6" fontWeight={700} color={theme.palette.primary.dark} mb={2} sx={{ textAlign: 'left' }}>
                        Shop Consciously for Your Companion
                    </Typography>
                    <Typography variant="body1" color={theme.palette.text.primary} sx={{ textAlign: 'left' }}>
                        Ready to spoil your pet without harming the planet? Browse our full collection of natural and sustainable pet products today!
                    </Typography>
                </Box>
                
            </Container>
        </Box>
    );
}