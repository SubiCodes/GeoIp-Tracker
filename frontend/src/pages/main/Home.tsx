import { Button } from '@/components/ui/button';
import useUserAuthStore from '@/store/user-authStore';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const logout = useUserAuthStore((state) => state.signoutUser);
  return (
    <div>
      <Button variant={'destructive'} onClick={() => logout(navigate)}>Logout</Button>
    </div>
  )
}

export default Home
