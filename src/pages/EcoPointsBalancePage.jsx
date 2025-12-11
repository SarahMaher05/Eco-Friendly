import React from 'react';
import { 
    Box, 
    Typography, 
    Container, 
    useTheme, 
    Button, 
    Grid, 
    Paper, 
    List, 
    ListItem, 
    ListItemText, 
    ListItemIcon,
} from '@mui/material';
import { Link } from 'react-router-dom';
import StarsIcon from '@mui/icons-material/Stars';
import HistoryIcon from '@mui/icons-material/History';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RedeemIcon from '@mui/icons-material/Redeem';

// بيانات وهمية (Mock Data) للنقاط والمعاملات
const mockBalance = 5480;
const mockTransactions = [
    { id: 1, type: 'Pickup', points: 1200, date: '2025-10-28', description: 'Plastic & Cardboard pickup' },
    { id: 2, type: 'Redeem', points: -500, date: '2025-11-05', description: 'Redeemed for a discount coupon' },
    { id: 3, type: 'Pickup', points: 3000, date: '2025-11-15', description: 'E-Waste large batch' },
    { id: 4, type: 'Bonus', points: 1780, date: '2025-12-01', description: 'Monthly Loyalty Bonus' },
    { id: 5, type: 'Redeem', points: -100, date: '2025-12-05', description: 'Redeemed for small item' },
];

export default function EcoPointsBalancePage() {
    const theme = useTheme();

    return (
        <Box>
            {/* Header Fix: تعويض ارتفاع الناف بار */}
            <Box 
                sx={{ 
                    pt: { xs: '100px', sm: '120px', md: '150px' },
                    mt: '-1px' 
                }} 
            /> 
            
            <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
                
                <StarsIcon sx={{ fontSize: 70, color: theme.palette.primary.main, mb: 1 }} />
                <Typography 
                    variant="h3" 
                    component="h1" 
                    fontWeight={700}
                    color={theme.palette.primary.main}
                    mb={1}
                >
                    Your Eco-Points Balance
                </Typography>
                <Typography 
                    variant="h6" 
                    color={theme.palette.text.secondary}
                    mb={6}
                >
                    Every recycled item earns you rewards. See your current points and transaction history below.
                </Typography>

                <Grid container spacing={4}>
                    
                    {/* 1. Current Balance Card */}
                    <Grid item xs={12} md={5}>
                        <Paper 
                            elevation={10} 
                            sx={{ 
                                p: 4, 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                background: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.primary.light,
                                color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.contrastText,
                                borderRadius: 3,
                            }}
                        >
                            <Box>
                                <Typography variant="h5" fontWeight={600} mb={1}>
                                    Available Eco-Points
                                </Typography>
                                <Typography variant="h2" fontWeight={800}>
                                    {mockBalance.toLocaleString()}
                                </Typography>
                                <Typography variant="subtitle1" mt={1}>
                                    points earned so far!
                                </Typography>
                            </Box>
                            
                            <Box mt={4}>
                                <Button
                                    component={Link}
                                    to="/schedule" // يجب تعديل هذا المسار ليتناسب مع مسار الجدولة الفعلي
                                    variant="contained"
                                    size="large"
                                    sx={{ 
                                        width: '100%', 
                                        bgcolor: theme.palette.secondary.main, 
                                        color: theme.palette.secondary.contrastText,
                                        '&:hover': { bgcolor: theme.palette.secondary.dark }
                                    }}
                                >
                                    Schedule New Pickup
                                </Button>
                                <Button
                                    component={Link}
                                    to="/redeem" // يجب إنشاء هذه الصفحة لاحقًا
                                    variant="outlined"
                                    size="large"
                                    startIcon={<RedeemIcon />}
                                    sx={{ width: '100%', mt: 2, borderColor: '#fff', color: '#fff' }}
                                >
                                    Redeem Points
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                    
                    {/* 2. Transaction History */}
                    <Grid item xs={12} md={7}>
                        <Paper elevation={3} sx={{ p: 4, height: '100%', textAlign: 'left', borderRadius: 3 }}>
                            <Typography 
                                variant="h5" 
                                fontWeight={700} 
                                sx={{ display: 'flex', alignItems: 'center' }}
                                mb={2}
                            >
                                <HistoryIcon sx={{ mr: 1 }} /> Transaction History
                            </Typography>
                            
                            <List sx={{ maxHeight: 400, overflowY: 'auto' }}>
                                {mockTransactions.map((tx) => (
                                    <ListItem 
                                        key={tx.id} 
                                        divider
                                        sx={{ 
                                            py: 1.5,
                                            '&:hover': { bgcolor: theme.palette.action.hover }
                                        }}
                                    >
                                        <ListItemIcon>
                                            {tx.type === 'Pickup' || tx.type === 'Bonus' ? (
                                                <CheckCircleOutlineIcon color="success" />
                                            ) : (
                                                <RedeemIcon color="error" />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography variant="body1" fontWeight={600}>
                                                        {tx.description}
                                                    </Typography>
                                                    <Typography 
                                                        variant="h6" 
                                                        fontWeight={700} 
                                                        color={tx.points > 0 ? theme.palette.success.main : theme.palette.error.main}
                                                        sx={{ ml: 2 }}
                                                    >
                                                        {tx.points > 0 ? `+${tx.points.toLocaleString()}` : tx.points.toLocaleString()}
                                                    </Typography>
                                                </Box>
                                            }
                                            secondary={tx.date}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <Typography variant="body2" color="text.secondary" mt={2} textAlign="center">
                                Showing last {mockTransactions.length} transactions.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}