// CREATE A PROMISE
p = new Promise (

    (resolve, reject) => {
        // perform operation
        setTimeout(
         () => {
                // console.info('>>> SQL complete')
                resolve('success!')
                // reject('error!')
         },
         3000 // 3 sec
        )
    }
)

// p = p.then(
//     v => console.info(`Promise resolved: ${v}`)
// )

// p = p.catch(err => {
//     console.error(`Error: ${err}`)
// })

// in then & catch, if return >> resolve, if throw >> reject
p.then(
    v => {console.info(`Promise resolved: ${v}`)
            return v.toUpperCase()// in then() , return will come out as a promise
        }

).then(
    v => {
        console.info(`Second then: ${v}`)
        // return v+v

        // return reject('error!!!!') // ** this is wrong! Use throw
        throw "Error !!!!!"


    }
).then(
    v => {
        console.info(`Third then: ${v}`)
    }
)
.catch(err => {
    console.error(`Error: ${err}`)
    // in here can return something to recover from error, use then to proceed
    // if never return, it return undefined
    return "Recovered from error"
})
.then(
    v => {
        console.info(`Fourth then (after catch): ${v}`)
    }
)

console.info('after new Promise')