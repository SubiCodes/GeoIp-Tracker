import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const SignUp: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () => {
        // Handle sign up logic here
        console.log('Sign up:', { name, email, password, confirmPassword });
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
                <Button onClick={handleSubmit} className="w-full">
                    Create account
                </Button>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                <div className="text-sm text-muted-foreground text-center">
                    Already have an account?{' '}
                    <a href="#" className="text-primary hover:underline font-medium">
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