# SmartStock Frontend

A modern, responsive inventory management system built with React and Tailwind CSS.

## Features

### 🎨 Modern UI/UX
- Clean, professional design with Tailwind CSS
- Responsive layout that works on all devices
- Smooth animations and transitions
- Intuitive navigation with sidebar layout

### 📊 Dashboard
- Real-time inventory statistics
- Stock alerts for low inventory and out-of-stock items
- Quick action buttons for common tasks
- Visual indicators for stock status

### 📦 Product Management
- Add, edit, and delete products
- Advanced search and filtering
- Multiple view modes (table and grid)
- Bulk operations support
- Image preview for products

### 🔐 Authentication
- Secure login and signup
- Role-based access control (Admin, Manager, Staff)
- Form validation and error handling
- Demo credentials for testing

### 📱 Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Optimized for tablets and desktops
- Collapsible sidebar for mobile

## Tech Stack

- **React 19** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout.jsx      # Main layout with sidebar
├── context/            # React context providers
│   └── AuthContext.jsx # Authentication state
├── pages/              # Page components
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Login.jsx       # Login page
│   ├── Signup.jsx      # Signup page
│   ├── ProductsPage.jsx # Product listing
│   └── ProductForm.jsx # Add/edit product form
├── routes/             # Route components
│   └── ProtectedRoute.jsx # Route protection
├── services/           # API service functions
│   └── productService.js
├── utils/              # Utility functions
│   └── api.js         # Axios configuration
└── App.jsx            # Main app component
```

## API Integration

The frontend connects to the Spring Boot backend API:

- **Base URL**: `http://localhost:8080/api`
- **Authentication**: JWT tokens
- **Endpoints**:
  - `/auth/login` - User login
  - `/auth/signup` - User registration
  - `/products` - Product CRUD operations
  - `/users/me` - Current user profile

## Demo Credentials

For testing purposes, you can use these demo accounts:

- **Admin**: admin@smartstock.com / admin123
- **Manager**: manager@smartstock.com / manager123  
- **Staff**: staff@smartstock.com / staff123

## Features Overview

### Dashboard
- Total products count
- Low stock alerts
- Out of stock items
- Total inventory value
- Quick action buttons

### Product Management
- Create new products with validation
- Edit existing products
- Delete products with confirmation
- Search by name, SKU, brand, or category
- Sort by various fields
- Pagination for large datasets
- Grid and table view modes

### User Experience
- Loading states and spinners
- Error handling with user-friendly messages
- Form validation with real-time feedback
- Responsive design for all screen sizes
- Smooth page transitions

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project uses:
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling
- Modern React patterns (hooks, functional components)

## Contributing

1. Follow the existing code style
2. Use meaningful component and variable names
3. Add proper error handling
4. Test on multiple screen sizes
5. Ensure accessibility standards

## License

This project is part of the SmartStock inventory management system.