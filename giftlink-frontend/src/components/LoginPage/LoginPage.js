import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (response.ok) {
                // Guardar token
                localStorage.setItem('token', data.token);
                
                // Hacer petición autenticada
                const userResponse = await fetch(`${API_URL}/api/auth/me`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${data.token}`
                    }
                });
                
                const userData = await userResponse.json();
                localStorage.setItem('user', JSON.stringify(userData));
                
                navigate('/home');
            } else {
                setError(data.error || 'Credenciales inválidas');
            }
        } catch (err) {
            setError('Error de conexión');
        }
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Iniciar Sesión</h1>
                <p>Bienvenido de nuevo a GiftLink</p>
                
                {error && <div className="error">{error}</div>}
                
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Tu contraseña"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-submit">Iniciar Sesión</button>
                </form>

                <div className="divider">¿No tienes cuenta?</div>
                <div className="register-link">
                    <a href="/register">Regístrate aquí</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;