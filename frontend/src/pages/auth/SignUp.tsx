import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import useUserAuthStore from '@/store/user-authStore';
import { BeatLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const signingUpUser = useUserAuthStore((state) => state.signingUpUser);
    const signUpError = useUserAuthStore((state) => state.signUpError);
    const signUpUser = useUserAuthStore((state) => state.signUpUser);


    const handleSubmit = async () => {
        setError(null);
        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError("All fields are required!");
            return;
        };
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        };
        await signUpUser(name, email, password, navigate);
        if (signUpError) {
            setError(signUpError);
        };
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <Card className="border shadow-sm">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                <CardDescription>
                    Enter your details below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                        id="signup-email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <Button onClick={handleSubmit} className="w-full" disabled={signingUpUser}>
                    {signingUpUser ? <BeatLoader size={10} color="#fff" /> : 'Create account'}
                </Button>
                {error && (
                    <div className="mt-2 text-sm text-red-600 bg-red-100 rounded px-3 py-2">
                        {error}
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                <div className="text-sm text-muted-foreground text-center">
                    Already have an account?{' '}
                    <a href="/" className="text-primary hover:underline font-medium">
                        Sign in
                    </a>
                </div>
                <div className="text-xs text-muted-foreground text-center">
                    By creating an account, you agree to our{' '}
                    <a href="#" className="hover:underline">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="hover:underline">
                        Privacy Policy
                    </a>
                </div>
            </CardFooter>
        </Card>
    );
};

export default SignUp;