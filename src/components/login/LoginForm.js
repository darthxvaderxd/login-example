import React, { useMemo, useState } from 'react';
import { loadState, saveState } from '../../utils/storage';
import { isValidEmail } from '../../utils/helpers';
import { handleLogin } from './LoginApi';
import '../../css/LoginForm.css';

export const LoginForm = () => {
    // user data
    const [loginData, setLoginData] = useState(loadState('loginData'));
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // possible errors
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    // awaiting login
    const [loading, setLoading] = useState(false);

    // detect a logged in user
    const userLoggedIn = useMemo(() => {
        return !!loginData?.token;
    }, [loginData]);

    // verify this is an email address
    const validateEmail = (email) => {
        if (!isValidEmail(email)) {
            setEmailError('Please enter a valid email');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    // verify a password has been entered
    const validatePassword = (password) => {
        if (password.length < 1) {
            setPasswordError('Please enter a password');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    // handle the login result
    const doLogin = async () => {
        // we need to validate the email and password first
        if (!validateEmail(email) || !validatePassword(password)) {
            return;
        }

        // we are loading
        setLoading(true);

        // catch errors to make a better user experience
        try {
            const response = await handleLogin(email, password);

            // we have a valid login
            if (response?.token) {
                const updatedUserData = {
                    ...response,
                    email,
                };

                saveState('loginData', updatedUserData);
                setLoginData(updatedUserData);
                setLoginError('');

                // return so we don't show the error message
                setLoading(false);
                return;
            }
        } catch (error) {
            console.log('error => ', error);
        }

        setLoading(false);
        setLoginError('Invalid login');
    }

    // update the email and validate it
    const updateEmail = (e) => {
        setEmail(e.target.value);
        validateEmail(e.target.value);
    };

    // update the password and validate it
    const updatePassword = (e) => {
        setPassword(e.target.value);
        validatePassword(e.target.value);
    };

    return (
        <>
            {!userLoggedIn && (
                <div className="LoginForm">
                    <div className="LoginForm__form">
                        <h2>Please login</h2>
                        {loginError && (
                            <div className="LoginForm__error" data-testid="login-error">
                                {loginError}
                            </div>
                        )}
                        <div className="LoginForm__row">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                onChange={updateEmail}
                                data-testid="form-username"
                            />
                            {emailError && (
                                <div className="LoginForm__error" data-testid="email-error">
                                    {emailError}
                                </div>
                            )}
                        </div>
                        <div className="LoginForm__row">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                onChange={updatePassword}
                                data-testid="form-password"
                            />
                            {passwordError && (
                                <div className="LoginForm__error" data-testid="password-error">
                                    {passwordError}
                                </div>
                            )}
                        </div>
                        <div className="LoginForm__row right">
                            <button
                                onClick={doLogin}
                                disabled={loading}
                                data-testid='login-button'
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {userLoggedIn && (
                <div className="LoginForm__logged_in">
                    <div data-testid="login-text">
                        <span>
                            Logged in as {loginData.email} &nbsp;
                        </span>
                        <button
                            onClick={() => {
                                saveState('loginData', {});
                                setLoginData({});
                            }}
                            data-testid='logout-button'
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};