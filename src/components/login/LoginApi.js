const hostname = process.env.REACT_APP_HOSTNAME ?? 'reqres.in';
const protocol = process.env.REACT_APP_PROTOCOL ?? 'https';
const api = {
    login: 'api/login',
};

export const handleLogin = async (email, password) => {
    const params = {
        email,
        password,
    };

    const url = `${protocol}://${hostname}/${api.login}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        throw Error(response.error);
    }

    return response.json();
};
