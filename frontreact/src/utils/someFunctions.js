export const getImage = (image) => {
    return window.location.origin + '/img/' + image;
}

export async function apiGet(endpoint) {
     const result = await fetch(process.env.REACT_APP_SERVER_URI + endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return await result.json();
}

export async function apiPost(endpoint, data) {
     const result = await fetch(process.env.REACT_APP_SERVER_URI + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    return await result.json();
}

export const calculateDaysPast = (date) => {
    const now = new Date();
    const projectDate = new Date(date);
    const diffTime = Math.abs(projectDate - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
}

export const calculateDaysLeft = (date) => {
    const now = new Date();
    const projectDate = new Date(date);
    const diffTime = Math.abs(projectDate - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
}