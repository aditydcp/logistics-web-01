const bcrypt = require('bcrypt')

function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];  
}

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

function valueOrNull(value, type = "string") {
    if (value) {
        return type === "string" ? `'${value}'` : `${value}`
    }
    return `NULL`
}

function deconstructIfSingle(rowData) {
    if (rowData.length == 1)
        return rowData[0]
    else return rowData
}

async function hashEncrypt(string) {
    return bcrypt.hash(string, 10)
}

module.exports = {
    getOffset,
    emptyOrRows,
    valueOrNull,
    deconstructIfSingle,
    hashEncrypt
}