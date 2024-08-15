// src/utils/auth.js

export function setToken(token) {
    localStorage.setItem('token', token)

    const expirationTime = new Date()
    expirationTime.setHours(expirationTime.getHours() + 23)
    expirationTime.setMinutes(expirationTime.getMinutes() + 40)
    localStorage.setItem('tokenExpiration', expirationTime.toISOString())
}

export function clearToken() {
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiration')
}

export function isTokenValid() {
    const token = localStorage.getItem('token')
    const tokenExpiration = localStorage.getItem('tokenExpiration')

    if (!token || !tokenExpiration) {
        return false
    }

    const now = new Date()
    const expirationDate = new Date(tokenExpiration)

    return now < expirationDate
}
