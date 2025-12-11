// src/context/AuthContext.jsx (الكود الكامل المُعدل)
import React, { createContext, useContext, useState } from 'react';

// إنشاء الـ Context
const AuthContext = createContext();

// خطاف مخصص لاستخدام الـ Context
export const useAuth = () => useContext(AuthContext);

// مزود الـ Context
export const AuthProvider = ({ children }) => {
    // 💡 حالة تخزن ما إذا كان المستخدم مسجلاً دخوله حاليًا
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    
    // 💡 حالة لمحاكاة تخزين بيانات المستخدمين المسجلين (قاعدة بيانات وهمية)
    const [registeredUsers, setRegisteredUsers] = useState([]);
    
    // 💡 حالة لتخزين بيانات المستخدم الحالي بعد تسجيل الدخول
    const [currentUser, setCurrentUser] = useState(null);

    // ----------------------------------------------------
    // دالة إنشاء حساب (Sign Up)
    // ----------------------------------------------------
    const signUp = (email, password, fullName) => {
        // التحقق مما إذا كان الإيميل موجوداً بالفعل
        const exists = registeredUsers.some(user => user.email === email);
        if (exists) {
            return { success: false, message: "This email is already registered." };
        }

        // إضافة مستخدم جديد (بفرض تشفير الباسوورد)
        const newUser = {
            id: Date.now(),
            email,
            password, // تخزين الباسوورد بشكل نصي لأغراض المحاكاة
            fullName,
            // يمكنك إضافة حقول أخرى مثل "address", "phone", إلخ.
        };
        
        setRegisteredUsers(prev => [...prev, newUser]);
        console.log("Registered Users:", [...registeredUsers, newUser]); // للتأكد من التخزين
        
        return { success: true, message: "Account created successfully!" };
    };


    // ----------------------------------------------------
    // دالة تسجيل الدخول (Log In)
    // ----------------------------------------------------
    const login = (email, password) => {
        const user = registeredUsers.find(
            user => user.email === email && user.password === password
        );

        if (user) {
            setIsLoggedIn(true);
            setCurrentUser(user);
            return { success: true, message: "Login successful." };
        } else {
            // رسالة الخطأ المطلوبة
            return { success: false, message: "Account not found or invalid credentials." };
        }
    };
    
    // ----------------------------------------------------
    // دالة تسجيل الخروج
    // ----------------------------------------------------
    const logout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
    };

    const value = {
        isLoggedIn,
        currentUser,
        login,
        logout,
        signUp, // 👈 إضافة دالة التسجيل
        registeredUsers // يمكن استخدامها لأغراض التصحيح
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};