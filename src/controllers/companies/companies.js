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
            const add = [...companies.data, req.body];
            const addCompanies = JSON.stringify({ data: add });
            fs.writeFile('./data.json', addCompanies, (err) => {
                if (err) throw err;
                console.log('The file was saved!');
            })
            res.status(200).json({ data: add });
        }
    },
    update: ({ body, params }, res) => {

        const alreadyExist = companies.data.some(company => company.id == params.id)

        if (alreadyExist) {
            const dataUpdated = companies.data.map(c => {
                return (params.id == c.id) ? body : c;
            })
            var companiesUp = JSON.stringify({ data: dataUpdated });

            fs.writeFile('./data.json', companiesUp, (err) => {
                if (err) throw err;
                console.log('The file has been saved!')
            })

            res.status(200).json({ message: dataUpdated })
        } else {
            console.log("It doesn't exist ")
        }

    },

    delete: ({ params }, res) => {
        const isCompany = companies.data.some(company => company.id == params.id)

        if (isCompany) {
            var newCompanies = companies.data.filter(company => company.id != params.id);
            var companiesDele = JSON.stringify({ data: newCompanies });

            fs.writeFile('./data.json', companiesDele, (err) => {
                if (err) throw err;
                console.log('The file has been saved!')
            })
            res.json({ data: newCompanies });
        } else {
            res.status(204).json({ message: 'Company not found' });
        }
    }
}

module.exports = controllers
