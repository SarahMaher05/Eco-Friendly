import React from 'react';
import { Box, Typography, Button, Container, useTheme, Grid, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function BlogSection() {
    const theme = useTheme();

    // 💡 بيانات البطاقات (المسارات لم تتغير)
    const blogCards = [
        {
            title: "Your Room-By-Room Guide To Non-Toxic Cleaning Products",
            imageUrl: '/images/full-cleaning-products-banner.jpg',
            linkPath: '/blog/non-toxic-cleaning-guide' 
        },
        {
            title: "Best Sustainable and Natural Baby Products for New Parents",
            imageUrl: '/images/baby-products-banner.jpg',
            linkPath: '/blog/baby-products-guide' 
        },
        {
            title: "Bidet or Bamboo? The Ultimate Guide to Eco-Friendly Toilet Paper Alternatives",
            imageUrl: '/images/eco-toilet-paper-banner.jpg',
            linkPath: '/blog/toilet-paper-guide' 
        },
    ];

    // 💡 ستايل أساسي لبطاقة المدونة
    const cardBaseStyle = {
        // الارتفاع الأساسي سيتم تجاوزه في الكروت الفردية
        height: '350px', 
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: theme.shadows[10],
            '& .overlay': {
                bgcolor: 'rgba(0, 0, 0, 0.4)',
            }
        },
        '& .card-content': {
            p: 3,
            color: 'white',
            textAlign: 'left', 
            zIndex: 2,
        }
    };

    return (
        <Box 
            sx={{
                bgcolor: theme.palette.mode === 'light' ? theme.palette.myColor.light : theme.palette.bg.main,
                py: { xs: 8, md: 10 },
                textAlign: 'center',
                borderRadius: 2,
                mt: 6,
            }}
        >
            <Container maxWidth="lg">
                <Typography 
                    variant="h4" 
                    component="h2"
                    fontWeight={700}
                    mb={2}
                    color={theme.palette.text.primary}
                >
                    Take the next step toward a sustainable lifestyle:
                </Typography>

                <Grid container spacing={3} mt={6}>
                    
                    {/* 1. البطاقة الكبيرة على اليسار (Blog Card Index 0) */}
                    {/* تأخذ نصف العرض (md={6}) وارتفاع ثابت كبير */}
                    <Grid item xs={12} md={6}>
                        <Link to={blogCards[0].linkPath} style={{ textDecoration: 'none' }}>
                            <Box 
                                sx={{
                                    ...cardBaseStyle,
                                    backgroundImage: `url(${blogCards[0].imageUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    // 💡 تم تعيين ارتفاع موحد للباقي، مع الأخذ بعين الاعتبار المسافة (spacing=3)
                                    // 500px هو ارتفاع جيد يوازن مجموع ارتفاعي البطاقتين الصغيرتين بالإضافة للمسافة بينهما
                                    height: { xs: '350px', md: '500px' } 
                                }}
                            >
                                {/* طبقة التعتيم */}
                                <Box className="overlay" sx={{ 
                                    position: 'absolute', 
                                    top: 0, 
                                    left: 0, 
                                    width: '100%', 
                                    height: '100%', 
                                    bgcolor: 'rgba(0, 0, 0, 0.3)',
                                    zIndex: 1, 
                                    transition: 'background-color 0.3s'
                                }} />
                                
                                <Box className="card-content">
                                    <Typography variant="h6" fontWeight={700} mb={1}>
                                        {blogCards[0].title}
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600} color="lightgray">
                                        READ THE BLOG
                                    </Typography>
                                </Box>
                            </Box>
                        </Link>
                    </Grid>

                    {/* 2. حاوية البطاقات الأصغر على اليمين (Blog Card Index 1 & 2) */}
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3}>
                            
                            {/* البطاقة العلوية (Blog Card Index 1) */}
                            <Grid item xs={12}>
                                <Link to={blogCards[1].linkPath} style={{ textDecoration: 'none' }}>
                                    <Box 
                                        sx={{
                                            ...cardBaseStyle,
                                            // 💡 ارتفاع البطاقة الصغيرة (أقل قليلاً من نصف البطاقة الكبيرة لحساب spacing={3})
                                            height: '240px', 
                                            backgroundImage: `url(${blogCards[1].imageUrl})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    >
                                        <Box className="overlay" sx={{ 
                                            position: 'absolute', 
                                            top: 0, 
                                            left: 0, 
                                            width: '100%', 
                                            height: '100%', 
                                            bgcolor: 'rgba(0, 0, 0, 0.3)',
                                            zIndex: 1, 
                                            transition: 'background-color 0.3s'
                                        }} />
                                        <Box className="card-content">
                                            <Typography variant="subtitle1" fontWeight={700} mb={1}>
                                                {blogCards[1].title}
                                            </Typography>
                                            <Typography variant="caption" fontWeight={600} color="lightgray">
                                                READ THE BLOG
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Link>
                            </Grid>

                            {/* البطاقة السفلية (Blog Card Index 2) */}
                            <Grid item xs={12}>
                                <Link to={blogCards[2].linkPath} style={{ textDecoration: 'none' }}>
                                    <Box 
                                        sx={{
                                            ...cardBaseStyle,
                                            // 💡 ارتفاع البطاقة الصغيرة (مماثل للعلوية)
                                            height: '240px',
                                            backgroundImage: `url(${blogCards[2].imageUrl})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    >
                                        <Box className="overlay" sx={{ 
                                            position: 'absolute', 
                                            top: 0, 
                                            left: 0, 
                                            width: '100%', 
                                            height: '100%', 
                                            bgcolor: 'rgba(0, 0, 0, 0.3)',
                                            zIndex: 1, 
                                            transition: 'background-color 0.3s'
                                        }} />
                                        <Box className="card-content">
                                            <Typography variant="subtitle1" fontWeight={700} mb={1}>
                                                {blogCards[2].title}
                                            </Typography>
                                            <Typography variant="caption" fontWeight={600} color="lightgray">
                                                LEARN MORE
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Link>
                            </Grid>

                        </Grid>
                    </Grid>

                </Grid>
                {/* ---------------------------------------------------- */}

                {/* زر الدعوة لاتخاذ إجراء */}
                <Box mt={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        component={Link} 
                        to="/blog"       
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            px: 4,
                            py: 1.5,
                            textTransform: 'capitalize',
                            fontWeight: 600,
                        }}
                    >
View All Blogs   </Button>
                </Box>
            </Container>
        </Box>
    );
}