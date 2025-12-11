import React from 'react';
import { 
    Box, 
    Typography, 
    Container, 
    useTheme, 
    Button, 
    Grid, 
    Paper, 
    Card, 
    CardContent, 
    CardActions, 
    CardMedia,
    Chip,
    Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import RedeemIcon from '@mui/icons-material/Redeem';
import StarsIcon from '@mui/icons-material/Stars';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// بيانات وهمية (Mock Data) للنقاط والمكافآت
const mockBalance = 5480; // رصيد النقاط الحالي
const mockRewards = [
    { 
        id: 1, 
        title: "10% Off Organic Groceries", 
        points: 2000, 
        category: "Coupon",
        description: "Valid for one purchase at our partner organic grocery store.",
        imageUrl: "/images/reward-coupon.jpg"
    },
    { 
        id: 2, 
        title: "Free Bamboo Toothbrush", 
        points: 800, 
        category: "Product",
        description: "Redeem for a complimentary sustainable bamboo toothbrush set.",
        imageUrl: "/images/reward-toothbrush.jpg"
    },
    { 
        id: 3, 
        title: "20% Off Sustainable Fashion", 
        points: 4500, 
        category: "Coupon",
        description: "Valid for one purchase of sustainable clothing from selected brands.",
        imageUrl: "/images/reward-fashion.jpg"
    },
    { 
        id: 4, 
        title: "Eco-Point Donation ($5)", 
        points: 1000, 
        category: "Donation",
        description: "Donate your points to fund local environmental cleanup projects.",
        imageUrl: "/images/reward-donation.jpg"
    },
];

export default function RedeemPointsPage() {
    const theme = useTheme();
    const [currentBalance, setCurrentBalance] = React.useState(mockBalance);
    const [statusMessage, setStatusMessage] = React.useState({ open: false, type: '', message: '' });

    const handleRedeem = (reward) => {
        if (currentBalance >= reward.points) {
            // منطق الاسترداد
            setCurrentBalance(currentBalance - reward.points);
            setStatusMessage({ 
                open: true, 
                type: 'success', 
                message: `Success! You redeemed ${reward.title} for ${reward.points} points. Check your email for details.` 
            });
            console.log(`Redeemed: ${reward.title}`);
        } else {
            // رسالة خطأ
            setStatusMessage({ 
                open: true, 
                type: 'error', 
                message: `Error: You need ${reward.points.toLocaleString()} points but only have ${currentBalance.toLocaleString()}.` 
            });
        }
        // إخفاء الرسالة بعد 5 ثواني
        setTimeout(() => setStatusMessage({ open: false, type: '', message: '' }), 5000);
    };

    return (
        <Box>
            {/* Header Fix: تعويض ارتفاع الناف بار */}
            <Box sx={{ pt: { xs: '100px', sm: '120px', md: '150px' }, mt: '-1px' }} /> 
            
            <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
                
                <RedeemIcon sx={{ fontSize: 70, color: theme.palette.secondary.main, mb: 1 }} />
                <Typography 
                    variant="h3" 
                    component="h1" 
                    fontWeight={700}
                    color={theme.palette.secondary.main}
                    mb={1}
                >
                    Redeem Your Eco-Points
                </Typography>
                <Typography 
                    variant="h6" 
                    color={theme.palette.text.secondary}
                    mb={6}
                >
                    Exchange your hard-earned points for exciting eco-rewards and discounts.
                </Typography>

                {/* Current Balance & Status Message */}
                <Paper 
                    elevation={4} 
                    sx={{ p: 3, mb: 5, background: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100], borderRadius: 2 }}
                >
                    <Typography variant="h5" fontWeight={600} color="text.primary">
                        Your Current Eco-Points Balance:
                    </Typography>
                    <Typography variant="h3" fontWeight={800} color={theme.palette.primary.main} my={1}>
                        {currentBalance.toLocaleString()} <StarsIcon sx={{ verticalAlign: 'text-bottom', fontSize: 35, ml: 1 }} />
                    </Typography>
                    <Button component={Link} to="/rewards/balance" variant="outlined" size="small">
                        View Transaction History
                    </Button>
                </Paper>

                {statusMessage.open && (
                    <Alert severity={statusMessage.type} sx={{ mb: 3 }}>
                        {statusMessage.message}
                    </Alert>
                )}

                {/* Rewards Catalog */}
                <Typography 
                    variant="h4" 
                    fontWeight={700} 
                    color="text.primary" 
                    mt={5} 
                    mb={4}
                >
                    Available Rewards Catalog
                </Typography>
                
                <Grid container spacing={4} justifyContent="center">
                    {mockRewards.map((reward) => (
                        <Grid item key={reward.id} xs={12} sm={6} md={4}>
                            <Card 
                                elevation={3}
                                sx={{ 
                                    height: '100%', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    transition: '0.3s', 
                                    '&:hover': { boxShadow: theme.shadows[8] } 
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={reward.imageUrl} // يجب أن تكون الصور متاحة
                                    alt={reward.title}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Chip 
                                        label={reward.category} 
                                        size="small" 
                                        color={reward.category === 'Coupon' ? 'primary' : reward.category === 'Product' ? 'success' : 'error'}
                                        sx={{ mb: 1 }}
                                    />
                                    <Typography gutterBottom variant="h5" component="div" fontWeight={700}>
                                        {reward.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {reward.description}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
                                    <Typography variant="h6" color={theme.palette.secondary.main} fontWeight={700} display="flex" alignItems="center">
                                        <StarsIcon sx={{ mr: 0.5, fontSize: 20 }} /> {reward.points.toLocaleString()} Points
                                    </Typography>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        disabled={currentBalance < reward.points}
                                        onClick={() => handleRedeem(reward)}
                                    >
                                        {currentBalance < reward.points ? 'Insufficient Points' : 'Redeem Now'}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                
            </Container>
        </Box>
    );
}