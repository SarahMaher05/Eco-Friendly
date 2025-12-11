import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    Container, 
    useTheme, 
    TextField, 
    Button, 
    Grid, 
    MenuItem, 
    Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// قائمة بأنواع المواد القابلة لإعادة التدوير
const materialOptions = [
    { value: 'plastics', label: 'Plastics (Bottles, Containers)' },
    { value: 'paper', label: 'Paper & Cardboard' },
    { value: 'metals', label: 'Metals (Cans, Foil)' },
    { value: 'glass', label: 'Glass & Bottles' },
    { value: 'ewaste', label: 'E-Waste (Electronics)' },
    { value: 'textiles', label: 'Textiles & Clothes' },
];

export default function SchedulePickupPage() {
    const theme = useTheme();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        materialType: '',
        date: '',
        time: '',
        notes: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Pickup Scheduled:', formData);
        setIsSubmitted(true);
    };

    const today = new Date();
    today.setDate(today.getDate() + 1);
    const minDate = today.toISOString().split('T')[0];

    const inputBg = theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';

    // 🌟 دالة مساعدة لتطبيق تنسيق الحقول
    const fieldStyle = { bgcolor: inputBg, borderRadius: 1 };

    // 🌟 تنسيق حاوية الصفوف المزدوجة (للاسم والهاتف، وللتاريخ والوقت)
    const dualRowContainer = {
        display: 'flex',
        gap: theme.spacing(3), // المسافة بين الحقلين
        flexDirection: { xs: 'column', sm: 'row' }, // عمودين على الشاشات الكبيرة، عمود واحد على الهاتف
        mb: theme.spacing(3), // مسافة أسفل الصف
    };

    return (
        <Box>
            
            {/* 1. 🖼️ Hero Section */}
            <Box
                sx={{
                    height: { xs: 200, sm: 350 },
                    backgroundImage: `url(/images/recycle-hero.jpg)`, 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    mt: { xs: '100px', sm: '120px', md: '150px' }, 
                    '&::before': { 
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
                    }
                }}
            >
                <Container maxWidth="lg" sx={{ position: 'relative', textAlign: 'center' }}>
                    <Typography 
                        variant="h2" 
                        component="h1" 
                        fontWeight={700}
                        color="#ffffff" 
                        sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
                    >
                        Schedule Your Pickup
                    </Typography>
                </Container>
            </Box>

            {/* 2. 📝 Form Section */}
            <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
                
                <Typography 
                    variant="h5" 
                    color={theme.palette.primary.main}
                    fontWeight={600}
                    mb={4}
                >
                    Choose a convenient time for us to collect your recyclables.
                </Typography>

                {isSubmitted ? (
                    <Alert severity="success" sx={{ p: 3, fontSize: '1.1rem', borderRadius: 2 }}>
                        🎉 **Success!** Your pickup has been scheduled for **{formData.date}** at **{formData.time}**.
                        <Box sx={{ mt: 2 }}>
                            <Button component={Link} to="/" variant="contained" color="primary">
                                Back to Home
                            </Button>
                        </Box>
                    </Alert>
                ) : (
                    <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'left' }}>
                        
                        {/* === A. Contact Details === */}
                        <Typography variant="h5" fontWeight={700} color="text.primary" mb={2}>
                            1. Contact & Location
                        </Typography>

                        {/* 🌟 الصف الأول: الاسم ورقم الهاتف (Flexbox) */}
                        <Box sx={dualRowContainer}>
                            <TextField 
                                fullWidth 
                                required
                                label="Full Name *" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange}
                                variant="filled" 
                                sx={{ ...fieldStyle, flex: 1 }} // flex: 1 لضمان التوزيع المتساوي
                            />
                            <TextField 
                                fullWidth 
                                required
                                label="Phone Number *" 
                                name="phone" 
                                type="tel"
                                value={formData.phone} 
                                onChange={handleChange}
                                variant="filled"
                                sx={{ ...fieldStyle, flex: 1 }} // flex: 1 لضمان التوزيع المتساوي
                            />
                        </Box>

                        {/* Full Address (صف كامل) */}
                        <Box mb={4}>
                            <TextField 
                                fullWidth 
                                required
                                label="Full Pickup Address (Street, Building, Flat) *" 
                                name="address" 
                                multiline
                                rows={3}
                                value={formData.address} 
                                onChange={handleChange}
                                variant="filled"
                                sx={fieldStyle}
                            />
                        </Box>
                        
                        {/* === B. Materials & Timing === */}
                        <Typography variant="h5" fontWeight={700} color="text.primary" mt={3} mb={2}>
                            2. Materials & Timing
                        </Typography>
                        
                        {/* Material Type (صف كامل) */}
                        <Box mb={3}>
                            <TextField
                                fullWidth
                                select
                                required
                                label="Type of Materials *"
                                name="materialType"
                                value={formData.materialType}
                                onChange={handleChange}
                                helperText="Select the primary type of recyclables"
                                variant="filled"
                                sx={fieldStyle}
                            >
                                {materialOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        
                        {/* 🌟 الصف الثاني: التاريخ والوقت (Flexbox) */}
                        <Box sx={dualRowContainer}>
                            <TextField 
                                fullWidth 
                                required
                                label="Preferred Date *" 
                                name="date" 
                                type="date"
                                value={formData.date} 
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ min: minDate }}
                                variant="filled"
                                sx={{ ...fieldStyle, flex: 1 }} // flex: 1 لضمان التوزيع المتساوي
                            />
                            <TextField 
                                fullWidth 
                                required
                                label="Preferred Time Slot *" 
                                name="time" 
                                type="time"
                                value={formData.time} 
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                variant="filled"
                                sx={{ ...fieldStyle, flex: 1 }} // flex: 1 لضمان التوزيع المتساوي
                            />
                        </Box>

                        {/* === C. Additional Notes === */}
                        <Typography variant="h5" fontWeight={700} color="text.primary" mt={3} mb={2}>
                            3. Additional Notes
                        </Typography>
                        
                        {/* Notes (صف كامل) */}
                        <Box mb={5}>
                            <TextField 
                                fullWidth 
                                label="Additional Notes (e.g., Security details, Quantity estimate)" 
                                name="notes" 
                                multiline
                                rows={3}
                                value={formData.notes} 
                                onChange={handleChange}
                                variant="filled"
                                sx={fieldStyle}
                            />
                        </Box>
                        
                        {/* Submit Button */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary" 
                                size="large"
                                sx={{ 
                                    padding: '15px 40px', 
                                    fontSize: '1.2rem',
                                    fontWeight: 700,
                                    borderRadius: 2,
                                    boxShadow: theme.shadows[5], 
                                }}
                            >
                                CONFIRM PICKUP SCHEDULE
                            </Button>
                        </Box>
                    </Box>
                )}
            </Container>
        </Box>
    );
}