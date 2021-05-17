 

/**
 *  pinCode  provinceState townCity villageArea houseNumber flat landMark
 */
export const mapGQLAddressToDelivery = (data) => {
 
    let address = ''
    if (data.provinceState) {
        address = data.provinceState
    }
    else if (data.townCity) {
        address = address + " " + data.townCity
    }
    if (data.pinCode) {
        address = address + " " + data.pinCode
    }

    return address

}

export const mapGQLAddressToLine2 = (data) => {
    let address = ''

    if (data.villageArea) {
        address = address + " " + data.villageArea
    }

    if (data.houseNumber) {
        address = address + " " + data.houseNumber
    }

    if (data.flat) {
        address = address + " " + data.flat
    }

    if (data.landMark) {
        address = address + " " + data.landMark
    }

    return address

}