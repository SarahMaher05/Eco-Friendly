import React, { useState } from 'react'; // 🛑 التعديل 1: استيراد useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header1 from './components/header/Header1.jsx';
import Header2 from './components/header/Header2.jsx'; // 🛑 Header2 سيستقبل دالة التحديث
import Header3 from './components/header/Header3.jsx';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Box } from "@mui/material";

// 🌿 استيراد الأقسام والمكونات الأساسية
import Hero from './components/hero/Hero.jsx';
import Main from './components/Main/main.jsx'; 
import Footer from './components/Footer/footer.jsx';
import ImpactSection from './components/ImpactSection'; 
import BlogSection from './components/BlogSection';
import ScrollToTop from './components/scroll/ScrollToTop.jsx';

// 🌟 استيراد الـ Contexts
import { CartProvider } from './context/CartContext.jsx'; 
import { AuthProvider } from './context/AuthContext.jsx'; 

// 📌 استيراد الصفحات الجديدة والقديمة
import LoginPage from './pages/LoginPage.jsx';       
import SignUpPage from './pages/SignUpPage.jsx';     
import CheckoutPage from './pages/CheckoutPage.jsx';   
import OrderConfirmationPage from './pages/OrderConfirmationPage.jsx'; 
import BrandsPage from './pages/BrandsPage.jsx'; 
import BlogIndexPage from './pages/BlogIndexPage.jsx'; 
import NonToxicCleaningBlog from './pages/NonToxicCleaningBlog.jsx';
import BabyProductsBlog from './pages/BabyProductsBlog.jsx'; 
import ToiletPaperBlog from './pages/ToiletPaperBlog.jsx'; 
import PetProductsBlog from './pages/PetProductsBlog.jsx'; 
import SchedulePickupPage from './pages/SchedulePickupPage.jsx'; 
import EcoPointsBalancePage from './pages/EcoPointsBalancePage.jsx'; 
import RedeemPointsPage from './pages/RedeemPointsPage.jsx'; 
import AllEcoProductsPage from './pages/AllEcoProductsPage.jsx'; // 🛑 سيستقبل خاصية البحث
import SustainableSalesPage from './pages/SustainableSalesPage.jsx'; 
import ShoppingCartPage from './pages/ShoppingCartPage.jsx'; 
import ProfilePage from './pages/ProfilePage.jsx'; 


// 🏠 مكون الصفحة الرئيسية
const HomePage = ({ theme }) => (
  <Box bgcolor={theme.palette.bg.main}>
    <Hero/> 
    <ImpactSection />
    <Main /> 
    <BlogSection /> 
  </Box>
);


function App() {

  const [theme, colorMode] = useMode();
    // 🛑 التعديل 2: تعريف حالة البحث
    const [searchTerm, setSearchTerm] = useState('');

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        <AuthProvider>
          <CartProvider>
            <Router>
              
              <Header1 />
              {/* 🛑 التعديل 3: تمرير وظيفة تحديث حالة البحث إلى Header2 */}
              <Header2 onSearchChange={setSearchTerm} /> 
              <Header3 />
              
              <Routes>
                  
                  <Route path="/" element={<HomePage theme={theme} />} />
                  
                  {/* 🔑 مسارات التوثيق والملف الشخصي */}
                  <Route path="/login" element={<LoginPage />} />       
                  <Route path="/signup" element={<SignUpPage />} />     
                  <Route path="/profile" element={<ProfilePage />} /> 

                  
                  {/* 🛒 مسارات الشراء */}
                  <Route path="/cart" element={<ShoppingCartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} /> 
                  <Route path="/order-confirmation" element={<OrderConfirmationPage />} /> 

                  {/* 3. مسار صفحة العلامات التجارية */}
                  <Route path="/brands" element={<BrandsPage />} />

                  {/* 🛑 التعديل 4: تمرير قيمة البحث إلى صفحة المنتجات */}
                  <Route path="/shop/all" element={<AllEcoProductsPage searchTerm={searchTerm} />} />

                  {/* 5. مسار المبيعات (Sustainable Sales) */}
                  <Route path="/shop/sale" element={<SustainableSalesPage />} />

                  {/* 6. مسار جدولة الاستلام (Recycle & Earn) */}
                  <Route path="/recycle/schedule" element={<SchedulePickupPage />} /> 

                  {/* 7. مسار رصيد النقاط البيئية (Eco-Points Balance) */}
                  <Route path="/rewards/balance" element={<EcoPointsBalancePage />} />

                  {/* 8. مسار استرداد النقاط (Redeem Points) */}
                  <Route path="/redeem" element={<RedeemPointsPage />} />
                  
                  {/* 9. المسار العام للمدونة (صفحة فهرس المقالات) */}
                  <Route path="/blog" element={<BlogIndexPage />} />
                  
                  {/* 10. مسارات مقالات المدونة */}
                  <Route path="/blog/non-toxic-cleaning-guide" element={<NonToxicCleaningBlog />} />
                  <Route path="/blog/baby-products-guide" element={<BabyProductsBlog />} />
                  <Route path="/blog/toilet-paper-guide" element={<ToiletPaperBlog />} />
                  <Route path="/blog/pet-products-guide" element={<PetProductsBlog />} />
                  
              </Routes>
            
              <Footer /> 
              <ScrollToTop />
          
            </Router>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
  
}

export default App;