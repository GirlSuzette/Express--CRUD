// definir funciones para http 


const companies = require('../../../data')
const fs = require('fs')


const controllers = {
    index: (req, res) => {
        res
            .status(200)
            .json({
                data: companies
            })
    },

    find: (req, res) => {

        const queryId = req.params.id
        const company = companies.data.filter(company => company.id.toString() === queryId)
        res
            .json({
                data: company
            })
            .status(200)
    },
    create: (req, res) => {
        const { id } = req.body
        const isDiffId = companies.data.some(company => company.id == id)
        if (isDiffId) {
            res.json({ message: 'Company exists' })
        } else {
            var add = [...companies.data, req.body];
            var addCompanies = JSON.stringify({ data: add });
            fs.writeFile('./data.json', addCompanies, (err) => {
                if (err) throw err;
                console.log('The file was saved!');
            })
            res.status(200).json({ data: add });
        }
    }
}





module.exports = controllers
