## Client Management Frontend

A modern CRUD application frontend built with **Next.js**, **Material-UI**, **Tailwind CSS**, and **TanStack Query** for state management and API calls. This application manages client data with full authentication, pagination, CSV export, and user profile features.

### Live Demo
- **Frontend**: [https://client-management-frontend-phi.vercel.app/](https://client-management-frontend-phi.vercel.app/)
- **Backend**: [https://client-management-backend-eg3d.onrender.com/](https://client-management-backend-eg3d.onrender.com/)
- **Login Credentials**:
  - Email: `monir.cse6.bu@gmail.com`
  - Password: `monir.cse6.bu@gmail.com`

*Note: Backend may take ~1 minute to wake up on first load due to Render hosting.*

### 🛠️ Technologies Used
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: Material-UI (MUI) 
- **Styling**: Tailwind CSS
- **Data Fetching**: TanStack Query (React Query)
- **Authentication**: JWT-based with secure token management
- **Deployment**: Vercel
- **TypeScript**: Full type safety

### Features
- **Full CRUD Operations** for client management
- **Complete Authentication System** (Login, Register, Profile)
- **Pagination** for efficient data handling
- **CSV Export** - Download all client data with one click
- **User Profile Page** with account management
- **Responsive Design** following Figma specifications
- **Optimized Performance** with TanStack Query caching
- **Error Handling** and loading states
- **Real-time Updates** with automatic refetching

### Quick Start

#### Prerequisites
- Node.js 18+
- npm or yarn

#### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/zamanmonirbu/client_management_frontend.git
   cd client_management_frontend
   ```

2. **Copy environment variables from .env.example**
   ```bash
   .env.example
   ```

3. **Configure environment**
   Update `.env`:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
   # For production:
   # NEXT_PUBLIC_API_BASE_URL=https://client-management-backend-eg3d.onrender.com/api/v1
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

#### Build for Production
```bash
npm run build
npm start
```

### Development Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### API Integration
- Uses **TanStack Query** for all API interactions
- **Protected routes** with JWT authentication
- **Automatic token refresh** mechanism
- **Error boundaries** and retry logic
- **Optimistic updates** for better UX

### Styling
- **Material-UI** components for consistent design
- **Tailwind CSS** for utility-first styling

### Backend Repository
[https://github.com/zamanmonirbu/client_management_backend](https://github.com/zamanmonirbu/client_management_backend)

### 📄 License
This project is for demonstration purposes and follows the company's coding test requirements.

### Acknowledgments
- Built for Software Engineer (Node.js) position coding test
- Design reference: [Figma Design](https://www.figma.com/design/xrb43ILns2cArgkRnW1t2k/Test)
- Special thanks to the development team for the opportunity

---

⭐ **Star this repository if you found it helpful!**

---

*Built with by Moniruzzaman*  
*For coding test submission - Software Engineer (Node.js)*