import React from "react"; // يجب استيراد React لاستخدام React.cloneElement
import { Container, Box, Stack, Typography, useTheme, Divider, useMediaQuery } from "@mui/material";

// 🌿 استيراد الأيقونات البيئية والجديدة
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import RecyclingOutlinedIcon from "@mui/icons-material/RecyclingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";


// 💡 تم دمج الكود ليكون ملفاً واحداً (IconSection هو المكون الافتراضي)
export default function IconSection() {

    const isNonMobile = useMediaQuery('(min-width:600px)');

    return (
        <Container sx={{ mt: 3, bgcolor: "#0000" }}>
            <Stack
                // 💡 استخدام Divider فقط على شاشات سطح المكتب
                divider={isNonMobile ? <Divider orientation="vertical" flexItem /> : null}
                sx={{ flexWrap: "wrap" }}
                direction="row"
                alignItems={"center"}
            >
                {/* 🌿 1. شحن صديق للبيئة */}
                <MyBox
                    icon={<LocalShippingOutlinedIcon fontSize="large" />}
                    title={"Zero-Carbon Shipping"}
                    subTitle={"Eco-friendly packaging"}
                />
                
                {/* 🌿 2. المكافآت وإعادة التدوير */}
                <MyBox
                    icon={<RecyclingOutlinedIcon fontSize="large" />}
                    title={"Recycle & Earn"}
                    subTitle={"Get Eco-Points daily"}
                />
                
                {/* 🌿 3. جودة المنتجات البيئية */}
                <MyBox
                    icon={<VerifiedOutlinedIcon fontSize="large" />}
                    title={"Quality Eco-Products"}
                    subTitle={"Certified Organic & Vegan"}
                />
                
                {/* 🌿 4. دعم العلامات التجارية المحلية */}
                <MyBox
                    icon={<StorefrontOutlinedIcon fontSize="large" />}
                    title={"Support Local Brands"}
                    subTitle={"Made in your community"}
                />
            </Stack>
        </Container>
    );
}

// 💡 المكون الفرعي لتنسيق الأيقونات
export function MyBox({ icon, title, subTitle }) {
    const theme = useTheme();
    const isNonMobile = useMediaQuery('(min-width:600px)');

    return (
        <Box
            sx={{
                width: 250,
                display: "flex",
                flexGrow: 1,
                alignItems: "center",
                gap: 3,
                py: 1.6,
                justifyContent: isNonMobile ? "center" : "left"
            }}
        >
            {/* 🌿 تطبيق لون الثيم الأخضر على الأيقونة */}
            {React.cloneElement(icon, { sx: { color: theme.palette.primary.main, fontSize: 35 } })}
            
            <Box>
                <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                    {title}
                </Typography>
                <Typography
                    sx={{ fontWeight: 300, color: theme.palette.text.secondary }}
                    variant="body2"
                >
                    {subTitle}
                </Typography>
            </Box>
        </Box>
    );
}