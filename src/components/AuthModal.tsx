import { useState, useEffect } from "react";
import { X, Mail, Lock, Eye, EyeOff, Phone, ArrowLeft, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup' | 'forgot-password';
}

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  resetEmail: string;
  userType: 'guest' | 'host';
}

interface Errors {
  [key: string]: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot-password' | 'reset-sent'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    resetEmail: '',
    userType: 'guest'
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (mode === 'forgot-password') {
      if (!formData.resetEmail) {
        newErrors.resetEmail = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.resetEmail)) {
        newErrors.resetEmail = 'Please enter a valid email';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (mode === 'signup' && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (mode === 'signup') {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.birthDate) {
        newErrors.birthDate = 'Birth date is required';
      } else {
        const today = new Date();
        const birthDate = new Date(formData.birthDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          // hasn’t had birthday yet this year
          age--;
        }
        if (age < 18) newErrors.birthDate = 'You must be at least 18';
      }

      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?\d{7,15}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        if (mode === 'forgot-password') {
          // Simulate API call for password reset
          console.log('Password reset requested for:', formData.resetEmail);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
          setMode('reset-sent');
        } else {
          console.log(`${mode} submitted:`, formData);
          onClose();
        }
      } catch (error) {
        console.error('Submit error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleForgotPassword = () => {
    setMode('forgot-password');
    setErrors({});
  };

  const handleBackToLogin = () => {
    setMode('login');
    setErrors({});
  };

  const switchMode = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    setErrors({});
  };

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setFormData({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        phone: '',
        resetEmail: '',
        userType: 'guest'
      });
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Log in';
      case 'signup': return 'Sign up';
      case 'forgot-password': return 'Reset your password';
      case 'reset-sent': return 'Check your email';
      default: return 'Authentication';
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case 'login': return 'Welcome back';
      case 'signup': return 'Finish signing up';
      case 'forgot-password': return 'Enter your email and we\'ll send you a link to reset your password';
      case 'reset-sent': return 'We\'ve sent a password reset link to your email';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {(mode === 'forgot-password' || mode === 'reset-sent') && (
              <button
                onClick={handleBackToLogin}
                className="p-1 hover:bg-gray-100 rounded-full transition"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h2 className="text-xl font-semibold text-gray-900">
              {getTitle()}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {mode === 'reset-sent' ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <CheckCircle size={64} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {getSubtitle()}
              </h3>
              <p className="text-gray-600 mb-2">
                We sent a password reset link to:
              </p>
              <p className="font-semibold text-gray-900 mb-6">
                {formData.resetEmail}
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setMode('forgot-password');
                    setFormData(prev => ({ ...prev, resetEmail: '' }));
                  }}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                  Try different email
                </button>
                <button
                  onClick={handleBackToLogin}
                  className="w-full text-red-500 hover:underline font-medium"
                >
                  Back to login
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {getSubtitle()}
              </h3>
              
              <div className="space-y-4">
                {mode === 'forgot-password' ? (
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.resetEmail}
                      onChange={(e) => handleInputChange('resetEmail', e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                        errors.resetEmail ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.resetEmail && (
                      <p className="text-red-500 text-sm mt-1">{errors.resetEmail}</p>
                    )}
                  </div>
                ) : (
                  <>
                    {mode === 'signup' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            I want to:
                          </label>
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <button
                              type="button"
                              onClick={() => handleInputChange('userType', 'guest')}
                              className={`p-4 border-2 rounded-lg text-left transition ${
                                formData.userType === 'guest'
                                  ? 'border-red-500 bg-red-50 text-red-700'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="font-semibold">Book a stay</div>
                              <div className="text-sm text-gray-600 mt-1">Find and book unique accommodations</div>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleInputChange('userType', 'host')}
                              className={`p-4 border-2 rounded-lg text-left transition ${
                                formData.userType === 'host'
                                  ? 'border-red-500 bg-red-50 text-red-700'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="font-semibold">Host my place</div>
                              <div className="text-sm text-gray-600 mt-1">Earn money by hosting guests</div>
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <input
                              type="text"
                              placeholder="First name"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange('firstName', e.target.value)}
                              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                                errors.firstName ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.firstName && (
                              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                            )}
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="Last name"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange('lastName', e.target.value)}
                              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                                errors.lastName ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.lastName && (
                              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Birthday
                          </label>
                          <input
                            type="date"
                            value={formData.birthDate}
                            onChange={(e) => handleInputChange('birthDate', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                              errors.birthDate ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.birthDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            To sign up, you need to be at least 18.
                          </p>
                        </div>

                        <div className="relative">
                          <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                          <input
                            type="tel"
                            placeholder="Phone number"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                              errors.phone ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                          )}
                        </div>
                      </>
                    )}

                    {/* Email input */}
                    <div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Password input */}
                    <div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                      )}
                    </div>
                  </>
                )}

                {/* Agreement text for signup */}
                {mode === 'signup' && (
                  <p className="text-xs text-gray-600">
                    By selecting Agree and continue, I agree to Nook's{' '}
                    <a href="#" className="text-red-500 hover:underline">
                      Terms of Service
                    </a>
                    ,{' '}
                    <a href="#" className="text-red-500 hover:underline">
                      Payments Terms of Service
                    </a>
                    , and{' '}
                    <a href="#" className="text-red-500 hover:underline">
                      Nondiscrimination Policy
                    </a>{' '}
                    and acknowledge the{' '}
                    <a href="#" className="text-red-500 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    isSubmitting 
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {mode === 'forgot-password' ? 'Sending...' : 'Submitting...'}
                    </div>
                  ) : (
                    <>
                      {mode === 'login' && 'Log in'}
                      {mode === 'signup' && 'Agree and continue'}
                      {mode === 'forgot-password' && 'Send reset link'}
                    </>
                  )}
                </button>
              </div>

              {/* Forgot password link for login mode */}
              {mode === 'login' && (
                <div className="text-center mt-4">
                  <button
                    onClick={handleForgotPassword}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Toggle login/signup */}
              {(mode === 'login' || mode === 'signup') && (
                <div className="text-center mt-6 text-sm">
                  {mode === 'login' ? (
                    <span>
                      Don't have an account?{' '}
                      <button
                        onClick={() => switchMode('signup')}
                        className="text-red-500 hover:underline font-medium"
                      >
                        Sign up
                      </button>
                    </span>
                  ) : (
                    <span>
                      Already have an account?{' '}
                      <button
                        onClick={() => switchMode('login')}
                        className="text-red-500 hover:underline font-medium"
                      >
                        Log in
                      </button>
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
