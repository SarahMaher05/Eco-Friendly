import React from 'react';
import { Container, Typography, Box, Paper, Avatar, Divider, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProfilePage() {
    const { currentUser } = useAuth();

    // إذا لم يكن المستخدم مسجلاً، وجهه إلى صفحة الدخول
    if (!currentUser) {
        // يمكنك توجيهه إلى صفحة الدخول لطلب التسجيل
        return <Navigate to="/login" replace />; 
    }
    
    // بيانات المستخدم المتوفرة (افتراضًا من AuthContext)
    const { fullName, email, creationDate } = currentUser;

    return (
        <Container maxWidth="sm" sx={{ pt: 15, pb: 10, minHeight: '80vh' }}>
            <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
                <Box textAlign="center" mb={4}>
                    <Avatar sx={{ 
                        bgcolor: 'primary.main', 
                        width: 70, 
                        height: 70, 
                        mx: 'auto', 
                        mb: 2 
                    }}>
                        <PersonIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Typography variant="h4" fontWeight={600} color="text.primary">
                        {fullName || 'My Account'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Welcome to your profile dashboard.
                    </Typography>
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                <Stack spacing={2}>
                    <Box>
                        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                            Full Name:
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {fullName || 'N/A'}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                            Email:
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {email}
                        </Typography>
                    </Box>
                    {creationDate && (
                        <Box>
                            <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                                Member Since:
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {new Date(creationDate).toLocaleDateString()}
                            </Typography>
                        </Box>
                    )}
                    {/* يمكنك إضافة المزيد من البيانات هنا مثل العنوان أو نقاط Eco-Points */}
                </Stack>
            </Paper>
        </Container>
    );
}