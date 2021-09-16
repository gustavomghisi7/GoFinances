import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';

jest.mock('expo-auth-session', () => {
    return {
        logInAsync: () => {
            return {
                type: 'success',
                user: {
                    id: 'any_email',
                    email: 'guga-ghisi@hotmail.com',
                    name: 'Gustavo',
                    photo: 'any_photo.png',   
                }
            }
        },
        funcaoSobrescrita: () => {}
    }
});

describe('Auth Hook', () => {
    it('should be able to sign in with Google account existing', async () => {
        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        await act(() => result.current.signInWithGoogle());

        expect(result.current.user.email)
        .toBe('guga-ghisi@hotmail.com');
    });
});