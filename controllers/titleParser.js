const Todo = require('../models/Todo')

module.exports = {
    parse: async function (titles, response) {
        //typo control: remove extra spaces
        titles.forEach((title, i) => titles[i] = title.replace(/\s\s+/g, ' ')) 
        //remove underscores
        titles.forEach((title, i) => titles[i] = title.split('_').join(' ')) 
        //remove .docx suffix
        titles.forEach((title, i) => titles[i] = title.split('.d')[0]) 

        let splitTitles = titles.map((title) => {
            const regex = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+$/
            //split into single words
            return title.split(' ') 
            //typo control: remove single pieces of punctuation
                        .filter(word => !regex.test(word)) 
            }) 
        
        //store length values in a separate array and remove from splitTitles
        let lengthArr = []

        for (let i = 0; i < splitTitles.length; i++) {
            for (let j = 0; j < splitTitles[i].length; j++) {
             if (splitTitles[i][j].includes('(')) {
                lengthArr.push(splitTitles[i].splice(j, 1))
                }
            }
         }

        //determine whether titles have one our two ISCIs. Store in separate arrays: 

        let singleISCItitles = [] //<- titles that contains one ISCI 
        let doubleISCItitles = [] //<- titles that contain two ISCIs

        let ISCIRegex = /[A-Z]{4}\d{4}/

        for (let i = 0; i < splitTitles.length; i++) {
            if (splitTitles[i][0].match(ISCIRegex) && splitTitles[i][1].match(ISCIRegex)) {
                doubleISCItitles.push(splitTitles[i])
            } else {singleISCItitles.push(splitTitles[i])}
        } 

        //Create an array of all the ISCIs from scripts that have only one ISCI:
        let singleISCIs = []

        for (let i = 0; i < singleISCItitles.length; i++) {
            for (let j = 0; j < singleISCItitles[i].length; j++) {
              if (singleISCItitles[i][j].match(ISCIRegex)) {
               singleISCIs.push([singleISCItitles[i][j]]) 
              }
            }
          }

        //create an new array of the single titles with no ISCIs:
        let singleTitlesNoISCIs = singleISCItitles.map(title => title.filter(word => !singleISCIs.flat().includes(word)))


        //we'll repeat the above step for another varaible, which will hold all the ISCIs from titles with 2 ISCIS:
        let doubleISCIs = []

        for (let i = 0; i < doubleISCItitles.length; i++) {
              for (let j = 0; j < doubleISCItitles[i].length; j++) {
                if (doubleISCItitles[i][j].match(ISCIRegex)) {
                    doubleISCIs.push([doubleISCItitles[i][j]]) 
                }
              }
            }
        
        //create an new array of the titles with no ISCIs:

        let doubleISCItitlesNoISCI = doubleISCItitles.map(title => title.filter(word => !doubleISCIs.flat().includes(word))).flatMap(x => [x,x])        

        let allISCIs = singleISCIs.concat(doubleISCIs)
        let allTitles = singleTitlesNoISCIs.concat(doubleISCItitlesNoISCI)

        let result = []

        for (let i = 0; i < allISCIs.length; i++) {
            result.push([allISCIs[i].join(''), allTitles[i].join(' ')])
        }
        
        //return result. It will be a 2D array that takes the following structure: 
        //[[ISCI, title], [ISCI, title]]
        
        return result

    }
}