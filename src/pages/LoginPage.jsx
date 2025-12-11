// src/pages/LoginPage.jsx (الكود الكامل المُعدل)
import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Button, TextField, Alert } from '@mui/material'; // 💡 استيراد Alert
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth(); 
    
    // 💡 حالات لتخزين مدخلات المستخدم
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // 💡 حالة لرسائل الخطأ
    const [errorMessage, setErrorMessage] = useState('');

    // دالة معالجة تسجيل الدخول
    const handleLogin = () => {
        setErrorMessage(''); // مسح الأخطاء السابقة

        if (!email || !password) {
            setErrorMessage("Please enter both email and password.");
            return;
        }

        const result = login(email, password);
        
        if (result.success) {
            // 🌟 التعديل المطلوب: التوجيه لصفحة الدفع
            alert("Login Successful! Redirecting to Checkout.");
            navigate('/checkout'); 
        } else {
            // 🛑 عرض رسالة "Account not found" المطلوبة
            setErrorMessage(result.message); 
        }
    };

    return (
        <Container maxWidth="xs" sx={{ pt: 15, pb: 10 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" fontWeight={700} mb={3} textAlign="center">
                    Log In
                </Typography>
                
                {/* 🚨 عرض رسالة الخطأ */}
                {errorMessage && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errorMessage}
                    </Alert>
                )}

                <TextField 
                    label="Email Address" 
                    type="email" 
                    fullWidth 
                    margin="normal" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField 
                    label="Password" 
                    type="password" 
                    fullWidth 
                    margin="normal" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    size="large" 
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleLogin} 
                >
                    Log In
                </Button>
                
                <Typography variant="body2" textAlign="center">
                    Don't have an account? 
                    <Button onClick={() => navigate('/signup')} sx={{ textTransform: 'none' }}>
                        Sign Up
                    </Button>
                </Typography>
            </Paper>
        </Container>
    );
}