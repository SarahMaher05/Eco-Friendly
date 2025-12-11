import React, { createContext, useContext, useState } from 'react';

// 1. إنشاء Context
const CartContext = createContext();

// 2. المكون المزود (Provider) لإدارة حالة السلة
export const CartProvider = ({ children }) => {
    // 💡 حالة سلة التسوق: هي مصفوفة تحتوي على منتجات (كائنات)
    const [cartItems, setCartItems] = useState([]);

    // 🌟 دالة الإضافة إلى السلة (الاسم المستخدم: addToCart)
    const addToCart = (productToAdd) => {
        setCartItems((currentItems) => {
            // التحقق مما إذا كان المنتج موجودًا بالفعل في السلة
            const isExist = currentItems.find(item => item.id === productToAdd.id);

            if (isExist) {
                // إذا كان موجودًا، نزيد الكمية (quantity)
                return currentItems.map(item =>
                    item.id === productToAdd.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // إذا لم يكن موجودًا، نضيفه بكمية 1 (مع التأكد من وجود quantity)
                return [...currentItems, { ...productToAdd, quantity: 1 }];
            }
        });
        console.log(`Product added: ${productToAdd.title}`);
    };

    // 🌟 دالة الإزالة (الاسم المستخدم: removeFromCart)
    const removeFromCart = (id) => {
        setCartItems(currentItems => currentItems.filter(item => item.id !== id));
    };

    // 🌟 دالة لزيادة الكمية (الاسم المستخدم: increaseQuantity)
    const increaseQuantity = (id) => {
        setCartItems(currentItems => 
            currentItems.map(item => 
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // 🌟 دالة لتقليل الكمية (الاسم المستخدم: decreaseQuantity)
    const decreaseQuantity = (id) => {
        setCartItems(currentItems => 
            currentItems.map(item => {
                if (item.id === id) {
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item; 
                }
                return item;
            }).filter(item => item.quantity > 0) 
        );
    };

    // 🗑️ التعديل الرئيسي: إضافة دالة إفراغ السلة
    const clearCart = () => {
        setCartItems([]);
    };

    // حساب إجمالي السلة وعدد العناصر
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);


    // قيمة Context التي سيتم توفيرها لجميع المكونات
    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart, // 👈 تم إضافة clearCart هنا
        cartTotal, 
        cartCount 
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

// 3. خطاف مخصص (Custom Hook) لتسهيل استخدام Context
export const useCart = () => {
    return useContext(CartContext);
};