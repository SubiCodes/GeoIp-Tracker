import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useUserAuthStore from '@/store/user-authStore';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const siginUser = useUserAuthStore((state) => state.sigInUser);
    const signingInUser = useUserAuthStore((state) => state.signingInUser);
    const signInError = useUserAuthStore((state) => state.signInError);

    const handleSubmit = () => {
        // Handle sign in logic here
        console.log('Sign in:', { email, password });
    };

    return (
        <Card className="border shadow-sm">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
                <CardDescription>
                    Enter your email and password to access your account
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a
                            href="#"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            Forgot password?
                        </a>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button onClick={handleSubmit} className="w-full">
                    Sign in
                </Button>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                <div className="text-sm text-muted-foreground text-center">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-primary hover:underline font-medium">
                        Sign up
                    </a>
                </div>
            </CardFooter>
        </Card>
    );
};

export default SignIn
