const Product = require("../models/product");

const getAllProducts = async (req, res) => {

    const {company, name, featured, sorting, page, limit} = req.query;
    const queryObject = {};

    if(company){
        queryObject.company = company;
    }
 
    if(featured){
        queryObject.featured  = featured;
    }

    // $options: "i" --> case insensitive.
    if(name){
        queryObject.name = { $regex : name, $options: "i"};
    }

    let apiData = Product.find(queryObject);

    if(sorting){
        let sortFix = sorting.replace(","," ");
        apiData = apiData.sort(sortFix);
    }

    if(page){
        let pageFix = Number(page) || 1;
        let limitFix = Number(limit) || 10;

        let skip = (page - 1) * limitFix;

        // page - 2
        // limit - 3
        // skip = (2 - 1) * 3 = 1 * 3 = 3

        apiData = apiData.skip(skip).limit(limitFix);
    }

    const myData = await apiData;
    res.status(200).json({
        // msg : "I am getAllProducts"
        myData
 
    })
}

const getAllProductsTesting = async (req, res) => {

    const {company, featured, name, selecting} = req.query;
    const queryObject = {};

    if(company){
        queryObject.company = company;
    }
 
    if(featured){
        queryObject.featured  = featured;
    }

    // $options: "i" --> case insensitive.
    if(name){
        queryObject.name = { $regex : name, $options: "i"};
    }

    let apiData = Product.find(queryObject);

    if(selecting){
        let selectFix = selecting.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    const myData = await apiData;
    res.status(200).json({
        myData
    })
}

module.exports = {getAllProducts, getAllProductsTesting};