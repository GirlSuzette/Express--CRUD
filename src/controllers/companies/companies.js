// definir funciones para http 

const companies = require('../../../data')


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
    }
}



module.exports = controllers
