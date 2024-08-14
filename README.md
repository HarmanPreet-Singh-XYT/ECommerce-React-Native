# eCommerce Native App

Welcome to the repository for our full stack eCommerce App built using the PERN stack (PostgreSQL, Express, React, Node.js) and React Native for this. This project demonstrates a comprehensive online shopping experience with a variety of features and pages.

This App is small version of the web version of Ecommerce that can be found here: https://github.com/HarmanPreet-Singh-XYT/E-Commerce
Web deployed version: https://harman-ecommerce.vercel.app/

## Features

### eCommerce Features
- **Categories & Subcategories:** Well-organized categories and subcategories for easy navigation.
- **Products:** Detailed product pages with options for different sizes and colors.
- **Payment Gateway:** Integrated with individual products and cart for secure transactions. ( Stripe )
- **Wishlist:** Option to save favorite products.
- **Special Deals:** Exclusive deals displayed on the homepage.
- **Responsive Design:** Modern and mobile-friendly layout.
- **Quantity Purchase:** Ability to purchase multiple quantities of a product.
- **Homepage Algorithms:** Various algorithms to display products dynamically on the homepage.
- **JWT Session:** Secure user sessions with JWT.
- **Encrypted Passwords:** Enhanced security with password encryption.
- **OAuth Support:** Easy registration and sign-in with OAuth.
- **Payment on Delivery:** Option to pay upon delivery.
- **Order Tracking:** Track orders with a detailed orders page.
- **Order Summary:** Comprehensive order summary page.
- **Custom Checkout:** Tailored checkout experience.
- **Review System:** Post, delete, and edit reviews with a dedicated reviews page.
- **Dynamic Routing:** Smooth navigation with dynamic routing.
- **Active Review & Rating Calculation:** Backend will update variables required for algorithms to work properly, actively calculate rating's & frontend required parameters.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/HarmanPreet-Singh-XYT/ECommerce-React-Native
2. Navigate to the project directory:
   ```sh
   cd Ecommerce
3. Install dependencies for the server:
   ```sh
   npm install
4. Set up environment variables in a .env file.

## Running the Application (Development)

1. Start the Server and ensure you have android emulator installed and prepared or physical device:
   ```sh
   npm run start
2. Select your device, Currently it has only been tested under Android Environment, you may find problems with dependencies that needs to be linked via Mac.
3. The app will be automatically installed and built on your device and you'll be able to run it, don't forget to have your server running.

For Backend server and its configuration, Visit here https://github.com/HarmanPreet-Singh-XYT/E-Commerce.
you'll find guide and server files not limited to backend but also web frontend of this app.

## Contributing

**We welcome contributions! Please fork the repository and submit a pull request.**

## License

**This project is licensed under the MIT License. See the LICENSE file for more details.**

## Contact

**For any questions or feedback, please contact us at harmanpreetsingh@programmer.net**

## Environment Variables (Required before Starting)

- **BACKEND_URL** (Communication link between App and Backend)
- **AUTH_KEY** (Authorization key for Secure Frontend & Backend Communication)
- **JWT_KEY** (JWT Key for Decryption and encryption)
- **STRIPE_PUBLISHABLE_KEY** (Stripe Key for payment Gateway)
- **STRIPE_ID** (Stripe Merchant ID)
