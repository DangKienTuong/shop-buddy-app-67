

# E-Commerce Platform — Shopee-Inspired, Clean & Modern

## Overview
A full-featured e-commerce marketplace with Shopee-like functionality, clean neutral design, and full compliance with all 8 user stories from your document. Uses your own Supabase for backend.

---

## Pages & Features

### 1. **Home Page**
- Top header with logo, search bar, cart icon (with badge count), and Login/Sign Up buttons (or user menu when logged in)
- Category navigation bar
- Product grid with cards showing image, name, price, and quick "Add to Cart" button
- Sample products pre-loaded across categories (Electronics, Clothing, Home & Kitchen, etc.)

### 2. **Registration Page** (US01)
- Title: "Create an Account"
- Email, Password, Confirm Password fields
- Full validation: email format, password rules (8-20 chars, uppercase, lowercase, number, special char), password match, duplicate email
- Register button disabled when fields empty
- Success → redirect to Login

### 3. **Login Page** (US02)
- Title: "Login"
- Email + Password fields
- Error on invalid credentials: "Invalid email or password"
- Success → redirect to Home

### 4. **Logout** (US03)
- Logout button in user menu
- Clears session, redirects to Login
- Back-button protection (auth guard on protected routes)

### 5. **Product Search** (US04)
- Search bar in header with magnifying glass icon
- Search by product name (text match) or product code/SKU
- Results show product cards with image, price, name
- "No results found" message when nothing matches
- 200-character max on search input

### 6. **Product Detail Page**
- Product image, name, SKU, price, stock status
- Quantity selector with stock limit validation
- "Add to Cart" button (disabled when out of stock)
- Error when quantity exceeds stock

### 7. **Shopping Cart** (US05)
- Cart page listing all items with image, name, price, quantity controls, remove button
- Cumulative addition (same product → quantity +1)
- Stock validation on quantity changes
- "Your cart is empty" message when empty
- Cart badge in header shows total item count
- Checkout button

### 8. **Checkout Page** (US06)
- Title: "Checkout"
- Order summary with items, quantities, calculated total
- Fields: Name, Shipping Address, Phone Number
- Payment method: Cash on Delivery
- Mandatory field validation with error messages
- "Place Order" → Order Confirmation page with unique Order ID

### 9. **My Orders / Order Tracking** (US07)
- Order list sorted by most recent, showing Order ID and status
- Status filter: Pending Confirmation, Shipped, Delivered, Cancelled
- Click order → Order Details with current status
- "Cancel Order" button (enabled for Pending/Shipped, disabled for Delivered)
- Status flow: Pending Confirmation → Shipped → Delivered (no revert)

### 10. **Admin Dashboard** (US08 - Admin role)
- User Management: CRUD operations on user accounts
- Hidden from Customer and Staff roles
- Protected route (403/redirect for unauthorized access)

### 11. **Inventory Management** (US08 - Staff role)
- Product CRUD: create, view, update, delete products with stock quantities
- Order status updates: mark orders as Confirmed, Shipped, Delivered
- Hidden from Customer and Admin roles

---

## Role-Based Access Control (US08)
- **4 roles**: Guest, Customer, Admin, Staff (warehouse)
- Guest: can browse products, redirected to Login when trying to add to cart or access profile
- Customer: shopping features only, sees only own orders, no admin/staff modules
- Admin: User Management module, no Inventory Management
- Staff: Inventory Management + order status updates, no Admin Dashboard
- Direct URL protection: unauthorized access → 403 or Home redirect

---

## Database Schema (Supabase)
- `profiles` — user profile data linked to auth.users
- `user_roles` — role assignments (admin, staff, customer) using enum
- `categories` — product categories
- `products` — name, SKU, description, price, stock, category, images
- `cart_items` — user's cart items with quantities
- `orders` — order header with shipping info, status, total
- `order_items` — line items per order
- RLS policies enforcing role-based data access

---

## Design
- Clean, modern neutral palette (white background, subtle grays, minimal accent color)
- Responsive layout with mobile-friendly navigation
- Consistent card-based product display
- Toast notifications for cart actions and form feedback

