import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { AuthProvider, useAuth } from './auth';
import { loadAsync } from 'expo-auth-session';

jest.mock('expo-auth-session');

describe('Auth Hook', () => {
    it('should be able to sign in with Google account existing', async () => {
        const googleMocked = mocked(loadAsync as any);
        googleMocked.mockReturnValueOnce({
            type: 'success',
            user: {
                id: 'any_id',
                email: 'guga-ghisi@hotmail.com',
                name: 'Gustavo',
                photo: 'any_photo.png',   
            }
        });

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        await act(() => result.current.signInWithGoogle());

        expect(result.current.user.email).toBe('guga-ghisi@hotmail.com');
    });

    it('user should not connect if cancel authentication with Google', async () => {
        const googleMocked = mocked(loadAsync as any);
        googleMocked.mockReturnValueOnce({
            type: 'cancel',
        });

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        await act(() => result.current.signInWithGoogle());

        expect(result.current.user.email).not.toHaveProperty('id');
    });

    it('should be error with incorrectly Google parameters', async () => {
        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        try {
            await act(() => result.current.signInWithGoogle());

        } catch {
            expect(result.current.user.email).toEqual({});
        
        }
        

        
    });
});