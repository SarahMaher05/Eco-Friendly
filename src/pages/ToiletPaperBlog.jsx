import React from 'react';
import { Box, Typography, Container, Breadcrumbs, Link as MuiLink, useTheme, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
// 🟢 تم استبدال EcoIcon غير الموجود بـ LocalFloristIcon (رمز البيئة والنباتات)
import LocalFloristIcon from '@mui/icons-material/LocalFlorist'; 
// 🟢 تم استبدال QuestionMarkIcon بـ HelpOutlineIcon لاستخدامه في القائمة
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; 

// الصورة الخلفية للبانر 
const BANNER_IMAGE_URL = '/images/eco-toilet-paper-banner.jpg'; // يجب أن تضعي صورة مناسبة هنا

export default function ToiletPaperBlog() {
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
                            Bidet or Bamboo?
                        </Typography>
                    </Breadcrumbs>

                    {/* Main Title */}
                    <Typography 
                        variant="h3" 
                        component="h1" 
                        fontWeight={700}
                        sx={{ ...textStyle, mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}
                    >
                        Bidet or Bamboo? The Ultimate Guide to Eco-Friendly Toilet Paper Alternatives
                    </Typography>

                    {/* Short Description */}
                    <Typography 
                        variant="h6" 
                        sx={{ ...textStyle, opacity: 0.9, fontSize: { xs: '1rem', md: '1.25rem' } }}
                    >
                        Discover the most eco-friendly toilet paper options, from bamboo rolls to bidets, plus global habits, stats, and product recommendations.
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
                    Did you know that conventional toilet paper contributes significantly to deforestation and water pollution? The standard bleached white rolls require millions of trees and gallons of water annually. Transitioning to sustainable alternatives is a small change with a massive global impact.
                </Typography>
                
                {/* 2.2 The Two Main Alternatives */}
                <Typography variant="h4" fontWeight={700} color={theme.palette.primary.main} mt={6} mb={3} sx={{ textAlign: 'left' }}>
                    The Top Two Sustainable Alternatives
                </Typography>
                
                <Grid container spacing={4}>
                    {/* Option 1: Bidets */}
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5" fontWeight={700} color={theme.palette.text.primary} mb={1} sx={{ textAlign: 'left' }}>
                            1. Bidets: The Water Solution
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary, lineHeight: 1.8 }}>
                            Bidets drastically reduce the need for paper. While they use water, the environmental footprint is significantly lower than the resources used in manufacturing, packaging, and transporting toilet paper.
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{ bgcolor: theme.palette.myColor.light, p: 2, borderRadius: 1 }}>
                            <LocalFloristIcon color="success" sx={{ mr: 1 }} />
                            <Typography variant="body2" fontWeight={600}>
                                Best for: Maximum waste reduction and superior hygiene.
                            </Typography>
                        </Box>
                    </Grid>
                    
                    {/* Option 2: Bamboo Paper */}
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5" fontWeight={700} color={theme.palette.text.primary} mb={1} sx={{ textAlign: 'left' }}>
                            2. Bamboo: The Paper Alternative
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary, lineHeight: 1.8 }}>
                            Bamboo is a grass that grows rapidly, making it a much more sustainable source than virgin wood pulp. It requires less water and no harmful bleaches in processing compared to traditional paper.
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{ bgcolor: theme.palette.myColor.light, p: 2, borderRadius: 1 }}>
                            <LocalFloristIcon color="success" sx={{ mr: 1 }} />
                            <Typography variant="body2" fontWeight={600}>
                                Best for: Easy transition and households that prefer dry wiping.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                
                
                {/* 2.3 Key Considerations */}
                <Box component="section" sx={{ mb: 5, mt: 6 }}>
                    <Typography variant="h5" fontWeight={700} color={theme.palette.text.primary} mb={2} sx={{ textAlign: 'left' }}>
                        Choosing Your Eco-Solution
                    </Typography>
                    <List sx={{ textAlign: 'left' }}>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                <HelpOutlineIcon color="action" />
                            </ListItemIcon>
                            <ListItemText primary="Check for Certification: Ensure bamboo products are FSC or equivalent certified." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                <HelpOutlineIcon color="action" />
                            </ListItemIcon>
                            <ListItemText primary="Septic Systems: Always check manufacturer guidelines if you have a septic tank." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                                <HelpOutlineIcon color="action" />
                            </ListItemIcon>
                            <ListItemText primary="Water Use: Assess if the minimal water use of a bidet is acceptable for your region's water supply." />
                        </ListItem>
                    </List>
                </Box>
                
                {/* 2.4 Conclusion and Call to Action */}
                <Box sx={{ mt: 6, p: 4, bgcolor: theme.palette.primary.light, borderRadius: 2 }}>
                    <Typography variant="h6" fontWeight={700} color={theme.palette.primary.dark} mb={2} sx={{ textAlign: 'left' }}>
                        Make the switch today!
                    </Typography>
                    <Typography variant="body1" color={theme.palette.text.primary} sx={{ textAlign: 'left' }}>
                        Whether you choose bamboo rolls or a bidet attachment, every roll saved is a step towards a healthier planet. Find both options in our sustainable essentials shop.
                    </Typography>
                </Box>
                
            </Container>
        </Box>
    );
}