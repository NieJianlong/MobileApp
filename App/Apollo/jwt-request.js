import qs from 'qs'
import axios from 'axios'
import * as localStorage from './local-storage'

/**
 * we first obtain the jwt, then store in localstorage, then 
 * private appoloo client will read from local strogae for auth requests
 * 
 */
const LOGIN_ENDPOINT = 'to do'

// Axios automatically serialize object to JSON
export const runTokenFlow = async (userId, password) => {

    let loginRequest = { name: userId, password: password }
    let headers = { 'Content-Type': 'application/json' }


    let ret = await axios.post(LOGIN_ENDPOINT, loginRequest, headers)
        .then(ret => ret)
        .catch(err => {
            console.log(`${err}`)
            // to do error conditions

        })

    await localStorage.setLocalStorageValue(ret)

    return ret

}

// mock api testing
export const runMockTokenFlow = async (userId, password) => {

    let loginRequest = { name: userId, password: password }
    let headers = { 'Content-Type': 'application/json' }


    let ret = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('somejwt');
        }, 300);
    })

    return ret

}



export const runMockRegisterFlow = async (regUser) => {
    let headers = { 'Content-Type': 'application/json' }

    let MockRegisterJsonReponse = '{"registerOk":"OK"}'

    let ret = new Promise((resolve, reject) => {
        console.log(JSON.stringify(regUser))
        setTimeout(() => {
            resolve(MockRegisterJsonReponse);
        }, 300);
    })

    return ret


}

export const runMockOTPFlow = async (otpCode) => {
    let headers = { 'Content-Type': 'application/json' }

    let MockOTPJsonReponse = {"validateOK":"OK"}

    let ret = new Promise((resolve, reject) => {
        console.log(JSON.stringify(otpCode))
        setTimeout(() => {
            resolve(MockOTPJsonReponse);
        }, 300);
    })

    return ret
 

}
 