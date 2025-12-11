import { Box, Stack, Typography, Container, Button, useTheme } from '@mui/material';
import MuiLink from '@mui/material/Link';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React from 'react';
// 🛑 التعديل الأول: استيراد Autoplay بالإضافة إلى Pagination
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; 
import IconSection from './IconSection'; 

import 'swiper/css';
// يجب أيضًا استيراد CSS الخاص بالـ Autoplay إذا كنت تستخدمينه في ملف خارجي، لكن غالبًا لا يحتاج Autoplay لملف CSS خاص به.
import 'swiper/css/pagination';
import './slider.css'; 


const eco1Img = '/images/OIP (3).jpeg';
const womenImg = '/images/OIPP.jpeg';

// 🌟 صور البطاقات الجانبية الجديدة 🌟
const localBrandsImg = '/images/new-local-brands-image.jpg'; // 💡 المسار الجديد لصورة Local Brands
const recycleNowImg = '/images/OIP (2).jpeg'; // الصورة القديمة (أو مسار جديد)


// 🌿 تحديث البيانات (لا تغيير هنا)
const mySlider = [
  { 
    text: "Eco-Friendly Life", 
    link: eco1Img, 
    caption1: " Better Living", 
    caption2: "Live Sustainably",
    actionText: " Start your sustainable journey today!"
  },

 { 
    text: "Eco-Friendly Life", 
    link: recycleNowImg, 
    caption1: " Better Living", 
    caption2: "Live Sustainably",
    actionText: " Start your sustainable journey today!"
  },
  { 
    text: "Recycle & Earn", 
    link: womenImg,
    caption1: "Earn",
    caption2: "Make a Difference",
    actionText: "Get To Know Our Recycling Program"
  }
];

// 🌿 بيانات البطاقات الجانبية المُعدَّلة 🌿
const sideCardsData = [
    { 
        id: 1,
        title: "Local Brands", 
        caption: "Local products", 
        line1: "Support factories", 
        line2: " In your area", 
        link: "/brands",
        image: localBrandsImg 
    },
    { 
        id: 2,
        title: "Recycle Now", 
        caption: "Earn Eco-Points", 
        line1: "Start with", 
        line2: "Recycling Your Waste", 
        link: "/recycle/schedule", 
        image: recycleNowImg 
    },
];


function Hero() {
  const theme = useTheme();

  return (
    <Container>
      <Box sx={{pt: 2, mt: 2.5, display: "flex", alignItems: "center", gap: 2 }}>
        
        {/* 1. Swiper Carousel */}
        <Swiper
          loop={true}
          pagination={{ dynamicBullets: true }}
          
            // 🛑 التعديل الثاني: إضافة Autoplay إلى قائمة الوحدات 
          modules={[Pagination, Autoplay]} 
            
            // 🛑 التعديل الثالث: إعداد خاصية Autoplay
            autoplay={{
                delay: 4000, // 4000 ميللي ثانية = 4 ثواني بين كل شريحة
                disableOnInteraction: false, // يستمر التشغيل التلقائي حتى بعد تفاعل المستخدم
            }}

          className="mySwiper"
          style={{ flex: 1 }}
        >
          {mySlider.map((item) => (
            <SwiperSlide key={item.link} className="parent-slider" style={{ position: 'relative' }}>
              <img src={item.link} alt={item.text} style={{ width: '100%' }} />
              {/* ... محتوى السلايدر ... */}
              <Box sx={{
                [theme.breakpoints.up('sm')]: {
                  position: "absolute",
                  left: "10%",
                  top: "20%",
                  textAlign: "left"
                },
                [theme.breakpoints.down('sm')]: {
                  pt: 4,
                  pb: 6
                },
                zIndex: 10,
              }}>
                {/* 🌿 محتوى الإعلان الأول (Caption 1) */}
                <Typography 
                    sx={{ 
                        color: theme.palette.text.primary, 
                    }} 
                    variant="h5"
                >
                    {item.caption1}
                </Typography>
                
                {/* 🌿 العنوان الرئيسي (Caption 2) */}
                <Typography 
                    sx={{ 
                        color: theme.palette.text.primary, 
                        fontWeight: 700, 
                        my: 1 
                    }} 
                    variant="h4"
                >
                    {item.caption2}
                </Typography>

                {/* 🌿 السطر الفرعي (Eco-Points / Action) */}
                <Stack direction="row" alignItems="center">
                  <Typography 
                        color={theme.palette.text.secondary} 
                        mr={1} 
                        variant="h5"
                    >
Earn             
                    </Typography>
                  <Typography 
                        color={theme.palette.secondary.main} 
                        variant="h5"
                    >
                        Eco-Points
                    </Typography>
                </Stack>

                {/* 🌿 الرسالة الأخيرة */}
                <Typography 
                    sx={{ 
                        color: theme.palette.text.primary, 
                        fontSize: 24, 
                        my: 1 
                    }} 
                    variant="body1"
                >
                    {item.actionText}
                </Typography>

                {/* 🛑 تغليف زر الإجراء بمكون Link وتحديد المسار */}
                <Link to="/shop/all" style={{ textDecoration: 'none' }}>
                    <Button
                      sx={{
                        px: 5, py: 1.5, mt: 2,
                        backgroundColor: theme.palette.primary.main, 
                        color: "#fff",
                        borderRadius: theme.shape.borderRadius,
                        "&:hover": { bgcolor: theme.palette.primary.dark }
                      }}
                      variant="contained"
                    >
    Shop Now
                    </Button>
                </Link>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 2. البطاقات الجانبية (Side Cards) */}
        <Box sx={{ display: { xs: "none", md: "flex" }, flexDirection: "column", gap: 2, width: "27%" }}>
          {sideCardsData.map((item) => ( 
            <Box key={item.id} sx={{ position: "relative" }}>
              <img width="100%" src={item.image} alt={item.title} /> 
              <Stack sx={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: "31px" }}>
                
                {/* 🌿 Caption */}
                <Typography variant="caption" sx={{ color: theme.palette.text.primary, fontSize: "18px", fontWeight: 700 }}>
                    {item.caption}
                </Typography>
                
                {/* 🌿 Line 1 */}
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, mt: 1 }}>{item.line1}</Typography>
                
                {/* 🌿 Line 2 (بميز بلون الثيم الأساسي) */}
                <Typography variant="h6" sx={{ color: theme.palette.primary.dark }}>{item.line2}</Typography>
                
                {/* 🛑 التعديل السابق: خلفية وسمك الخط في الروابط الجانبية */}
                <MuiLink 
                    component={Link}
                    sx={{ 
                        // خصائص الخلفية والبادينغ
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', // خلفية بيضاء شبه شفافة
                        padding: '3px 8px', // بادينغ حول النص
                        borderRadius: '4px', // حدود دائرية بسيطة
                        width: 'fit-content', // جعل الخلفية على قد النص فقط
                        mt: 1, // مسافة علوية بسيطة لفصلها عن السطر السابق
                        
                        // خصائص الخط
                        color: theme.palette.primary.main, 
                        fontWeight: 700, 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "5px", 
                        transition: 'color 0.3s, background-color 0.3s', 
                        
                        "&:hover": { 
                            color: theme.palette.secondary.main, 
                            backgroundColor: 'rgba(255, 255, 255, 1)', 
                            textDecoration: 'none' 
                        } 
                    }} 
                    to={item.link}
                    underline="none"
                >
                   {item.title === 'Local Brands' ? 'Discover Brands' : 'Learn About the Rewards System'}
                  <ArrowForwardIcon sx={{ fontSize: "15px" }} />
                </MuiLink>
              </Stack>
            </Box>
          ))}
        </Box>
      </Box>

      
      <IconSection />

    </Container>
  );
}

export default Hero;