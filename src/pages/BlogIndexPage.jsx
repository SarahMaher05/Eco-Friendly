import React from 'react';
import { Box, Typography, Container, useTheme, Card, CardMedia, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// قائمة المقالات
const blogPosts = [
    {
        title: "Your Room-By-Room Guide To Non-Toxic Cleaning Products",
        description: "Your handy guide to the best non-toxic cleaning products for every room in your home.",
        imageUrl: '/images/full-cleaning-products-banner.jpg',
        linkPath: '/blog/non-toxic-cleaning-guide',
        tag: 'Home & Cleaning'
    },
    {
        title: "Best Sustainable and Natural Baby Products for New Parents",
        description: "A curated selection of eco-friendly, non-toxic essentials that prioritize your baby's health and the planet's future.",
        imageUrl: '/images/baby-products-banner.jpg',
        linkPath: '/blog/baby-products-guide',
        tag: 'Parenting & Kids'
    },
    {
        title: "Bidet or Bamboo? The Ultimate Guide to Eco-Friendly Toilet Paper Alternatives",
        description: "Discover the most eco-friendly toilet paper options, from bamboo rolls to bidets.",
        imageUrl: '/images/eco-toilet-paper-banner.jpg',
        linkPath: '/blog/toilet-paper-guide',
        tag: 'Bathroom Essentials'
    },
    {
        title: "15 Natural and Sustainable Pet Products For Every Conscious Pet Parent",
        description: "Explore 15 sustainable pet products that support your furry friend's well-being while protecting the planet.",
        imageUrl: '/images/pet-products-banner.jpg',
        linkPath: '/blog/pet-products-guide',
        tag: 'Pet Care'
    },
];

export default function BlogIndexPage() {
    const theme = useTheme();

    return (
        <Box>
            {/* 🏆 تم تقليل المسافة العلوية التعويضية (pt) */}
            <Box 
                sx={{ 
                    pt: { xs: '100px', sm: '120px', md: '150px' }, // تم تقليل القيم هنا
                    mt: '-1px' 
                }} 
            /> 
            
            <Container maxWidth="lg" sx={{ py: 8, textAlign: 'left' }}>
                
                <Typography 
                    variant="h3" 
                    component="h1" 
                    fontWeight={700}
                    color={theme.palette.primary.main}
                    mb={2}
                >
                    The Sustainability Blog
                </Typography>
                <Typography 
                    variant="h6" 
                    color={theme.palette.text.secondary}
                    mb={6}
                >
                    Practical guides and deep dives into the best eco-friendly products and sustainable living practices.
                </Typography>

                {/* الحل باستخدام CSS Grid لضمان التنسيق 2x2 وتساوي الارتفاع */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr', 
                            sm: '1fr 1fr', 
                            md: '1fr 1fr', 
                        },
                        gap: theme.spacing(4), 
                        alignItems: 'stretch', 
                    }}
                >
                    {blogPosts.map((post, index) => (
                        <Card 
                            key={index}
                            component={Link} 
                            to={post.linkPath}
                            sx={{ 
                                textDecoration: 'none',
                                height: '100%', 
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden', 
                                transition: 'transform 0.3s, box-shadow 0.3s', 
                                
                                // تأثير التكبير (Zoom effect)
                                '&:hover': {
                                    transform: 'scale(1.05)', 
                                    boxShadow: theme.shadows[8],
                                },
                                
                                '& .MuiCardMedia-root': {
                                    height: 200, 
                                    objectFit: 'cover',
                                },
                                '& .MuiCardContent-root': {
                                    flexGrow: 1, 
                                }
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={post.imageUrl}
                                alt={post.title}
                                sx={{
                                    objectFit: 'cover',
                                    transition: 'transform 0.5s', 
                                }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography 
                                    variant="caption" 
                                    color="text.secondary" 
                                    fontWeight={600}
                                    sx={{ mb: 1, display: 'block' }}
                                >
                                    {post.tag}
                                </Typography>
                                <Typography 
                                    gutterBottom 
                                    variant="h6" 
                                    component="div"
                                    fontWeight={700}
                                    color={theme.palette.text.primary}
                                >
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {post.description}
                                </Typography>
                            </CardContent>
                            <Box sx={{ p: 2, pt: 0 }}>
                                <Button
                                    size="small"
                                    color="primary"
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{ fontWeight: 600 }}
                                >
                                    Read More
                                </Button>
                            </Box>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}