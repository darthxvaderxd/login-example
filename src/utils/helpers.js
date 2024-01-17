export const isValidEmail = (email) => {
    const pattern = new RegExp(
        '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
        'i'
    );
    return pattern.test(email);
};
