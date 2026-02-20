import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Authorisation from "./assets/Layouts/Authorisation";
import Navigation from "./components/Navigation/Navigation";
import ImageSlider from "./components/ImageSlider";
import AboutSection from "./components/sections/AboutSection";
import CommunitySection from "./components/sections/CommunitySection";
import SupportSection from "./components/sections/SupportSection";
import Footer from "./components/Footer";
import JumuiyaSection from "./components/sections/jumuiya";
import { useAuth } from "./context/AuthContext";

// Lazy-loaded auth components
const Login = lazy(() => import("./pages/Authorization/Login"));
const Reset = lazy(() => import("./pages/Authorization/Reset"));
const OTPInput = lazy(() => import("./pages/Authorization/OTPInput"));
 
// Fallback component
const FallBack: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Home page component with all sections
const Home: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Show landing page content when NOT logged in */}
        {!user && (
          <>
            <ImageSlider />
            <AboutSection />
            <CommunitySection />
          </>
        )}
        
        {/* Show Jumuiya section only when logged in */}
        {user && <JumuiyaSection />}
        
        {/* Show Support section when NOT logged in */}
        {!user && <SupportSection />}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route element={<Authorisation />}>
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/otp/:regNo" element={<OTPInput />} />
        </Route>
      </>
    )
  );

  return (
    <Suspense fallback={<FallBack />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
