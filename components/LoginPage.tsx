import React, { useState, useRef, useEffect } from 'react';
import type { Theme } from '../types';
import GoogleIcon from './icons/GoogleIcon';
import GithubIcon from './icons/GithubIcon';
import GitlabIcon from './icons/GitlabIcon';
import BitbucketIcon from './icons/BitbucketIcon';
import AestheticBackground from './AestheticBackground';
import CipherSchoolsLogo from './icons/CipherSchoolsLogo';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import PencilIcon from './icons/PencilIcon';
import CheckIcon from './icons/CheckIcon';
import SpinnerIcon from './icons/SpinnerIcon';

// --- Mock API Layer ---
const mockServerSideOtpStorage: { [email: string]: string } = {};

const sendOtpApi = async (email: string): Promise<{ success: boolean; message: string; generatedOtp: string }> => {
    console.log(`[MOCK API] Sending OTP to ${email}...`);
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    mockServerSideOtpStorage[email] = randomOtp;
    console.log(`[MOCK API] Stored OTP for ${email}: ${randomOtp}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: 'OTP sent successfully.', generatedOtp: randomOtp };
};

const verifyOtpApi = async (email: string, otp: string): Promise<{ success: boolean; token?: string; message: string; isNewUser?: boolean }> => {
    console.log(`[MOCK API] Verifying OTP "${otp}" for ${email}...`);
    const expectedOtp = mockServerSideOtpStorage[email];
    console.log(`[MOCK API] Expected OTP for ${email}: ${expectedOtp}`);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (expectedOtp && otp === expectedOtp) {
        delete mockServerSideOtpStorage[email];
        const isNewUser = !localStorage.getItem(`user_exists_${email}`);
        if(isNewUser) {
            localStorage.setItem(`user_exists_${email}`, 'true');
        }
        return { success: true, token: 'fake-jwt-token-for-demo', message: 'Login successful.', isNewUser };
    } else {
        return { success: false, message: 'Invalid or expired OTP. Please try again.' };
    }
};


interface LoginPageProps {
    onLoginSuccess: (email: string) => void;
    theme: Theme;
    onToggleTheme: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, theme, onToggleTheme }) => {
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [resendCountdown, setResendCountdown] = useState(30);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (step === 'otp' && resendCountdown > 0 && !isLoading) {
            timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [step, resendCountdown, isLoading]);

    useEffect(() => {
        if (step === 'otp') {
            otpInputsRef.current[0]?.focus();
        }
    }, [step]);
    
    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        const submittedEmail = (formData.get('email') as string).trim();
        
        if (submittedEmail) {
            const response = await sendOtpApi(submittedEmail);
            
            if (response.success) {
                setEmail(submittedEmail);
                setGeneratedOtp(response.generatedOtp);
                setStep('otp');
                setResendCountdown(30);
            } else {
                setError(response.message);
            }
        }
        setIsLoading(false);
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (!/^[0-9]$/.test(value) && value !== '') return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== '' && index < 5) {
            otpInputsRef.current[index + 1]?.focus();
        }
    };
    
    const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            otpInputsRef.current[index - 1]?.focus();
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const code = otp.join('');

        const response = await verifyOtpApi(email, code);

        if (response.success) {
            console.log('Authentication successful. Received token:', response.token);
            if (response.isNewUser) {
                setShowSuccess(true);
                setTimeout(() => {
                    onLoginSuccess(email);
                }, 2000);
            } else {
                onLoginSuccess(email);
            }
        } else {
            setError(response.message);
            setOtp(new Array(6).fill(''));
            otpInputsRef.current[0]?.focus();
        }
        setIsLoading(false);
    };
    
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, 6);
        if (/^[0-9]{6}$/.test(pasteData)) {
            const newOtp = pasteData.split('');
            setOtp(newOtp);
            otpInputsRef.current[5]?.focus();
        }
    };

    const handleResendCode = async () => {
        if (isLoading || resendCountdown > 0) return;
        setError('');
        setIsLoading(true);
        
        const response = await sendOtpApi(email);
        
        if(response.success){
            setGeneratedOtp(response.generatedOtp);
            setResendCountdown(30);
            setOtp(new Array(6).fill(''));
            otpInputsRef.current[0]?.focus();
        } else {
            setError("Failed to resend OTP. Please try again later.");
        }
        setIsLoading(false);
    };
    
    const handleSocialLogin = () => {
        onLoginSuccess('social-user@example.com');
    };

    const socialProviders = [
        { name: 'Bitbucket', icon: BitbucketIcon },
        { name: 'GitHub', icon: GithubIcon },
        { name: 'GitLab', icon: GitlabIcon },
        { name: 'Google', icon: GoogleIcon },
    ];

    const renderEmailStep = () => (
        <>
            <div className="flex flex-col items-center">
                <CipherSchoolsLogo className="h-10 w-auto mb-4" />
                <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white tracking-tight">
                    Continue to CipherStudio
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
                    Sign in or create an account to get started.
                </p>
            </div>
            
            <form className="space-y-4" onSubmit={handleEmailSubmit}>
                <div>
                    <label htmlFor="email-auth" className="sr-only">Email address</label>
                    <input
                        id="email-auth"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white bg-white/50 dark:bg-slate-700/50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Enter your email address"
                    />
                </div>
                <div>
                     <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative w-full flex justify-center items-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-slate-900 hover:bg-slate-800 dark:text-slate-900 dark:bg-white dark:hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:focus:ring-slate-300 dark:ring-offset-slate-800 disabled:opacity-50"
                    >
                         {isLoading && <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />}
                        Continue with Email
                    </button>
                </div>
            </form>

            <p className="mt-4 text-xs text-center text-slate-500 dark:text-slate-400">
                By continuing, you agree to the <a href="#" className="underline hover:text-slate-800 dark:hover:text-slate-200">Terms of Service</a> and <a href="#" className="underline hover:text-slate-800 dark:hover:text-slate-200">Privacy Policy</a>.
            </p>

            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300 dark:border-slate-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">or</span>
                </div>
            </div>

            <div className="space-y-3">
                {socialProviders.map(provider => (
                    <button
                        key={provider.name}
                        onClick={handleSocialLogin}
                        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        <provider.icon className="w-5 h-5" />
                        <span>Continue with {provider.name}</span>
                    </button>
                ))}
            </div>
        </>
    );

    const renderOtpStep = () => (
        <form onSubmit={handleOtpSubmit} className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Check your email
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                We've sent a 6-digit code to:
            </p>
            <div className="my-4 flex items-center justify-center gap-2 text-sm text-slate-800 dark:text-slate-300 font-medium">
                <span>{email}</span>
                <button type="button" disabled={isLoading} onClick={() => { setStep('email'); setOtp(new Array(6).fill('')); setError(''); }} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50">
                    <PencilIcon className="w-4 h-4" />
                </button>
            </div>
            
            <div className="my-4 p-3 bg-yellow-100 dark:bg-yellow-900/50 border border-yellow-300 dark:border-yellow-700 rounded-md text-sm text-yellow-800 dark:text-yellow-200">
                <p>This is a demo and no email is actually sent.</p>
                <p>Please use the code <strong className="font-bold tracking-widest">{generatedOtp}</strong> to proceed.</p>
            </div>

            <div className="flex justify-center gap-2 mb-4" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={el => { otpInputsRef.current[index] = el; }}
                        type="tel"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        className="w-10 h-12 text-center text-lg font-semibold rounded-md border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={isLoading}
                    />
                ))}
            </div>
            
             {error && <p className="text-sm text-red-500 dark:text-red-400 mb-4">{error}</p>}

            <div className="text-sm text-slate-500 dark:text-slate-400">
                Didn't receive a code?{' '}
                {resendCountdown > 0 ? (
                    <span>Resend in {resendCountdown}s</span>
                ) : (
                    <button type="button" onClick={handleResendCode} disabled={isLoading} className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        Resend
                    </button>
                )}
            </div>

            <div className="mt-8">
                <button
                    type="submit"
                    disabled={isLoading || otp.join('').length !== 6}
                    className="w-full flex justify-center items-center py-2.5 px-4 text-sm font-semibold rounded-md text-slate-900 bg-white hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300 dark:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading && <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />}
                    Verify and Continue
                </button>
            </div>
            <div className="mt-4">
                 <button type="button" onClick={() => { setStep('email'); setError(''); }} className="text-sm font-medium text-slate-600 hover:text-slate-500 dark:text-slate-400 dark:hover:text-slate-300">
                    Use another method
                 </button>
            </div>
        </form>
    );

    const renderSuccessView = () => (
        <div className="text-center animate-fade-in-up">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/50 mb-4">
                <CheckIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Registration Successful!
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Redirecting you to your dashboard...
            </p>
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center font-sans p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
            <AestheticBackground />
            <div className="absolute top-4 right-4 z-20">
                <button
                    onClick={onToggleTheme}
                    className="p-2 rounded-full bg-slate-200 dark:bg-slate-700/50 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                    title="Toggle Theme"
                >
                    {theme === 'light' ? <MoonIcon className="w-5 h-5 text-slate-800" /> : <SunIcon className="w-5 h-5 text-white" />}
                </button>
            </div>
            <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700">
                {showSuccess ? renderSuccessView() : (
                    step === 'email' ? renderEmailStep() : renderOtpStep()
                )}
            </div>
        </div>
    );
};

export default LoginPage;
