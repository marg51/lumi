const { map, every, some } = require("lodash")
const assertion = require("assertion")

// module.exports = (object1, object2) => {
//     try {
//         assertion.has(object1, object2)
//         return true
//     } catch (e) {
//         return false
//     }
// }

function check(object1, object2) {
    switch (getType(object1)) {
        case "object":
            checkObject(object1, object2)
    }
}

function getType(value) {
    if (value instanceof Array) return "array"
    if (value instanceof RegExp) return "regex"
    return typeof value
}

function checkObject(object1, object2, currentPath = []) {
    map(object1, (value, key) => {
        if (!object2.hasOwnProperty(key)) {
            return newError(value, object2[key], "key not found", currentPath)
        }

        if (getType(value) == "object") {
            if (getType(object2[key]) == "object")
                return checkObject(value, object2[key], [...currentPath, key])

            return checkComplexObject(value, object2[key], [...currentPath, key])
        } else if (getType(object2[key]) == "array") {
            return checkArray(value, object2[key], [...currentPath, key])
        } else if (getType(value) == "regex") {
            if (!value.test(object2[key]))
                return newError(
                    value,
                    object2[key],
                    "regex didn't match",
                    currentPath
                )
        } else {
            if (value != object2[key])
                return newError(value, object2[key], "", currentPath)
        }
    })
}

function checkArray(array1, array2, currentPath) {
    if (array1.length != array2.length)
        return newError(array1, array2, "", currentPath)

    map(array1, (value, idx) => {
        if (getType(value) === "regex") {
            if (!value.test(array2[idx]))
                return newError(array1, array2, "regex failed", [...currentPath, idx])
            return
        }
        if (value != array2[idx])
            return newError(array1, array2, "", [...currentPath, idx])
    })
}

function checkComplexObject(object, something, currentPath) {
    if (object.$in) {
        if (object.$in.indexOf(something) === -1)
            return newError(object.$in, something, "$in", currentPath)

        return
    }

    if (object.$exclude) {
        if (object.$exclude.indexOf(something) > -1)
            return newError(object.$in, something, "$in", currentPath)

        return
    }

    if (object.$contains) {
        return arrayContains(something, object.$contains)
    }

    return newError(object, something, currentPath)
}

function arrayContains(array, array2, currentPath) {

    if (getType(array2) != "array")
        console.error(array2, "isn't an array, $contains")
    array2.map(
        (value, idx) => {
            if (getType(value) == "regex") {
                if (!some(array, expectedValue => value.test(expectedValue)))
                    return newError(array, array2, value, [...currentPath, idx])
                return
            }

            if (array.indexOf(value) === -1)
                return newError(array, array2, value, [...currentPath, idx])
        }
    )
}

function newError(currentValue, expectedValue, message, currentPath) {
    throw new Error("error at " + currentPath.join(" "))
}


module.exports = (object1, object2) => {
    try {
        check(object2, object1)
        return true
    } catch (e) {
        return false
    }
}
