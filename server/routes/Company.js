const express = require("express");
const router = express.Router();
const { Company } = require("../models");
const { Users } = require("../models");

router.post("/", async (req, res) => {
    const { name, description, email, status } = req.body;

    if (!name || !description || !email) {
        return res.json("Missing required fields");
    }

    if (status === 1) {
        return res.json("User has already created a company account");
    }

    const companyAlreadyPresent = await Company.findOne({ where: { name: name } });

    if (companyAlreadyPresent) {
        return res.json("Company already present");
    }


    const result = await Company.create({
        name: name,
        description: description,
        linkedCompanies: ""
    });

    const userUpdate = await Users.update({
        companyFK: result.dataValues.id,
        status: 1
    },
        { where: { email: email } }
    );

    return res.json({ status: true, data: userUpdate.dataValues, name: name });
});


router.post("/companylistings", async (req, res) => {
    const companyListings = await Company.findAll();

    return res.json({ status: true, companyListings: companyListings });
});

router.post("/connectCompany", async (req, res) => {

    const { currentCompanyName, futureCompanyName } = req.body;
    var allRequests = [];

    const companyAlreadyPresent = await Company.findOne({ where: { name: futureCompanyName } });
    console.log(companyAlreadyPresent)
    if (companyAlreadyPresent) {
        allRequests = JSON.parse(companyAlreadyPresent.dataValues.requests) === null ? [] : JSON.parse(companyAlreadyPresent.dataValues.requests);
    }
    if (allRequests.includes(currentCompanyName)) {
        return res.json({ status: true, message: "Connection Request Already Sent" });
    }

    // find all companies except companyName
    const companyUpdate = await Company.update({
        requests: JSON.stringify([...allRequests, currentCompanyName])
    },
        { where: { name: futureCompanyName } }
    );
    console.log(companyUpdate)

    return res.json({ status: true, message: "Request Sent Successfully" });
});

router.post("/connectListings", async (req, res) => {

    const { currentCompanyName } = req.body;
    var allRequests = [];

    const companyAlreadyPresent = await Company.findOne({ where: { name: currentCompanyName } });
    console.log(companyAlreadyPresent)
    if (companyAlreadyPresent) {
        allRequests = JSON.parse(companyAlreadyPresent.dataValues.requests) === null || "" ? [] : JSON.parse(companyAlreadyPresent.dataValues.requests);
    }

    return res.json({ status: true, otherCompanies: allRequests });
});


router.post("/handleCompanyRequest", async (req, res) => {

    const { currentCompanyName, requestedName, status } = req.body;
    const companyAlreadyPresent = await Company.findOne({ where: { name: currentCompanyName } });
    var allLinked=[]
    const companyUpdate = await Company.update({
        requests: JSON.stringify([...JSON.parse(companyAlreadyPresent.dataValues.requests).filter(item => item !== requestedName)])
    },
        { where: { name: currentCompanyName } }
    );
    console.log(companyAlreadyPresent.dataValues.linkedCompanies)
    if (status) {
        
        allLinked = ((companyAlreadyPresent.dataValues.linkedCompanies) === (null || "")) ? [] : JSON.parse(companyAlreadyPresent.dataValues.linkedCompanies);

        const companyUpdate = await Company.update({
            linkedCompanies: JSON.stringify([...allLinked, requestedName])
        },
            { where: { name: currentCompanyName } }
        );
        return res.json({ status: true, message: "Request Accepted Successfully" });

    }else{
        return res.json({ status: true, message: "Request Rejected Successfully" });
    }
});
module.exports = router;