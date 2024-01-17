/**
 * Allow us to load state from local storage, using util class to allow us
 * to easily change this later on to use something else if desired
 */

export const loadState = (key) => {
    const state = localStorage.getItem(key);
    try {
        if (state !== null) {
            return JSON.parse(state);
        }
    }
    catch (err) {
        // swallow error and return string or undefined
    }
    return state;
};

export const saveState = (key, state) => {
    if (typeof state === 'object') {
        localStorage.setItem(key, JSON.stringify(state));
    } else {
        localStorage.setItem(key, state);
    }
};

export const deleteState = (key) => {
    localStorage.removeItem(key);
};