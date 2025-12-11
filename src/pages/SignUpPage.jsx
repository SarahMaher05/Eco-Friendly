// src/pages/SignUpPage.jsx (الكود الكامل المُعدل)
import React, { useState } from 'react'; // 💡 استيراد useState
import { Container, Typography, Paper, Button, TextField, Box, Alert } from '@mui/material'; // 💡 استيراد Alert
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

export default function SignUpPage() {
    const navigate = useNavigate();
    const { signUp } = useAuth(); 

    // 💡 حالات لتخزين مدخلات المستخدم
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // 💡 حالة لرسائل الحالة
    const [message, setMessage] = useState({ text: '', severity: '' });

    const handleSignUp = () => {
        setMessage({ text: '', severity: '' }); // مسح الرسائل السابقة

        if (!fullName || !email || !password || !confirmPassword) {
            setMessage({ text: "Please fill in all fields.", severity: 'error' });
            return;
        }

        if (password !== confirmPassword) {
            setMessage({ text: "Passwords do not match.", severity: 'error' });
            return;
        }
        
        const result = signUp(email, password, fullName);

        if (result.success) {
            setMessage({ text: "Account created successfully! Redirecting to Log In...", severity: 'success' });
            // توجيه المستخدم لصفحة تسجيل الدخول بعد النجاح بثانيتين
            setTimeout(() => navigate('/login'), 2000); 
        } else {
            setMessage({ text: result.message, severity: 'error' });
        }
    };

    return (
        <Container maxWidth="xs" sx={{ pt: 15, pb: 10 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" fontWeight={700} mb={3} textAlign="center">
                    Create Account
                </Typography>
                
                {/* 🚨 عرض رسالة الحالة */}
                {message.text && (
                    <Alert severity={message.severity} sx={{ mb: 2 }}>
                        {message.text}
                    </Alert>
                )}

                <TextField 
                    label="Full Name" 
                    type="text" 
                    fullWidth 
                    margin="normal" 
                    required 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
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
                <TextField 
                    label="Confirm Password" 
                    type="password" 
                    fullWidth 
                    margin="normal" 
                    required 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                
                <Button 
                    variant="contained" 
                    color="secondary" 
                    fullWidth 
                    size="large" 
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSignUp}
                >
                    Sign Up
                </Button>
                
                <Typography variant="body2" textAlign="center">
                    Already have an account? 
                    <Button onClick={() => navigate('/login')} sx={{ textTransform: 'none' }}>
                        Log In
                    </Button>
                </Typography>
            </Paper>
        </Container>
    );
}